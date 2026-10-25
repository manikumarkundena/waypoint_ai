'use client';

import React from 'react';
import { AlertCircle, Clock, Plane, Train, RefreshCw, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DisruptionScenario } from '@/lib/types';
import { DISRUPTION_SCENARIOS } from '@/lib/mock-data';

interface DisruptionNoticeProps {
  currentScenario: DisruptionScenario;
  onSelectScenario: (id: 'flight-cancelled' | 'train-delayed' | 'missed-connection') => void;
  isSimulating: boolean;
}

export function DisruptionNotice({
  currentScenario,
  onSelectScenario,
  isSimulating,
}: DisruptionNoticeProps) {
  const scenarios = Object.values(DISRUPTION_SCENARIOS);
  const booking = currentScenario.affectedBooking;

  // Human-readable titles for each scenario
  const scenarioLabels = {
    'flight-cancelled': {
      title: 'Flight BA-178 Cancelled',
      subtitle: 'Transatlantic Flight &bull; New York JFK to London Heathrow',
      reason: 'Pre-flight technical hydraulic leak reported at JFK Terminal 8 gate.',
      impact: 'Morning executive board meeting in Canary Wharf at 09:30 GMT compromised.',
    },
    'train-delayed': {
      title: 'Eurostar ES-9114 Delayed 190 Minutes',
      subtitle: 'High-Speed Rail &bull; London St Pancras to Paris Gare du Nord',
      reason: 'Overhead power cable damaged in Channel Tunnel south rail corridor.',
      impact: 'Evening dinner symposium in Paris at 20:30 CET missed without immediate reroute.',
    },
    'missed-connection': {
      title: 'Connecting Flight LH-1198 Missed',
      subtitle: 'Hub Transit &bull; Frankfurt Airport to Munich Franz Josef Strauss',
      reason: 'Inbound transatlantic flight LH-401 arrived 95m late due to Atlantic headwinds.',
      impact: 'Munich BMW Group strategic client briefing at 11:00 CET will fail.',
    },
  }[currentScenario.id] || {
    title: 'Travel Disruption Detected',
    subtitle: 'Primary itinerary impacted',
    reason: currentScenario.summary,
    impact: currentScenario.impactDescription,
  };

  return (
    <div className="bg-white rounded-3xl border border-[#F04462]/30 shadow-sm p-6 sm:p-7 relative overflow-hidden transition-all">
      {/* Refined Coral Accent Band */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F04462] via-rose-400 to-[#F04462]" />

      {/* Top Header & Scenario Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F1F5F9]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F04462] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F04462]">
              JOURNEY DISRUPTED
            </span>
            <span className="text-xs font-semibold text-[#64748B]">
              &bull; Simulated Disruption Scenario
            </span>
          </div>

          <h2 className="text-2xl font-black text-[#111A35] mt-1 tracking-tight">
            {scenarioLabels.title}
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5 font-medium">
            {scenarioLabels.subtitle}
          </p>
        </div>

        {/* 3 Interactive Scenario Selectors */}
        <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#E2E8F0] self-start sm:self-auto overflow-x-auto max-w-full">
          {scenarios.map((sc) => {
            const isSelected = sc.id === currentScenario.id;
            return (
              <button
                key={sc.id}
                onClick={() => onSelectScenario(sc.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#111A35] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#111A35] hover:bg-white'
                }`}
              >
                {sc.id === 'flight-cancelled' && '1. Flight Cancelled'}
                {sc.id === 'train-delayed' && '2. Train Delayed'}
                {sc.id === 'missed-connection' && '3. Missed Connection'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Middle Grid: Detailed Disruption Breakdown */}
      <div className="pt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Origin/Destination & Reason (8 cols) */}
        <div className="md:col-span-8 space-y-3">
          <div className="p-3.5 rounded-2xl bg-[#FFF1F2] border border-[#F04462]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-[#F04462]/30 flex items-center justify-center text-[#F04462] font-black">
                {booking.type === 'flight' ? <Plane className="w-4 h-4" /> : <Train className="w-4 h-4" />}
              </div>
              <div>
                <span className="font-extrabold text-[#111A35] text-sm block">
                  {booking.operator} {booking.code}
                </span>
                <span className="text-[#64748B] text-xs">
                  {booking.originName} ({booking.originCode}) &rarr; {booking.destinationName} ({booking.destinationCode})
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-[#94A3B8] block">SCHEDULED TIME</span>
              <span className="font-mono font-bold text-[#111A35]">{booking.departureTime}</span>
            </div>
          </div>

          <div className="text-xs text-[#475569] space-y-1">
            <p className="leading-relaxed">
              <strong className="text-[#111A35]">Reason: </strong>
              {scenarioLabels.reason}
            </p>
            <p className="leading-relaxed text-[#F04462]">
              <strong className="text-[#F04462]">Passenger Impact: </strong>
              {scenarioLabels.impact}
            </p>
          </div>
        </div>

        {/* Right: Recovery Status Box (4 cols) */}
        <div className="md:col-span-4 bg-[#EAF0FF]/80 rounded-2xl p-4 border border-[#2864FF]/20 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-1.5 text-[#2864FF] font-bold text-xs uppercase tracking-wide">
            <CheckCircle2 className="w-4 h-4 text-[#2864FF]" />
            <span>Recovery Options Ready</span>
          </div>

          <p className="text-xs text-[#111A35] leading-relaxed">
            WAYPOINT evaluated alternative air and rail routes matching your budget and arrival threshold.
          </p>

          <div className="mt-3 pt-2.5 border-t border-[#2864FF]/10 text-[11px] font-bold text-[#2864FF] flex items-center gap-1">
            <span>Scroll to view optimal recovery below</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
