---
title: ScopeGuard AI v2.6 MVP
SPEC_APPROVED: true
SPEC_ESCALATION: false
---

# ScopeGuard AI v2.6 MVP Specification

## 1. Overview
ScopeGuard AI helps freelancers and small agencies compare new client requests against the original project scope, detect scope creep, identify missing clarifications, suggest fair change quotes, estimate timeline impact, and draft professional replies.

This is a Lean Hackathon Demo Version. It will be built as a single-page React + Tailwind demo app. 

## 2. Tech Stack
- Frontend Framework: React (via Vite)
- Styling: Tailwind CSS
- State Management: React Hooks (useState, useMemo)
- Icons: Lucide React
- Backend: Mock API (Live AI integration is optional/secondary. MVP relies on robust mock JSON data based on the blueprint.)

## 3. Core User Flow
1. User selects an active project from a dropdown.
2. App loads saved project scope.
3. User pastes a new client request.
4. User chooses reply tone (Friendly, Firm, Diplomatic, Premium, Short).
5. User enables or disables Private Vent Mode.
6. User clicks Analyze Request & Protect Revenue.
7. System shows the mock analysis output on the right column.

## 4. UI Layout (Single-Page Dashboard)
### 4.1 Header
- Logo & Taglines: "Stop working for free." and "AI Revenue Shield for Freelancers"
- Badge: "Built for HackOnVibe"

### 4.2 Left Column (Inputs)
- **Project Selection**: Dropdown with mock projects (TechNova Landing Page, Cafe Logo Design, SaaS MVP Build).
- **Original Scope**: Locked textarea, auto-filled based on project selection.
- **Client Request**: Textarea for pasting the request.
- **Analysis Settings**:
  - Reply tone dropdown
  - Private Vent Mode toggle
  - CTA Button: "Analyze Request & Protect Revenue"

### 4.3 Right Column (Outputs)
- **Risk Meter**: Scope Creep Risk (e.g., 92% High Risk) & AI Confidence Score.
- **Evidence Highlights**: Why it is out of scope (Client requested vs Original scope vs Assessment).
- **Clarifications Needed**: Chips for missing info.
- **Private Vent**: Funny roast (visible only if toggle is on).
- **Suggested Change Quote**: Amount, timeline impact, reason.
- **Smart Replies**: Tabs for Friendly Upsell, Firm Pushback, Follow-up.
- **Instant ROI**: Example calculation of ROI.
- **Community CTA**: Discord share text.

## 5. Mock Data
We will implement 3 mock projects with predefined Original Scope and Demo Client Requests, along with the predefined Mock JSON output for the analysis as defined in the Master Blueprint.

## 6. Assumptions and Limitations
- The application is a static, frontend-only mock. Data is hardcoded.
- "Analyze" button will simulate a network delay and then reveal the predefined mock output for the selected project.
- No database or backend is required for this phase.

## Risk Assessment (audit-design)
<!-- audit-design: DO NOT DUPLICATE — update this section, do not append a second one -->
<!-- last-run: 2026-06-07 | trigger: NORMAL -->

**Tier:** 1 | **Date:** 2026-06-07

### Failure Modes
1. Hardcoded mock data limits testing -> Users interact with form but only get static output -> MED - mitigation in plan: YES
2. UI crashes on missing keys -> If real API is integrated later without graceful degradation, component crashes -> HIGH - mitigation in plan: YES
3. "Private Vent" data leaks -> State overlaps might display the roast text in the wrong section -> HIGH - mitigation in plan: YES

### Layer Signals
L1 Logic: Static state transitions fail to account for edge cases in form state?
L5 Security: If real API integrated, client-side API keys could leak.

### Assumptions to Verify
ASSUMED: MVP relies solely on predefined mock JSON data.
ASSUMED: The application is a static, frontend-only mock. Data is hardcoded.

### Abductive Hypotheses
Abductive 1: The "Private Vent Mode" text might be mistakenly rendered in the client-facing Smart Replies if state is shared.
Abductive 2: An error in parsing mock JSON objects may result in a blank Right Column instead of a fallback UI.

### Gate Result
<!-- PASS | PASS WITH FLAGS | HOLD -->
PASS WITH FLAGS — proceed; writing-plans MUST include mitigation for HIGH findings
