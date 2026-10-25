'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, DollarSign, QrCode, ArrowRight, Info, AlertTriangle } from 'lucide-react';
import { AlternativeOption, DisruptionScenario, TravellerProfile } from '@/lib/types';
import { VisualJourneyTimeline } from './VisualJourneyTimeline';

interface RecoveryPlansViewProps {
  scenario: DisruptionScenario;
  selectedOption: AlternativeOption | null;
  isApproved: boolean;
  confirmationCode: string;
  traveller: TravellerProfile;
  onGoToOverview: () => void;
  onOpenConfirmation: () => void;
}

export function RecoveryPlansView({
  scenario,
  selectedOption,
  isApproved,
  confirmationCode,
  traveller,
  onGoToOverview,
  onOpenConfirmation,
}: RecoveryPlansViewProps) {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#18A999]">
            RECOVERY REPOSITORY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111A35] tracking-tight mt-0.5">
            Recovery Plans & Itineraries
          </h2>
          <p className="text-xs text-[#64748B]">
            Inspect synthesized and demo-approved alternative journeys.
          </p>
        </div>

        <button
          onClick={onGoToOverview}
          className="px-4 py-2 rounded-xl bg-white border border-[#CBD5E1] text-[#111A35] text-xs font-bold hover:bg-[#F8FAFC] cursor-pointer"
        >
          Back to Overview
        </button>
      </div>

      {selectedOption ? (
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#F1F5F9] gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#94A3B8]">
                  REF: {confirmationCode}
                </span>
                {isApproved ? (
                  <span className="px-3 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] border border-emerald-200 text-[10px] font-black uppercase">
                    Approved in Demo
                  </span>
                ) : (
                  <span className="px-3 py-0.5 rounded-full bg-[#FFFBEB] text-[#B45309] border border-amber-200 text-[10px] font-black uppercase">
                    Pending Approval
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-[#111A35] mt-1">
                {selectedOption.title}
              </h3>
              <p className="text-xs text-[#64748B] font-medium">{selectedOption.carrier}</p>
            </div>

            {!isApproved && (
              <button
                onClick={onOpenConfirmation}
                className="px-6 py-3 rounded-xl bg-[#2864FF] hover:bg-[#1f52db] text-white font-extrabold text-xs shadow-md shadow-[#2864FF]/25 cursor-pointer active:scale-95 transition-all"
              >
                Review & Approve Itinerary
              </button>
            )}
          </div>

          {/* Details summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-b border-[#F1F5F9] text-xs">
            <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
              <span className="text-[#94A3B8] text-[10px] uppercase font-bold block">Departs</span>
              <span className="font-black text-[#111A35] text-sm font-mono mt-0.5 block">
                {selectedOption.departureTime}
              </span>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
              <span className="text-[#94A3B8] text-[10px] uppercase font-bold block">Arrives</span>
              <span className="font-black text-[#2864FF] text-sm font-mono mt-0.5 block">
                {selectedOption.arrivalTime}
              </span>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
              <span className="text-[#94A3B8] text-[10px] uppercase font-bold block">Arrival Delay</span>
              <span className="font-black text-[#B45309] text-sm font-mono mt-0.5 block">
                +{Math.round(selectedOption.delayMinutes / 60)}h {selectedOption.delayMinutes % 60}m
              </span>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
              <span className="text-[#94A3B8] text-[10px] uppercase font-bold block">Estimated Cost</span>
              <span className="font-black text-[#18A999] text-sm font-mono mt-0.5 block">
                {selectedOption.extraCost === 0 ? '$0 Extra (Covered)' : `+$${selectedOption.extraCost}`}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="my-5 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <VisualJourneyTimeline option={selectedOption} />
          </div>

          {/* Route segments */}
          <div className="mt-4 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-2">
              Itinerary Breakdown:
            </span>
            {selectedOption.segments.map((seg, i) => (
              <div key={i} className="p-3 bg-white rounded-xl border border-[#E2E8F0] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#111A35]">{seg.operator} &bull; {seg.segmentTitle}</div>
                  <div className="text-[#64748B] text-[11px] mt-0.5">{seg.route}</div>
                </div>
                <div className="font-mono text-[#111A35] font-bold">{seg.timing}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E2E8F0]">
          <Info className="w-8 h-8 mx-auto text-[#64748B] mb-2" />
          <p className="font-bold text-[#111A35]">No active recovery itinerary chosen</p>
          <p className="text-xs text-[#64748B] mt-1 mb-5">
            Return to the Overview screen to inspect alternatives and pick your preferred replacement.
          </p>
          <button
            onClick={onGoToOverview}
            className="px-6 py-3 rounded-xl bg-[#2864FF] text-white font-extrabold text-xs shadow-md shadow-[#2864FF]/25 cursor-pointer"
          >
            Go to Overview
          </button>
        </div>
      )}
    </div>
  );
}
