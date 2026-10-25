import { AlternativeOption, TravellerConstraints } from './types';

export interface EvaluationResult {
  eligible: AlternativeOption[];
  rejected: AlternativeOption[];
  recommended: AlternativeOption | null;
  consumerRationale: string;
  summary: {
    totalEvaluated: number;
    eligibleCount: number;
    rejectedCount: number;
    bestScore: number;
    lowestDelayMins: number;
    lowestCost: number;
    recommendedArrivalTime: string;
    estimatedCost: string;
    timeSavedVsOtherAlternatives: string;
    transferCount: number;
  };
}

/**
 * Deterministic evaluation engine for WAYPOINT AI.
 * Evaluates candidate alternatives against traveller constraints and scores them.
 */
export function evaluateAlternatives(
  rawAlternatives: AlternativeOption[],
  constraints: TravellerConstraints
): EvaluationResult {
  const maxDelayMinutes = constraints.maxAcceptableDelayHours * 60;

  const processed = rawAlternatives.map((alt) => {
    const clone = { ...alt, scoreBreakdown: { ...alt.scoreBreakdown } };

    // 1. Check Hard Constraints
    if (clone.extraCost > constraints.budgetLimit) {
      clone.complianceStatus = 'exceeds_budget';
      clone.rejectionReason = `Exceeds your budget limit of $${constraints.budgetLimit} (requires +$${clone.extraCost})`;
    } else if (clone.delayMinutes > maxDelayMinutes) {
      clone.complianceStatus = 'exceeds_delay';
      const hours = (clone.delayMinutes / 60).toFixed(1);
      clone.rejectionReason = `Delay of ${hours}h exceeds your maximum delay preference of ${constraints.maxAcceptableDelayHours}h`;
    } else if (clone.transfers > constraints.maxTransfers) {
      clone.complianceStatus = 'exceeds_transfers';
      clone.rejectionReason = `Requires ${clone.transfers} transfer(s), exceeding your limit of ${constraints.maxTransfers}`;
    } else if (
      constraints.preferredMode !== 'any' &&
      clone.transportMode !== constraints.preferredMode &&
      clone.transportMode !== 'hybrid'
    ) {
      if (constraints.preferredMode === 'rail' && clone.transportMode === 'flight') {
        clone.complianceStatus = 'mode_mismatch';
        clone.rejectionReason = `Rail preference selected; flight alternative excluded`;
      } else if (constraints.preferredMode === 'flight' && clone.transportMode === 'rail') {
        clone.complianceStatus = 'mode_mismatch';
        clone.rejectionReason = `Flight preference selected; rail alternative excluded`;
      } else {
        clone.complianceStatus = 'eligible';
      }
    } else {
      clone.complianceStatus = 'eligible';
      clone.rejectionReason = undefined;
    }

    // 2. Score Computation (0 - 100 points)
    const costRatio = constraints.budgetLimit > 0 ? Math.min(1.2, clone.extraCost / constraints.budgetLimit) : 0;
    const costScore = Math.max(2, Math.round(35 * (1 - costRatio * 0.85)));

    const delayRatio = maxDelayMinutes > 0 ? Math.min(1.5, clone.delayMinutes / maxDelayMinutes) : 0;
    const timeScore = Math.max(2, Math.round(35 * (1 - delayRatio * 0.9)));

    const transferScore = clone.transfers === 0 ? 15 : clone.transfers === 1 ? 10 : 4;

    let preferenceScore = 10;
    if (constraints.preserveLoungeAccess && clone.amenities.some((a) => a.toLowerCase().includes('lounge'))) {
      preferenceScore += 3;
    }
    if (constraints.preferredMode !== 'any' && clone.transportMode === constraints.preferredMode) {
      preferenceScore += 2;
    }
    preferenceScore = Math.min(15, preferenceScore);

    const totalScore = costScore + timeScore + transferScore + preferenceScore;

    clone.score = totalScore;
    clone.scoreBreakdown = {
      costScore,
      timeScore,
      transferScore,
      preferenceScore,
    };
    clone.isRecommended = false;

    // Concise human trade-off
    if (clone.extraCost === 0) {
      clone.conciseTradeOff = `No additional fare ($0). Fully rebooked under carrier waiver.`;
    } else {
      clone.conciseTradeOff = `+$${clone.extraCost} fare adjustment for earlier departure.`;
    }

    return clone;
  });

  const eligible = processed
    .filter((o) => o.complianceStatus === 'eligible')
    .sort((a, b) => b.score - a.score);

  const rejected = processed
    .filter((o) => o.complianceStatus !== 'eligible')
    .sort((a, b) => a.extraCost - b.extraCost);

  let consumerRationale = 'We evaluated all available flights, trains, and connections against your schedule.';
  let recommendedArrivalTime = 'N/A';
  let estimatedCost = '$0';
  let timeSavedVsOtherAlternatives = 'Fastest route';
  let transferCount = 0;

  // Mark top eligible as recommended
  if (eligible.length > 0) {
    const top = eligible[0];
    top.isRecommended = true;

    recommendedArrivalTime = top.arrivalTime;
    estimatedCost = top.extraCost === 0 ? '$0 Extra' : `+$${top.extraCost}`;
    transferCount = top.transfers;

    if (eligible.length > 1) {
      const otherEligible = eligible.slice(1);
      const slowestDelay = Math.max(...otherEligible.map((o) => o.delayMinutes));
      const savedMinutes = slowestDelay - top.delayMinutes;
      if (savedMinutes > 30) {
        const savedH = Math.floor(savedMinutes / 60);
        const savedM = savedMinutes % 60;
        timeSavedVsOtherAlternatives = `${savedH > 0 ? `${savedH}h ` : ''}${savedM > 0 ? `${savedM}m` : ''} saved vs other options`.trim();
      } else {
        timeSavedVsOtherAlternatives = 'Earliest available arrival';
      }
    } else {
      timeSavedVsOtherAlternatives = 'Optimal single route';
    }

    const delayH = Math.floor(top.delayMinutes / 60);
    const delayM = top.delayMinutes % 60;
    const delayText = delayH > 0 ? `${delayH}h ${delayM > 0 ? `${delayM}m` : ''}` : `${delayM}m`;
    const costText = top.extraCost === 0 ? 'zero additional cost' : `stays within your budget (+$${top.extraCost})`;
    const transferText = top.transfers === 0 ? 'a direct non-stop flight' : `fewer transfers (${top.transfers})`;

    consumerRationale = `Fits your budget and arrival-time limit, with ${transferText} and only ${delayText} delay.`;
    top.recommendationRationale = consumerRationale;
  }

  const lowestDelay = processed.reduce((min, o) => Math.min(min, o.delayMinutes), Infinity);
  const lowestCost = processed.reduce((min, o) => Math.min(min, o.extraCost), Infinity);

  return {
    eligible,
    rejected,
    recommended: eligible[0] || null,
    consumerRationale,
    summary: {
      totalEvaluated: processed.length,
      eligibleCount: eligible.length,
      rejectedCount: rejected.length,
      bestScore: eligible[0]?.score || 0,
      lowestDelayMins: lowestDelay === Infinity ? 0 : lowestDelay,
      lowestCost: lowestCost === Infinity ? 0 : lowestCost,
      recommendedArrivalTime,
      estimatedCost,
      timeSavedVsOtherAlternatives,
      transferCount,
    },
  };
}
