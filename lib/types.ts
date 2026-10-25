export type TransportMode = 'flight' | 'rail' | 'hybrid' | 'hotel_flight';

export type NavView = 'overview' | 'my-trips' | 'recovery-plans' | 'preferences';

export interface BookingSegment {
  id: string;
  type: 'flight' | 'rail' | 'hotel' | 'transfer';
  code: string; // e.g. "BA-178"
  operator: string; // e.g. "British Airways"
  vehicleType?: string; // e.g. "Boeing 777-300ER"
  originCode: string; // e.g. "JFK"
  originName: string; // e.g. "New York John F. Kennedy"
  destinationCode: string; // e.g. "LHR"
  destinationName: string; // e.g. "London Heathrow"
  departureTime: string; // e.g. "18:30"
  arrivalTime: string; // e.g. "06:45 +1d"
  seatOrRoom?: string; // e.g. "Seat 12A (Club World)"
  status: 'confirmed' | 'cancelled' | 'delayed' | 'at_risk';
  delayMinutes?: number;
  terminal?: string;
  gate?: string;
}

export interface DisruptionScenario {
  id: 'flight-cancelled' | 'train-delayed' | 'missed-connection';
  label: string;
  title: string;
  typeBadge: string;
  severity: 'critical' | 'high' | 'moderate';
  detectedTime: string;
  detectionSource: string;
  summary: string;
  impactDescription: string;
  affectedBooking: BookingSegment;
  downstreamImpacts: string[];
}

export interface Trip {
  id: string;
  title: string;
  destinationCity: string;
  country: string;
  dates: string;
  pnr: string;
  status: 'disrupted' | 'confirmed' | 'recovered';
  associatedScenarioId?: 'flight-cancelled' | 'train-delayed' | 'missed-connection';
  segments: BookingSegment[];
  notes?: string;
}

export interface TravellerProfile {
  name: string;
  title: string;
  company: string;
  loyaltyTier: string;
  loyaltyId: string;
  secondaryLoyalty: string;
  corporatePolicy: string;
  origin: string;
  finalDestination: string;
  travelDate: string;
  targetArrival: string;
  preferredSeat: string;
  mealPreference: string;
  autoApproveUnder: number;
}

export interface TravellerConstraints {
  budgetLimit: number; // max extra cost in USD
  maxAcceptableDelayHours: number; // max extra hours past original arrival
  preferredMode: 'any' | 'flight' | 'rail' | 'hybrid';
  maxTransfers: number; // 0 = direct only, 1 = max 1 stop, etc.
  preserveLoungeAccess: boolean;
  corporateAutoApproveUnder: number; // e.g. $300
  prioritizeGreenRouting?: boolean;
}

export interface AlternativeOption {
  id: string;
  title: string;
  carrier: string;
  transportMode: TransportMode;
  departureTime: string;
  arrivalTime: string;
  durationString: string;
  delayMinutes: number; // vs original schedule
  extraCost: number; // in USD (can be 0 or negative for refunds)
  originalPriceOffset?: number;
  transfers: number;
  segments: {
    segmentTitle: string;
    operator: string;
    route: string;
    timing: string;
    mode: 'flight' | 'rail' | 'transfer' | 'hotel';
    notes?: string;
  }[];
  amenities: string[];
  tradeOffs: string[];
  score: number; // 0 - 100
  scoreBreakdown: {
    costScore: number;
    timeScore: number;
    transferScore: number;
    preferenceScore: number;
  };
  isRecommended: boolean;
  complianceStatus: 'eligible' | 'exceeds_budget' | 'exceeds_delay' | 'exceeds_transfers' | 'mode_mismatch';
  rejectionReason?: string;
  co2DeltaKg: number; // eco metric
  recoveryType: 'express_partner' | 'multi_modal' | 'scheduled_next' | 'overnight_premium';
  recommendationRationale?: string;
  conciseTradeOff?: string;
}

export interface RecoveryPlanState {
  isApproved: boolean;
  approvedAt?: string;
  confirmationCode?: string;
  selectedOptionId: string | null;
  voucherCodes: string[];
  autoRebookSimulated: boolean;
}
