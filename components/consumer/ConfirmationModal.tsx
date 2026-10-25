'use client';

import React from 'react';
import {
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  FileCheck,
  Calendar,
  Clock,
  DollarSign,
  Sparkles,
} from 'lucide-react';
import { AlternativeOption, DisruptionScenario, TravellerProfile } from '@/lib/types';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: DisruptionScenario;
  selectedOption: AlternativeOption;
  traveller: TravellerProfile;
  isApproved: boolean;
  onApproveInDemo: () => void;
  confirmationCode: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  scenario,
  selectedOption,
  traveller,
  isApproved,
  onApproveInDemo,
  confirmationCode,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const original = scenario.affectedBooking;
  const delayH = Math.floor(selectedOption.delayMinutes / 60);
  const delayM = selectedOption.delayMinutes % 60;
  const delayFormatted = delayH > 0 ? `+${delayH}h ${delayM > 0 ? `${delayM}m` : ''}` : `+${delayM}m`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-[#E2E8F0]"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-[#111A35] hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isApproved ? (
          /* STEP 1: REVIEW BEFORE APPROVAL */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#EAF0FF] text-[#2864FF] text-xs font-extrabold uppercase tracking-wider">
                Step 2 of 2 &bull; Itinerary Review
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#111A35] tracking-tight">
              Review recovery itinerary
            </h2>
            <p className="text-sm text-[#64748B] mt-1 mb-6">
              Compare your selected replacement route against the original disrupted booking.
            </p>

            {/* Side by side journey comparison */}
            <div className="space-y-3.5 mb-6">
              {/* Original Disrupted Route */}
              <div className="p-4 rounded-2xl bg-[#FFF1F2] border border-[#F04462]/30">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-[#F04462] uppercase tracking-wider text-[10px]">
                    ORIGINAL JOURNEY (DISRUPTED)
                  </span>
                  <span className="font-mono text-[#F04462] font-extrabold">{original.code}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-black text-[#111A35]">
                  <span>{original.originName} ({original.originCode})</span>
                  <ArrowRight className="w-4 h-4 text-[#F04462]" />
                  <span>{original.destinationName} ({original.destinationCode})</span>
                </div>
                <div className="text-xs text-[#64748B] mt-1">
                  Original departure: <strong className="text-[#111A35]">{original.departureTime}</strong> &bull; Status: <span className="text-[#F04462] font-bold uppercase">{original.status}</span>
                </div>
              </div>

              {/* Proposed Replacement Route */}
              <div className="p-4 rounded-2xl bg-[#EAF0FF] border-2 border-[#2864FF]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-[#2864FF] uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    PROPOSED REPLACEMENT ROUTE
                  </span>
                  <span className="font-mono font-black text-[#2864FF]">{selectedOption.carrier}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-black text-[#111A35]">
                  <span>{selectedOption.segments[0]?.route.split('→')[0]?.trim() || original.originCode}</span>
                  <ArrowRight className="w-4 h-4 text-[#2864FF]" />
                  <span>{selectedOption.segments[selectedOption.segments.length - 1]?.route.split('→')[1]?.trim() || original.destinationCode}</span>
                </div>
                <div className="text-xs text-[#475569] mt-1">
                  New departure: <strong className="text-[#111A35]">{selectedOption.departureTime}</strong> &bull; Arrival: <strong className="text-[#2864FF]">{selectedOption.arrivalTime}</strong>
                </div>
              </div>
            </div>

            {/* Key summary values */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] mb-6 text-xs">
              <div>
                <span className="text-[#94A3B8] text-[10px] uppercase font-bold block">Arrival Delay</span>
                <span className="text-sm font-extrabold text-[#B45309] font-mono mt-0.5 block">{delayFormatted}</span>
              </div>
              <div>
                <span className="text-[#94A3B8] text-[10px] uppercase font-bold block">Estimated Cost</span>
                <span className="text-sm font-extrabold text-[#18A999] font-mono mt-0.5 block">
                  {selectedOption.extraCost === 0 ? '$0 (Covered)' : `+$${selectedOption.extraCost}`}
                </span>
              </div>
              <div>
                <span className="text-[#94A3B8] text-[10px] uppercase font-bold block">Transfers</span>
                <span className="text-sm font-extrabold text-[#111A35] mt-0.5 block">
                  {selectedOption.transfers === 0 ? 'Non-stop' : `${selectedOption.transfers} transfer`}
                </span>
              </div>
            </div>

            {/* Trade-off notice */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-[#475569] mb-6">
              <strong className="text-[#111A35]">Key Trade-off: </strong>
              {selectedOption.tradeOffs[0] || selectedOption.conciseTradeOff || 'Alternative schedule to prevent extended travel disruption.'}
            </div>

            {/* Actions: Primary & Secondary as requested */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-xl text-[#475569] hover:bg-stone-100 text-xs font-bold cursor-pointer"
              >
                Compare other options
              </button>
              <button
                onClick={onApproveInDemo}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#2864FF] hover:bg-[#1f52db] text-white font-extrabold text-xs shadow-md shadow-[#2864FF]/25 cursor-pointer active:scale-95 transition-all"
              >
                Approve demo recovery
              </button>
            </div>
          </div>
        ) : (
          /* STEP 2: POLISHED POST-APPROVAL CONFIRMATION */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#E6F4EA] text-[#137333] flex items-center justify-center mx-auto mb-4 shadow-sm animate-in zoom-in duration-300">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-extrabold text-[#137333] uppercase tracking-wider bg-[#E6F4EA] px-3.5 py-1 rounded-full border border-emerald-200">
              DEMO PLAN APPROVED
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-[#111A35] tracking-tight mt-3">
              Your recovery plan is ready.
            </h2>
            <p className="text-sm text-[#475569] mt-1.5 max-w-md mx-auto leading-relaxed">
              This is a demo confirmation. No ticket has been purchased and no real booking has been changed.
            </p>

            {/* Reference Card */}
            <div className="my-6 p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-left">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div>
                  <span className="text-[10px] text-[#94A3B8] font-bold uppercase block">CONFIRMATION CODE</span>
                  <span className="text-xl font-mono font-black text-[#111A35]">{confirmationCode}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#94A3B8] font-bold uppercase block">PASSENGER</span>
                  <span className="text-xs font-extrabold text-[#111A35]">{traveller.name}</span>
                </div>
              </div>

              <div className="pt-3 text-xs text-[#475569] space-y-1.5">
                <div className="flex justify-between">
                  <span>Selected Carrier:</span>
                  <strong className="text-[#111A35]">{selectedOption.carrier}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Departure Time:</span>
                  <strong className="text-[#111A35] font-mono">{selectedOption.departureTime}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Arrival ETA:</span>
                  <strong className="text-[#2864FF] font-mono">{selectedOption.arrivalTime}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Extra Cost:</span>
                  <strong className="text-[#18A999] font-mono">
                    {selectedOption.extraCost === 0 ? '$0.00 (Fully Covered)' : `+$${selectedOption.extraCost}.00`}
                  </strong>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#111A35] hover:bg-slate-800 text-white font-extrabold text-xs shadow-sm cursor-pointer transition-colors"
            >
              Done & Return to Overview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
