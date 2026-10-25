'use client';

import React from 'react';
import { X, SlidersHorizontal, DollarSign, Clock, Layers, GitCommit, Check, RotateCcw, Sparkles } from 'lucide-react';
import { TravellerConstraints } from '@/lib/types';
import { DEFAULT_CONSTRAINTS } from '@/lib/mock-data';

interface PreferencesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  constraints: TravellerConstraints;
  onChangeConstraints: (newConstraints: TravellerConstraints) => void;
  eligibleCount: number;
}

export function PreferencesDrawer({
  isOpen,
  onClose,
  constraints,
  onChangeConstraints,
  eligibleCount,
}: PreferencesDrawerProps) {
  if (!isOpen) return null;

  const handleBudgetChange = (val: number) => {
    onChangeConstraints({ ...constraints, budgetLimit: val });
  };

  const handleDelayChange = (val: number) => {
    onChangeConstraints({ ...constraints, maxAcceptableDelayHours: val });
  };

  const handleModeChange = (mode: TravellerConstraints['preferredMode']) => {
    onChangeConstraints({ ...constraints, preferredMode: mode });
  };

  const handleTransfersChange = (transfers: number) => {
    onChangeConstraints({ ...constraints, maxTransfers: transfers });
  };

  const handleReset = () => {
    onChangeConstraints(DEFAULT_CONSTRAINTS);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full bg-[#F7F8FC] shadow-2xl p-6 sm:p-7 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-[#E2E8F0]"
        role="dialog"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2864FF] text-white flex items-center justify-center shadow-xs">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#111A35]">Traveller Preferences</h3>
                <p className="text-xs text-[#64748B]">Tune constraints for route evaluation</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-[#111A35] hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Real-time qualification status */}
          <div className="my-5 p-4 rounded-2xl bg-[#EAF0FF] border border-[#2864FF]/20 flex items-center justify-between text-xs">
            <span className="text-[#111A35] font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#2864FF]" />
              <span>Matching routes:</span>
            </span>
            <span className="font-extrabold text-[#2864FF] bg-white px-3 py-1 rounded-xl shadow-2xs font-mono">
              {eligibleCount} {eligibleCount === 1 ? 'option qualifies' : 'options qualify'}
            </span>
          </div>

          {/* Controls */}
          <div className="space-y-6 mt-6">
            {/* 1. Maximum Extra Budget */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#111A35] flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#18A999]" />
                  Maximum Additional Budget
                </label>
                <span className="text-xs font-mono font-extrabold text-[#18A999] bg-[#E6F4EA] px-2.5 py-0.5 rounded-lg">
                  ${constraints.budgetLimit} USD
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="800"
                step="50"
                value={constraints.budgetLimit}
                onChange={(e) => handleBudgetChange(Number(e.target.value))}
                className="w-full accent-[#2864FF] h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#94A3B8] mt-1 font-mono">
                <span>$0 (Free rebooking)</span>
                <span>$400 (Standard)</span>
                <span>$800 (Executive)</span>
              </div>
            </div>

            {/* 2. Maximum Acceptable Delay */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#111A35] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Maximum Acceptable Delay
                </label>
                <span className="text-xs font-mono font-extrabold text-[#B45309] bg-[#FFFBEB] px-2.5 py-0.5 rounded-lg">
                  +{constraints.maxAcceptableDelayHours} hours
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={constraints.maxAcceptableDelayHours}
                onChange={(e) => handleDelayChange(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#94A3B8] mt-1 font-mono">
                <span>+1h (Tight)</span>
                <span>+6h (Flexible)</span>
                <span>+16h (Overnight)</span>
              </div>
            </div>

            {/* 3. Transport Mode Preference */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
              <label className="text-xs font-bold text-[#111A35] flex items-center gap-1.5 mb-2.5">
                <Layers className="w-3.5 h-3.5 text-[#2864FF]" />
                Preferred Transport Mode
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['any', 'flight', 'rail', 'hybrid'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleModeChange(mode)}
                    className={`py-2 text-xs font-bold rounded-xl capitalize transition-all cursor-pointer ${
                      constraints.preferredMode === mode
                        ? 'bg-[#2864FF] text-white shadow-xs'
                        : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                    }`}
                  >
                    {mode === 'any' ? 'All' : mode}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Maximum Transfers */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold text-[#111A35] flex items-center gap-1.5">
                    <GitCommit className="w-3.5 h-3.5 text-[#2864FF]" />
                    Maximum Transfers
                  </label>
                  <p className="text-[11px] text-[#64748B]">Connection limit</p>
                </div>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleTransfersChange(num)}
                      className={`w-8 h-8 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        constraints.maxTransfers === num
                          ? 'bg-[#111A35] text-white shadow-xs'
                          : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#111A35] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset preferences</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-[#2864FF] hover:bg-[#1f52db] text-white font-extrabold text-xs shadow-md shadow-[#2864FF]/20 cursor-pointer active:scale-95 transition-all"
          >
            Apply & View Options
          </button>
        </div>
      </div>
    </div>
  );
}
