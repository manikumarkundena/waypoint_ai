'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Header } from '@/components/consumer/Header';
import { HeroSection } from '@/components/consumer/HeroSection';
import { DisruptionNotice } from '@/components/consumer/DisruptionNotice';
import { RecommendedRecoveryHero } from '@/components/consumer/RecommendedRecoveryHero';
import { AlternativeCards } from '@/components/consumer/AlternativeCards';
import { PreferencesDrawer } from '@/components/consumer/PreferencesDrawer';
import { ConfirmationModal } from '@/components/consumer/ConfirmationModal';
import { MyTripsView } from '@/components/consumer/MyTripsView';
import { RecoveryPlansView } from '@/components/consumer/RecoveryPlansView';

import {
  DISRUPTION_SCENARIOS,
  MOCK_ALTERNATIVES,
  SAMPLE_TRAVELLER,
  DEFAULT_CONSTRAINTS,
} from '@/lib/mock-data';
import { evaluateAlternatives } from '@/lib/evaluation-engine';
import { AlternativeOption, TravellerConstraints, DisruptionScenario } from '@/lib/types';

export default function WaypointConsumerApp() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<'overview' | 'my-trips' | 'recovery-plans'>('overview');

  // Active Disruption Scenario
  const [activeScenarioId, setActiveScenarioId] = useState<'flight-cancelled' | 'train-delayed' | 'missed-connection'>('flight-cancelled');
  const [constraints, setConstraints] = useState<TravellerConstraints>(DEFAULT_CONSTRAINTS);
  const [customSelectedOption, setCustomSelectedOption] = useState<AlternativeOption | null>(null);

  // Modals & Drawers
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('WP-REC-88294-OK');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Anchor to scroll to recovery section
  const recoverySectionRef = useRef<HTMLDivElement>(null);

  const currentScenario = DISRUPTION_SCENARIOS[activeScenarioId];

  // Evaluate candidate alternatives deterministically against traveller constraints
  const evaluation = useMemo(() => {
    const rawAlternatives = MOCK_ALTERNATIVES[activeScenarioId] || [];
    return evaluateAlternatives(rawAlternatives, constraints);
  }, [activeScenarioId, constraints]);

  // The active option (either user-selected alternative or top recommended)
  const activeSelectedOption = useMemo(() => {
    if (customSelectedOption) {
      const match = evaluation.eligible.find((o) => o.id === customSelectedOption.id);
      if (match) return match;
    }
    return evaluation.recommended;
  }, [customSelectedOption, evaluation.eligible, evaluation.recommended]);

  // Actions
  const handleSelectScenario = (id: 'flight-cancelled' | 'train-delayed' | 'missed-connection') => {
    setActiveScenarioId(id);
    setCustomSelectedOption(null);
    setIsApproved(false);
  };

  const handleRecoverClick = () => {
    if (currentTab !== 'overview') {
      setCurrentTab('overview');
    }
    setTimeout(() => {
      recoverySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleExploreItinerary = () => {
    setCurrentTab('my-trips');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChooseItinerary = (option: AlternativeOption) => {
    setCustomSelectedOption(option);
    setIsConfirmationOpen(true);
  };

  const handleApproveInDemo = () => {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    setConfirmationCode(`WP-REC-${randomCode}-OK`);
    setIsApproved(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#111A35] flex flex-col font-sans selection:bg-[#2864FF] selection:text-white">
      {/* 1. PRODUCT NAVIGATION */}
      <Header
        currentTab={currentTab}
        onChangeTab={(tab) => setCurrentTab(tab)}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        approvedCount={isApproved ? 1 : 0}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* OVERVIEW VIEW */}
        {currentTab === 'overview' && (
          <>
            {/* 2. MAIN HERO SECTION */}
            <HeroSection
              scenario={currentScenario}
              traveller={SAMPLE_TRAVELLER}
              onRecoverClick={handleRecoverClick}
              onExploreItinerary={handleExploreItinerary}
            />

            {/* 3. ACTIVE DISRUPTION NOTIFICATION */}
            <div ref={recoverySectionRef} className="scroll-mt-24">
              <DisruptionNotice
                currentScenario={currentScenario}
                onSelectScenario={handleSelectScenario}
                isSimulating={isSimulating}
              />
            </div>

            {/* 4. RECOMMENDED RECOVERY — THE HERO COMPONENT */}
            <section className="space-y-4">
              <RecommendedRecoveryHero
                evaluation={evaluation}
                scenario={currentScenario}
                onChooseItinerary={handleChooseItinerary}
                isSelected={activeSelectedOption?.id === evaluation.recommended?.id && isApproved}
              />
            </section>

            {/* 5. ALTERNATIVE OPTIONS */}
            {evaluation.eligible.length > 1 && (
              <section>
                <AlternativeCards
                  alternatives={evaluation.eligible}
                  selectedOptionId={activeSelectedOption?.id || null}
                  onSelectOption={handleChooseItinerary}
                />
              </section>
            )}
          </>
        )}

        {/* MY TRIPS VIEW */}
        {currentTab === 'my-trips' && (
          <MyTripsView
            activeScenarioId={activeScenarioId}
            onSelectScenario={handleSelectScenario}
            onGoToOverview={() => setCurrentTab('overview')}
          />
        )}

        {/* RECOVERY PLANS VIEW */}
        {currentTab === 'recovery-plans' && (
          <RecoveryPlansView
            scenario={currentScenario}
            selectedOption={activeSelectedOption}
            isApproved={isApproved}
            confirmationCode={confirmationCode}
            traveller={SAMPLE_TRAVELLER}
            onGoToOverview={() => setCurrentTab('overview')}
            onOpenConfirmation={() => setIsConfirmationOpen(true)}
          />
        )}

        {/* 6. TRAVELLER PREFERENCES DRAWER */}
        <PreferencesDrawer
          isOpen={isPreferencesOpen}
          onClose={() => setIsPreferencesOpen(false)}
          constraints={constraints}
          onChangeConstraints={(newC) => setConstraints(newC)}
          eligibleCount={evaluation.eligible.length}
        />

        {/* 7. RECOVERY CONFIRMATION & APPROVAL MODAL */}
        {activeSelectedOption && (
          <ConfirmationModal
            isOpen={isConfirmationOpen}
            onClose={() => setIsConfirmationOpen(false)}
            scenario={currentScenario}
            selectedOption={activeSelectedOption}
            traveller={SAMPLE_TRAVELLER}
            isApproved={isApproved}
            onApproveInDemo={handleApproveInDemo}
            confirmationCode={confirmationCode}
          />
        )}
      </main>

      {/* TASTEFUL FOOTER */}
      <footer className="mt-16 border-t border-[#E2E8F0] bg-white py-10 text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="font-black text-[#111A35] text-sm tracking-tight">WAYPOINT<span className="text-[#2864FF]">AI</span></span>
            <span className="text-slate-300">&bull;</span>
            <span className="font-medium text-[#475569]">When plans break, your journey doesn&apos;t.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#94A3B8] font-medium flex-wrap justify-center">
            <span>DEVHOST 2026 &bull; Problem Statement 4.1</span>
            <span>&bull;</span>
            <span>Interactive Prototype &bull; Simulated Travel Data</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
