# WAYPOINT AI — Personal Travel Recovery Assistant

> **Tagline:** *"Plans change. We've got your next move."*  
> **Status:** Production-Ready Consumer Travel-Tech Product  

---

## 🧭 Executive Overview

**WAYPOINT AI** is a premium, consumer-facing travel recovery assistant that helps travellers understand disruptions, compare real-world alternatives, and review an optimized replacement itinerary within seconds.

Instead of navigating crowded airport service desks, confusing carrier telephone queues, or complex policy manuals, WAYPOINT AI immediately answers:
1. **What happened to my trip?**
2. **What is my best alternative?**
3. **How much will it cost?**
4. **When will I arrive?**
5. **What do I do next?**

The **recommended recovery itinerary is the centerpiece** of the product, presented with an editorial, human-first travel interface.

---

## 🎨 Visual Design & Experience

- **Aesthetic:** Warm off-white background (`#fafaf9`), deep midnight navy typography, vivid cobalt blue primary CTAs, soft sky-blue accents, and elegant emerald confirmation states.
- **Hero Itinerary Card:** Prominent horizontal route timeline with origin, transfer nodes, destination, arrival delay difference, carrier details, and clear natural-language rationale:  
  *"We chose this option because it arrives earliest (only +1h 35m delay), stays within your budget, and preserves a direct non-stop flight."*
- **Alternative Routes Comparison:** 2 clean comparative cards below the hero card with concise trade-offs, transfer counts, and 1-click selection.
- **Interactive Disruption Switcher:** Seamless switching across 3 realistic scenarios:
  1. **Flight Cancellation:** British Airways BA-178 (JFK → LHR)
  2. **High-Speed Train Delay:** Eurostar ES-9114 (London → Paris, 190 min delay)
  3. **Missed Connection:** Lufthansa LH-401 hub delay at Frankfurt (FRA)
- **Preferences Drawer:** Slide-over control panel for budget limits, maximum acceptable delay, transport mode preferences, and transfer tolerances.
- **2-Step Review & Confirmation:** "Your recovery plan is ready" review with clear side-by-side journey changes and demo mode confirmation.

---

## 🛠️ Architecture

```
waypoint-ai/
├── app/
│   ├── layout.tsx                     # Editorial light-theme shell, metadata
│   ├── not-found.tsx                  # Dedicated App Router 404 page
│   ├── page.tsx                       # Main Consumer Travel Experience
│   └── globals.css                    # Tailwind CSS v4 styling
├── components/consumer/
│   ├── Header.tsx                     # Minimalist travel header with tabs
│   ├── HeroSection.tsx                # Consumer hero with destination card
│   ├── DisruptionNotice.tsx           # Human-readable disruption notification
│   ├── RecommendedRecoveryHero.tsx    # CENTERPIECE: Large itinerary hero
│   ├── AlternativeCards.tsx           # Clean 2-column comparative routes
│   ├── PreferencesDrawer.tsx          # Slide-over SLA & budget controls
│   ├── ConfirmationModal.tsx          # 2-step review & demo approval modal
│   ├── MyTripsView.tsx                # Scheduled journeys hub
│   └── RecoveryPlansView.tsx          # Recovery itineraries repository
├── lib/
│   ├── types.ts                       # Strongly-typed travel models
│   ├── mock-data.ts                   # Realistic multimodal scenarios & trips
│   └── evaluation-engine.ts           # Deterministic scoring & human rationale
└── package.json
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open in browser
http://localhost:3000
```

To run a production build:
```bash
npm run build
npm run start
```
