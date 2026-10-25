'use client';

import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  DollarSign,
  CheckCircle2,
  Plane,
  Train,
  Check,
  Zap,
  Info,
  Calendar,
  Layers,
} from 'lucide-react';
import { AlternativeOption, DisruptionScenario } from '@/lib/types';
import { EvaluationResult } from '@/lib/evaluation-engine';

interface RecommendedRecoveryHeroProps {
  evaluation: EvaluationResult;
  scenario: DisruptionScenario;
  onChooseItinerary: (option: AlternativeOption) => void;
  isSelected: boolean;
}

export function RecommendedRecoveryHero({
  evaluation,
  scenario,
  onChooseItinerary,
  isSelected,
}: RecommendedRecoveryHeroProps) {
  const opt = evaluation.recommended;
  const originalBooking = scenario.affectedBooking;
  const summary = evaluation.summary;

  if (!opt) {
    return (
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
          <Info className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#111A35]">No alternatives meet your current preferences</h3>
        <p className="text-sm text-[#64748B] max-w-md mx-auto mt-1 mb-4">
          All alternative routes exceed your budget cap or acceptable arrival delay. Open &ldquo;Preferences&rdquo; above to widen your limits.
        </p>
      </div>
    );
  }

  // Delay formatted
  const delayH = Math.floor(opt.delayMinutes / 60);
  const delayM = opt.delayMinutes % 60;
  const delayFormatted = delayH > 0 ? `+${delayH}h ${delayM > 0 ? `${delayM}m` : ''}` : `+${delayM}m`;

  return (
    <div className="space-y-6">
      {/* 5.A: Recovery Summary Header & Compact Metrics */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111A35] tracking-tight">
              Your next move
            </h2>
            <p className="text-sm text-[#475569] mt-0.5">
              We compared the available demo alternatives against your preferences.
            </p>
          </div>
        </div>

        {/* Compact Summary Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block">
              RECOMMENDED ARRIVAL
            </span>
            <span className="text-base font-extrabold text-[#111A35] font-mono mt-1 block">
              {summary.recommendedArrivalTime}
            </span>
            <span className="text-[11px] text-[#64748B] mt-0.5 block">
              {delayFormatted} delay vs original
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block">
              ESTIMATED COST
            </span>
            <span className="text-base font-extrabold text-[#18A999] font-mono mt-1 block">
              {summary.estimatedCost}
            </span>
            <span className="text-[11px] text-[#64748B] mt-0.5 block">
              Within your policy limit
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block">
              TIME SAVED
            </span>
            <span className="text-base font-extrabold text-[#2864FF] font-mono mt-1 block">
              {summary.timeSavedVsOtherAlternatives}
            </span>
            <span className="text-[11px] text-[#64748B] mt-0.5 block">
              vs other alternatives
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block">
              TRANSFERS
            </span>
            <span className="text-base font-extrabold text-[#111A35] mt-1 block">
              {summary.transferCount === 0 ? 'Non-stop' : `${summary.transferCount} Transfer`}
            </span>
            <span className="text-[11px] text-[#64748B] mt-0.5 block">
              Direct connection
            </span>
          </div>
        </div>
      </div>

      {/* 5.B: Featured Recommended Itinerary Hero Card */}
      <div className="relative bg-white rounded-3xl border-2 border-[#2864FF] shadow-lg shadow-[#2864FF]/5 p-6 sm:p-8 transition-all overflow-hidden">
        {/* Top Header Badge & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F1F5F9] gap-3">
          <div className="flex items-center gap-2.5">
            <div className="px-3.5 py-1.5 rounded-full bg-[#EAF0FF] text-[#2864FF] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-[#2864FF]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#2864FF]" />
              <span>Recommended for you</span>
            </div>

            <span className="text-xs font-bold text-[#111A35]">
              &bull; {opt.carrier}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-[#F8FAFC] text-[#475569] text-xs font-bold border border-[#E2E8F0]">
              {opt.transfers === 0 ? 'Non-stop' : `${opt.transfers} transfer`}
            </span>
            <span className="px-3 py-1 rounded-xl bg-[#FFFBEB] text-[#B45309] border border-amber-200/60 text-xs font-bold">
              {delayFormatted} arrival
            </span>
            <span className="px-3 py-1 rounded-xl bg-[#E6F4EA] text-[#137333] border border-emerald-200 text-xs font-extrabold font-mono">
              {opt.extraCost === 0 ? '$0 Extra (Covered)' : `+$${opt.extraCost}`}
            </span>
          </div>
        </div>

        {/* Departure & Arrival Visualizer */}
        <div className="py-6 my-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Origin */}
            <div className="md:col-span-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#94A3B8]">DEPARTS</div>
              <div className="text-3xl sm:text-4xl font-black text-[#111A35] tracking-tight mt-1">
                {opt.departureTime.split(' ')[0]}
              </div>
              <div className="text-sm font-bold text-[#111A35] mt-0.5">
                {originalBooking.originName}
              </div>
              <div className="text-xs text-[#64748B] font-medium">
                {opt.segments[0]?.route.split('→')[0]?.trim() || originalBooking.originCode}
              </div>
            </div>

            {/* Horizontal Route Timeline */}
            <div className="md:col-span-6 px-2 sm:px-6">
              <div className="flex items-center justify-between text-xs text-[#64748B] mb-2 font-bold">
                <span className="flex items-center gap-1.5 text-[#111A35]">
                  {opt.transportMode === 'rail' ? <Train className="w-3.5 h-3.5 text-[#2864FF]" /> : <Plane className="w-3.5 h-3.5 text-[#2864FF]" />}
                  {opt.durationString}
                </span>
                <span className="text-[#2864FF]">
                  {opt.transfers === 0 ? 'Direct Route' : `${opt.transfers} Connection`}
                </span>
              </div>

              {/* Connected Route Line */}
              <div className="relative flex items-center w-full my-3">
                <div className="w-3.5 h-3.5 rounded-full bg-[#2864FF] ring-4 ring-[#EAF0FF] shrink-0" />

                <div className="flex-1 h-1 bg-gradient-to-r from-[#2864FF] via-indigo-500 to-[#2864FF] relative flex items-center justify-center">
                  {opt.transfers > 0 && (
                    <div className="w-3 h-3 rounded-full bg-white border-2 border-indigo-600 shadow-xs" title="Transfer Point" />
                  )}
                  <div className="w-7 h-7 rounded-full bg-white border border-[#CBD5E1] shadow-2xs flex items-center justify-center -translate-y-0.5">
                    {opt.transportMode === 'rail' ? (
                      <Train className="w-3.5 h-3.5 text-[#111A35]" />
                    ) : (
                      <Plane className="w-3.5 h-3.5 text-[#111A35]" />
                    )}
                  </div>
                </div>

                <div className="w-3.5 h-3.5 rounded-full bg-[#18A999] ring-4 ring-[#E6F4EA] shrink-0" />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#64748B] font-mono">
                <span>{originalBooking.originCode}</span>
                {opt.transfers > 0 && <span>Mid-Transit</span>}
                <span>{originalBooking.destinationCode}</span>
              </div>
            </div>

            {/* Destination */}
            <div className="md:col-span-3 text-left md:text-right">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#94A3B8]">ARRIVES</div>
              <div className="text-3xl sm:text-4xl font-black text-[#2864FF] tracking-tight mt-1">
                {opt.arrivalTime.split(' ')[0]}
              </div>
              <div className="text-sm font-bold text-[#111A35] mt-0.5">
                {originalBooking.destinationName}
              </div>
              <div className="text-xs text-[#64748B] font-medium">
                {opt.segments[opt.segments.length - 1]?.route.split('→')[1]?.trim() || originalBooking.destinationCode}
              </div>
            </div>
          </div>
        </div>

        {/* Concise Constraint Explanation & Primary Action */}
        <div className="mt-4 pt-5 border-t border-[#F1F5F9] flex flex-col md:flex-row md:items-center justify-between gap-5 bg-[#F8FAFC] p-5 rounded-2xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#111A35] uppercase tracking-wide mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#18A999]" />
              <span>Why this option fits your constraints</span>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed font-medium">
              {opt.recommendationRationale || `Fits your budget and arrival-time limit, with fewer transfers than the other eligible alternatives.`}
            </p>
          </div>

          {/* Choose This Itinerary Button */}
          <div className="shrink-0">
            <button
              onClick={() => onChooseItinerary(opt)}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-[#18A999] hover:bg-[#138e80] text-white shadow-[#18A999]/25'
                  : 'bg-[#2864FF] hover:bg-[#1f52db] text-white shadow-[#2864FF]/25'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Selected &bull; Ready to Review</span>
                </>
              ) : (
                <>
                  <span>Choose this itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
