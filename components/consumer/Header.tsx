'use client';

import React from 'react';
import { Compass, SlidersHorizontal, Luggage, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentTab: 'overview' | 'my-trips' | 'recovery-plans';
  onChangeTab: (tab: 'overview' | 'my-trips' | 'recovery-plans') => void;
  onOpenPreferences: () => void;
  approvedCount: number;
}

export function Header({
  currentTab,
  onChangeTab,
  onOpenPreferences,
  approvedCount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#F7F8FC]/90 backdrop-blur-md border-b border-[#E2E8F0] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onChangeTab('overview')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2864FF] flex items-center justify-center text-white shadow-sm shadow-[#2864FF]/25 group-hover:bg-[#1f52db] transition-colors">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-[#111A35]">
                  WAYPOINT<span className="text-[#2864FF]">AI</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400 hidden lg:inline tracking-wide">
                  &bull; When plans break, your journey doesn&apos;t.
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium sm:hidden">Travel recovery platform</p>
            </div>
          </button>
        </div>

        {/* Center Nav tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#EAF0FF]/70 p-1.5 rounded-2xl border border-[#2864FF]/10">
          <button
            onClick={() => onChangeTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'overview'
                ? 'bg-white text-[#111A35] shadow-xs'
                : 'text-slate-600 hover:text-[#111A35] hover:bg-white/50'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => onChangeTab('my-trips')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'my-trips'
                ? 'bg-white text-[#111A35] shadow-xs'
                : 'text-slate-600 hover:text-[#111A35] hover:bg-white/50'
            }`}
          >
            <Luggage className="w-3.5 h-3.5 text-slate-500" />
            <span>My Trips</span>
          </button>

          <button
            onClick={() => onChangeTab('recovery-plans')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentTab === 'recovery-plans'
                ? 'bg-white text-[#111A35] shadow-xs'
                : 'text-slate-600 hover:text-[#111A35] hover:bg-white/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Recovery Plans</span>
            {approvedCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#18A999]" />
            )}
          </button>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EAF0FF]/40 border border-[#CBD5E1] text-xs font-bold text-[#111A35] shadow-xs cursor-pointer transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#2864FF]" />
            <span className="hidden sm:inline">Preferences</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-[#64748B] text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#18A999]"></span>
            <span>Simulated Data</span>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden items-center justify-around py-2.5 px-4 border-t border-[#E2E8F0] bg-white text-xs font-bold text-slate-600">
        <button
          onClick={() => onChangeTab('overview')}
          className={`py-1.5 px-3 rounded-lg ${currentTab === 'overview' ? 'text-[#2864FF] bg-[#EAF0FF]' : ''}`}
        >
          Overview
        </button>
        <button
          onClick={() => onChangeTab('my-trips')}
          className={`py-1.5 px-3 rounded-lg ${currentTab === 'my-trips' ? 'text-[#2864FF] bg-[#EAF0FF]' : ''}`}
        >
          My Trips
        </button>
        <button
          onClick={() => onChangeTab('recovery-plans')}
          className={`py-1.5 px-3 rounded-lg ${currentTab === 'recovery-plans' ? 'text-[#2864FF] bg-[#EAF0FF]' : ''}`}
        >
          Recovery Plans
        </button>
      </div>
    </header>
  );
}
