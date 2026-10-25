'use client';

import React from 'react';
import { ArrowRight, Plane, Train, Sparkles, MapPin, AlertCircle, Compass, CheckCircle2 } from 'lucide-react';
import { DisruptionScenario, TravellerProfile } from '@/lib/types';

interface HeroSectionProps {
  scenario: DisruptionScenario;
  traveller: TravellerProfile;
  onRecoverClick: () => void;
  onExploreItinerary: () => void;
}

export function HeroSection({
  scenario,
  traveller,
  onRecoverClick,
  onExploreItinerary,
}: HeroSectionProps) {
  const booking = scenario.affectedBooking;

  // Scenario specific graphic coordinate helpers
  const routeMeta = {
    'flight-cancelled': {
      origin: 'JFK',
      originCity: 'New York',
      destination: 'LHR',
      destCity: 'London',
      carrier: 'British Airways BA-178',
      recoveryCarrier: 'Virgin Atlantic VS-004',
      vehicle: 'flight',
      origCoords: { x: 50, y: 120 },
      destCoords: { x: 330, y: 70 },
      curvePath: 'M 50,120 Q 180,30 330,70',
      disruptedMid: { x: 190, y: 65 },
      recoveryCurve: 'M 50,120 Q 200,90 330,70',
      disruptionReason: 'Cancelled: Engine hydraulic maintenance',
      recoveryBenefit: 'Direct Partner Red-Eye &bull; Only +1h 35m arrival',
    },
    'train-delayed': {
      origin: 'STP',
      originCity: 'London St Pancras',
      destination: 'PAR',
      destCity: 'Paris Gare du Nord',
      carrier: 'Eurostar ES-9114',
      recoveryCarrier: 'Eurostar Priority Divert Line',
      vehicle: 'rail',
      origCoords: { x: 60, y: 60 },
      destCoords: { x: 320, y: 130 },
      curvePath: 'M 60,60 Q 180,80 320,130',
      disruptedMid: { x: 175, y: 88 },
      recoveryCurve: 'M 60,60 Q 200,105 320,130',
      disruptionReason: 'Delayed 190m: Channel Tunnel catenary snag',
      recoveryBenefit: 'Direct Priority Corridor &bull; Delay cut to 83m',
    },
    'missed-connection': {
      origin: 'FRA',
      originCity: 'Frankfurt Hub',
      destination: 'MUC',
      destCity: 'Munich Central',
      carrier: 'Lufthansa LH-1198',
      recoveryCarrier: 'Deutsche Bahn ICE 611 High-Speed',
      vehicle: 'flight',
      origCoords: { x: 70, y: 70 },
      destCoords: { x: 320, y: 125 },
      curvePath: 'M 70,70 Q 190,75 320,125',
      disruptedMid: { x: 195, y: 85 },
      recoveryCurve: 'M 70,70 Q 185,115 320,125',
      disruptionReason: 'Connection Breached: Inbound delay from JFK',
      recoveryBenefit: 'Airport Basement Rail &bull; City Center Direct',
    },
  }[scenario.id] || {
    origin: 'JFK',
    originCity: 'New York',
    destination: 'LHR',
    destCity: 'London',
    carrier: 'British Airways BA-178',
    recoveryCarrier: 'Virgin Atlantic VS-004',
    vehicle: 'flight',
    origCoords: { x: 50, y: 120 },
    destCoords: { x: 330, y: 70 },
    curvePath: 'M 50,120 Q 180,30 330,70',
    disruptedMid: { x: 190, y: 65 },
    recoveryCurve: 'M 50,120 Q 200,90 330,70',
    disruptionReason: 'Flight Cancelled',
    recoveryBenefit: 'Direct alternative available',
  };

  return (
    <section className="pt-2 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Editorial Typography & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF0FF] border border-[#2864FF]/20 text-[#2864FF] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRAVEL RECOVERY, REIMAGINED</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#111A35] tracking-tight leading-[1.08]">
            Plans change.<br />
            Your journey <span className="text-[#2864FF]">moves forward.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#475569] font-normal max-w-xl leading-relaxed">
            Your journey disrupted? WAYPOINT compares alternative routes against your budget, arrival time, and travel preferences — so you can decide what happens next.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              onClick={onRecoverClick}
              className="px-7 py-3.5 rounded-xl bg-[#2864FF] hover:bg-[#1f52db] text-white font-bold text-sm shadow-md shadow-[#2864FF]/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Recover my trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreItinerary}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-[#111A35] font-bold text-sm border border-[#CBD5E1] shadow-2xs active:scale-95 transition-all cursor-pointer"
            >
              Explore my itinerary
            </button>
          </div>

          {/* Trust indicator */}
          <div className="pt-2 flex items-center gap-2 text-xs font-medium text-[#64748B]">
            <span className="w-2 h-2 rounded-full bg-[#18A999]"></span>
            <span>Interactive prototype &bull; Simulated travel data</span>
          </div>
        </div>

        {/* Right Side: Sophisticated Visual Journey Composition (5 cols) */}
        <div className="lg:col-span-5">
          <div className="relative bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-5 sm:p-6 overflow-hidden">
            {/* Abstract geographic map background styling */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#111A35_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Header info bar */}
            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block">
                  TRANSIT RADAR &bull; ACTIVE FLIGHT PATH
                </span>
                <span className="text-sm font-extrabold text-[#111A35]">
                  {routeMeta.originCity} &rarr; {routeMeta.destCity}
                </span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF0FF] text-[#2864FF] border border-[#2864FF]/20">
                LIVE SOLVER
              </span>
            </div>

            {/* Visual SVG Route Canvas */}
            <div className="relative h-48 my-3 w-full flex items-center justify-center">
              <svg
                viewBox="0 0 380 180"
                className="w-full h-full overflow-visible"
                aria-label="Route visualization"
              >
                {/* Subtle map coordinate parallels */}
                <path d="M 10,40 Q 190,30 370,40" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                <path d="M 10,90 Q 190,80 370,90" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                <path d="M 10,140 Q 190,130 370,140" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" fill="none" />

                {/* Original Disrupted Route (Red Coral Dotted line with break) */}
                <path
                  d={routeMeta.curvePath}
                  stroke="#F04462"
                  strokeWidth="2.5"
                  strokeDasharray="4,4"
                  fill="none"
                  opacity="0.8"
                />

                {/* Proposed Recovery Route (Electric Cobalt Blue Solid Curve) */}
                <path
                  d={routeMeta.recoveryCurve}
                  stroke="#2864FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Origin Marker */}
                <circle cx={routeMeta.origCoords.x} cy={routeMeta.origCoords.y} r="6" fill="#2864FF" />
                <circle cx={routeMeta.origCoords.x} cy={routeMeta.origCoords.y} r="10" stroke="#2864FF" strokeWidth="1.5" strokeDasharray="2,2" fill="none" />
                <text x={routeMeta.origCoords.x - 12} y={routeMeta.origCoords.y + 22} fontSize="11" fontWeight="bold" fill="#111A35">
                  {routeMeta.origin}
                </text>

                {/* Disruption Break Marker (Midpoint Coral X) */}
                <g transform={`translate(${routeMeta.disruptedMid.x}, ${routeMeta.disruptedMid.y})`}>
                  <circle cx="0" cy="0" r="10" fill="#FFF1F2" stroke="#F04462" strokeWidth="1.5" />
                  <path d="M -3,-3 L 3,3 M 3,-3 L -3,3" stroke="#F04462" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* Recovery Airplane / Vehicle on the blue route */}
                <g transform={`translate(${routeMeta.disruptedMid.x + 15}, ${routeMeta.disruptedMid.y + 35}) rotate(-5)`}>
                  <circle cx="0" cy="0" r="11" fill="#2864FF" />
                  <path
                    d="M -3,-1 L 4,-1 L 6,-4 L 4,-4 L 2,-1 L -1,-1 L -2,-3 L -4,-3 L -3,-1 L -5,-1 L -6,-2 L -7,-2 L -6,-1 L -6,1 L -7,1 L -6,2 L -5,1 L -3,1 L -4,3 L -2,3 L -1,1 L 2,1 L 4,4 L 6,4 L 4,1 L -3,1 Z"
                    fill="#FFFFFF"
                    transform="scale(0.8) translate(-1, -1)"
                  />
                </g>

                {/* Destination Marker */}
                <circle cx={routeMeta.destCoords.x} cy={routeMeta.destCoords.y} r="6" fill="#18A999" />
                <circle cx={routeMeta.destCoords.x} cy={routeMeta.destCoords.y} r="10" stroke="#18A999" strokeWidth="1.5" strokeDasharray="2,2" fill="none" />
                <text x={routeMeta.destCoords.x - 12} y={routeMeta.destCoords.y + 22} fontSize="11" fontWeight="bold" fill="#111A35">
                  {routeMeta.destination}
                </text>
              </svg>

              {/* Floating Disruption Callout Badge */}
              <div className="absolute top-2 left-6 bg-white/95 backdrop-blur-xs border border-[#F04462]/30 rounded-xl px-2.5 py-1 shadow-sm flex items-center gap-1.5 text-[10px] font-bold text-[#F04462]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F04462] animate-pulse"></span>
                <span>Original {routeMeta.carrier.split(' ')[0]} Cancelled</span>
              </div>

              {/* Floating Recovery Callout Badge */}
              <div className="absolute bottom-2 right-4 bg-[#EAF0FF]/95 backdrop-blur-xs border border-[#2864FF]/30 rounded-xl px-2.5 py-1 shadow-sm flex items-center gap-1.5 text-[10px] font-bold text-[#2864FF]">
                <CheckCircle2 className="w-3 h-3 text-[#2864FF]" />
                <span>Recovered via {routeMeta.recoveryCarrier.split(' ')[0]}</span>
              </div>
            </div>

            {/* Departure/Arrival Summary Panel */}
            <div className="relative z-10 pt-3 border-t border-[#F1F5F9] grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="text-[10px] uppercase font-bold text-[#94A3B8]">ORIGINAL ITINERARY</div>
                <div className="font-extrabold text-[#F04462] mt-0.5">{booking.code} ({booking.status})</div>
                <div className="text-[11px] text-[#64748B] mt-0.5 truncate">{booking.departureTime}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#EAF0FF]/70 border border-[#2864FF]/20">
                <div className="text-[10px] uppercase font-bold text-[#2864FF]">RECOVERY ROUTE</div>
                <div className="font-extrabold text-[#111A35] mt-0.5">{routeMeta.recoveryCarrier}</div>
                <div className="text-[11px] text-[#18A999] font-bold mt-0.5 truncate">Confirmed Alternative</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
