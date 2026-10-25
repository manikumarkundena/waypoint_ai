'use client';

import React from 'react';
import { Luggage, Calendar, MapPin, Plane, Train, Hotel, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Trip, DisruptionScenario } from '@/lib/types';
import { SAMPLE_TRIPS } from '@/lib/mock-data';

interface MyTripsViewProps {
  activeScenarioId: string;
  onSelectScenario: (scenarioId: 'flight-cancelled' | 'train-delayed' | 'missed-connection') => void;
  onGoToOverview: () => void;
}

export function MyTripsView({
  activeScenarioId,
  onSelectScenario,
  onGoToOverview,
}: MyTripsViewProps) {
  return (
    <div className="space-y-6 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2864FF]">
            EXECUTIVE TRAVELLER HUB
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111A35] tracking-tight mt-0.5">
            My Scheduled Trips
          </h2>
          <p className="text-xs text-[#64748B]">
            Review all managed client itineraries, connection health, and active travel disruptions.
          </p>
        </div>

        <button
          onClick={onGoToOverview}
          className="px-4 py-2 rounded-xl bg-white border border-[#CBD5E1] text-[#111A35] text-xs font-bold hover:bg-[#F8FAFC] cursor-pointer self-start sm:self-auto"
        >
          Back to Overview
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SAMPLE_TRIPS.map((trip) => {
          const isActive = trip.associatedScenarioId === activeScenarioId;

          return (
            <div
              key={trip.id}
              className={`bg-white rounded-3xl border p-6 transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-[#2864FF] ring-2 ring-[#2864FF]/20 shadow-md'
                  : 'border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#94A3B8] uppercase">
                      PNR: {trip.pnr}
                    </span>
                    <h3 className="text-lg font-black text-[#111A35] mt-0.5">{trip.title}</h3>
                    <div className="text-xs text-[#64748B] font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#2864FF]" />
                      <span>{trip.destinationCity}, {trip.country}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      trip.status === 'disrupted'
                        ? 'bg-[#FFF1F2] text-[#F04462] border border-[#F04462]/30'
                        : 'bg-[#E6F4EA] text-[#137333] border border-emerald-200'
                    }`}
                  >
                    {trip.status === 'disrupted' ? 'Disrupted' : 'Confirmed'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#64748B] my-3">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{trip.dates}</span>
                </div>

                {/* Segments */}
                <div className="space-y-2.5 mt-4">
                  {trip.segments.map((seg) => (
                    <div
                      key={seg.id}
                      className="p-3 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-center text-[#111A35]">
                          {seg.type === 'flight' && <Plane className="w-3.5 h-3.5 text-[#2864FF]" />}
                          {seg.type === 'rail' && <Train className="w-3.5 h-3.5 text-[#2864FF]" />}
                          {seg.type === 'hotel' && <Hotel className="w-3.5 h-3.5 text-amber-500" />}
                        </div>
                        <div>
                          <div className="font-extrabold text-[#111A35]">{seg.operator} {seg.code}</div>
                          <div className="text-[11px] text-[#64748B]">
                            {seg.originCode} &rarr; {seg.destinationCode}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-[10px] font-bold uppercase ${seg.status === 'cancelled' ? 'text-[#F04462]' : seg.status === 'delayed' ? 'text-[#B45309]' : 'text-[#137333]'}`}>
                          {seg.status}
                        </span>
                        <div className="text-[10px] text-[#64748B] font-mono">{seg.departureTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                {trip.associatedScenarioId ? (
                  <button
                    onClick={() => {
                      onSelectScenario(trip.associatedScenarioId!);
                      onGoToOverview();
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                      isActive
                        ? 'bg-[#2864FF] text-white shadow-xs'
                        : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#111A35]'
                    }`}
                  >
                    <span>{isActive ? 'Active on Overview' : 'Load Trip & Recover'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs text-[#137333] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Trip on schedule
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
