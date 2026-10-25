'use client';

import React from 'react';
import { Plane, Train, Hotel, MapPin, ArrowRight, Clock } from 'lucide-react';
import { AlternativeOption } from '@/lib/types';

interface VisualJourneyTimelineProps {
  option: AlternativeOption;
  compact?: boolean;
}

export function VisualJourneyTimeline({ option, compact = false }: VisualJourneyTimelineProps) {
  const segments = option.segments;

  if (segments.length === 1) {
    // Direct journey
    const seg = segments[0];
    const parts = seg.route.split('→');
    const orig = parts[0]?.trim() || 'Origin';
    const dest = parts[1]?.trim() || 'Destination';

    return (
      <div className="w-full">
        {/* Desktop horizontal view */}
        <div className="hidden sm:flex items-center justify-between gap-3 text-xs">
          <div className="shrink-0 text-left">
            <span className="font-extrabold text-[#111A35] block">{option.departureTime.split(' ')[0]}</span>
            <span className="text-[11px] text-[#64748B] font-medium">{orig}</span>
          </div>

          <div className="flex-1 flex flex-col items-center px-4">
            <span className="text-[10px] text-[#2864FF] font-bold mb-1 flex items-center gap-1">
              {seg.mode === 'rail' ? <Train className="w-3 h-3" /> : <Plane className="w-3 h-3" />}
              <span>{option.durationString} (Direct)</span>
            </span>
            <div className="w-full h-1 bg-[#2864FF]/30 relative flex items-center justify-between">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2864FF]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#18A999]" />
            </div>
          </div>

          <div className="shrink-0 text-right">
            <span className="font-extrabold text-[#111A35] block">{option.arrivalTime.split(' ')[0]}</span>
            <span className="text-[11px] text-[#64748B] font-medium">{dest}</span>
          </div>
        </div>

        {/* Mobile vertical stacked view */}
        <div className="sm:hidden space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2864FF]" />
              <span className="font-extrabold text-[#111A35]">{orig}</span>
            </div>
            <span className="font-mono font-bold text-[#111A35]">{option.departureTime.split(' ')[0]}</span>
          </div>

          <div className="pl-3 ml-1 border-l-2 border-dashed border-[#2864FF]/40 py-1 text-[11px] text-[#2864FF] font-semibold flex items-center gap-1.5">
            {seg.mode === 'rail' ? <Train className="w-3 h-3" /> : <Plane className="w-3 h-3" />}
            <span>{seg.operator} &bull; {option.durationString}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#18A999]" />
              <span className="font-extrabold text-[#111A35]">{dest}</span>
            </div>
            <span className="font-mono font-bold text-[#111A35]">{option.arrivalTime.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    );
  }

  // Multi-segment with connections
  return (
    <div className="w-full space-y-2">
      {/* Desktop horizontal flow */}
      <div className="hidden sm:flex items-center justify-between gap-2 text-xs">
        {segments.map((seg, idx) => {
          const parts = seg.route.split('→');
          const orig = parts[0]?.trim() || '';
          const dest = parts[1]?.trim() || '';

          return (
            <React.Fragment key={idx}>
              <div className="shrink-0 text-left">
                <span className="font-bold text-[#111A35] block text-[11px]">{orig.split('(')[0].trim()}</span>
                <span className="text-[10px] text-[#64748B] font-mono">{seg.timing.split('-')[0]?.trim()}</span>
              </div>

              <div className="flex-1 flex flex-col items-center px-2">
                <span className="text-[10px] text-[#2864FF] font-semibold mb-0.5 flex items-center gap-1">
                  {seg.mode === 'rail' ? <Train className="w-3 h-3" /> : <Plane className="w-3 h-3" />}
                  <span>{seg.operator.split(' ')[0]}</span>
                </span>
                <div className="w-full h-1 bg-[#2864FF]/40 relative flex items-center justify-between">
                  <div className="w-2 h-2 rounded-full bg-[#2864FF]" />
                  <div className="w-2 h-2 rounded-full bg-[#2864FF]" />
                </div>
              </div>

              {idx === segments.length - 1 && (
                <div className="shrink-0 text-right">
                  <span className="font-bold text-[#111A35] block text-[11px]">{dest.split('(')[0].trim()}</span>
                  <span className="text-[10px] text-[#18A999] font-mono font-bold">{seg.timing.split('-')[1]?.trim() || option.arrivalTime.split(' ')[0]}</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile vertical flow */}
      <div className="sm:hidden space-y-2 text-xs">
        {segments.map((seg, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="flex items-center justify-between font-bold text-[#111A35]">
              <span className="flex items-center gap-1.5">
                {seg.mode === 'rail' ? <Train className="w-3.5 h-3.5 text-[#2864FF]" /> : <Plane className="w-3.5 h-3.5 text-[#2864FF]" />}
                {seg.operator}
              </span>
              <span className="font-mono text-[11px] text-[#64748B]">{seg.timing}</span>
            </div>
            <div className="text-[11px] text-[#64748B] mt-0.5">{seg.route}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
