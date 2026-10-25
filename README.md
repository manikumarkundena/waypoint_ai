# WAYPOINT AI — Travel Disruption Recovery

> **Tagline:** *When plans break, your journey doesn’t.*
>
> **DEVHOST 2026 · Problem Statement PS 4.1 — AI Agent for Travel Disruption Recovery**
>
> ⚠️ **IMPORTANT — CORRECT LIVE DEMO LINK:** Use **https://waypointai-gold.vercel.app/**. The previously shared URL `https://waypoint_ai.vercel.app/` was incorrect. Please use the corrected link for demos and submissions.

## 🔗 Project Links

- **Live prototype:** https://waypointai-gold.vercel.app/
- **GitHub repository:** https://github.com/manikumarkundena/waypoint_ai
- **Project report and supporting files:** https://drive.google.com/drive/folders/1XjKyFwUR0EIeNzTm-fTQY_XbKgfgBJzN?usp=sharing

## 🧭 Overview

**WAYPOINT AI** is a consumer-facing travel recovery prototype that helps a traveller understand a simulated disruption, compare alternative journeys, and review a proposed recovery itinerary.

It is designed around five practical questions:

1. What happened to my trip?
2. Which alternatives fit my preferences?
3. What is the estimated cost?
4. When would I arrive?
5. Which option should I review next?

The recovery itinerary is the centrepiece of the experience, with a clear route visualization, traveller constraints, alternative comparisons, and an explicit review step.

## ✨ Main Features

- **Three disruption scenarios:** flight cancellation, train delay, and missed connection.
- **Traveller preferences:** budget, maximum acceptable delay, preferred transport mode, and transfer limit.
- **Alternative comparison:** compare synthetic options using cost, duration, arrival time, and transfers.
- **Recommendation rationale:** present understandable reasons based on the prototype's local evaluation rules.
- **Recovery review:** select an itinerary and confirm it in demo mode.
- **Responsive interface:** a travel-focused visual experience for desktop and mobile.

## 🧪 Important Prototype Scope

This is a **frontend-only hackathon prototype**. It uses predefined synthetic travel scenarios and deterministic client-side logic. It does **not** connect to live airline or railway systems, verify real-time inventory or fares, purchase tickets, or modify actual bookings. Any approval shown in the interface is a demo state only.

Please do not use the simulated itineraries to make real travel decisions. The prototype should not be described as a production-ready live booking service or as a trained machine-learning system.

## 🎨 Design Direction

- Warm off-white surfaces and deep navy typography.
- Cobalt-blue primary actions and restrained disruption-status colours.
- Route diagrams and itinerary timelines to make journeys easier to understand.
- A featured recovery recommendation with comparable alternatives.
- Clear simulated-data labels and user-controlled confirmation.

## 🛠️ Technology and Architecture

The application is implemented as a frontend web experience. The repository's current code and `package.json` are the source of truth for the exact framework and dependency versions.

The intended client-side flow is:

```text
Traveller selects a disruption
          ↓
Synthetic scenario data
          ↓
Apply traveller constraints
          ↓
Filter and rank alternatives
          ↓
Review recovery itinerary
          ↓
Demo-only confirmation
```

No backend, database, live travel API, payment flow, or real booking integration is part of the current prototype.

## 🚀 Run Locally

Make sure Node.js and npm are installed, then run:

```bash
git clone https://github.com/manikumarkundena/waypoint_ai.git
cd waypoint_ai
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

To verify a production build:

```bash
npm run build
npm run start
```

## 🧭 Demo Checklist

1. Open the corrected live prototype: https://waypointai-gold.vercel.app/
2. Switch between the three disruption scenarios.
3. Adjust traveller preferences.
4. Compare the alternatives and select a recovery option.
5. Review and approve the plan in demo mode.
6. Confirm that the interface identifies the information as simulated and does not claim to change a real booking.

## 📄 Report and Submission

- **Project report / supporting files:** https://drive.google.com/drive/folders/1XjKyFwUR0EIeNzTm-fTQY_XbKgfgBJzN?usp=sharing
- **Live demo:** https://waypointai-gold.vercel.app/
- **Source code:** https://github.com/manikumarkundena/waypoint_ai

---

**WAYPOINT AI — When plans break, your journey doesn’t.**  
*DEVHOST 2026 · PS 4.1 · Interactive prototype using simulated travel data*
