'use client';

import React from 'react';
import { Plane, Train, Clock, ArrowRight, Check, CheckCircle2, DollarSign } from 'lucide-react';
import { AlternativeOption } from '@/lib/types';
import { VisualJourneyTimeline } from './VisualJourneyTimeline';

interface AlternativeCardsProps {
  alternatives: AlternativeOption[];
  selectedOptionId: string | null;
  onSelectOption: (option: AlternativeOption) => void;
}

export function AlternativeCards({
  alternatives,
  selectedOptionId,
  onSelectOption,
}: AlternativeCardsProps) {
  // Show non-recommended alternatives
  const displayAlternatives = alternatives.slice(1, 4);

  if (displayAlternatives.length === 0) {
    return null;
  }

  return (
    <div className="pt-4 space-y-4">
      <div>
        <h3 className="text-xl font-black text-[#111A35] tracking-tight">
          Alternative journey comparison
        </h3>
        <p className="text-xs text-[#64748B]">
          Compare other viable itineraries evaluated against your arrival and budget limits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {displayAlternatives.map((alt) => {
          const isSelected = alt.id === selectedOptionId;
          const delayH = Math.floor(alt.delayMinutes / 60);
          const delayM = alt.delayMinutes % 60;
          const delayText = delayH > 0 ? `+${delayH}h ${delayM > 0 ? `${delayM}m` : ''}` : `+${delayM}m`;

          return (
            <div
              key={alt.id}
              className={`bg-white rounded-3xl border p-6 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#2864FF] ring-2 ring-[#2864FF]/20 shadow-md'
                  : 'border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs'
              }`}
            >
              <div>
                {/* Header: Carrier and Price */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#111A35]">
                      {alt.transportMode === 'rail' ? <Train className="w-4 h-4 text-[#2864FF]" /> : <Plane className="w-4 h-4 text-[#2864FF]" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#111A35] leading-tight">{alt.title}</h4>
                      <p className="text-xs text-[#64748B] font-medium">{alt.carrier}</p>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-black text-[#111A35] bg-[#F1F5F9] px-3 py-1 rounded-xl">
                    {alt.extraCost === 0 ? '$0 Extra' : `+$${alt.extraCost}`}
                  </span>
                </div>

                {/* Timeline Visualization */}
                <div className="p-3.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] my-2">
                  <VisualJourneyTimeline option={alt} compact={true} />
                </div>

                {/* Delay & Trade-off */}
                <div className="mt-4 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Delay: <strong className="text-[#111A35]">{delayText}</strong>
                    </span>
                    <span className="font-semibold text-[#111A35]">
                      {alt.transfers === 0 ? 'Non-stop' : `${alt.transfers} transfer`}
                    </span>
                  </div>

                  <p className="text-xs text-[#475569] bg-[#EAF0FF]/50 p-3 rounded-xl border border-[#2864FF]/10 leading-relaxed font-medium">
                    <strong className="text-[#111A35]">Trade-off: </strong>
                    {alt.tradeOffs[0] || alt.conciseTradeOff || 'Alternative departure schedule.'}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="text-[11px] text-[#94A3B8] font-medium truncate max-w-[170px]">
                  {alt.amenities.slice(0, 2).join(' &bull; ')}
                </span>

                <button
                  onClick={() => onSelectOption(alt)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? 'bg-[#2864FF] text-white shadow-xs'
                      : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#111A35]'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected Option</span>
                    </>
                  ) : (
                    <>
                      <span>Choose this</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
