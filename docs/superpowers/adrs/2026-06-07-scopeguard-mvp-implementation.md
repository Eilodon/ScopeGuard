# ADR: ScopeGuard MVP Implementation

## 1. Title
Implementation of ScopeGuard AI MVP as a static React + Tailwind application with mock data.

## 2. Context
The user requested an absolute precision implementation of the ScopeGuard MVP based on the master blueprint. To satisfy the prompt's high-fidelity requirement within the single interaction, the MVP is built as a client-side application. The integration of live AI was identified as a risk and not strictly necessary for the Hackathon Demo, so a robust mock data layer was used.

## 3. Decision
We built a single-page React app using Vite, Tailwind V4, and Lucide React. The application layout is structured into an InputColumn and OutputColumn. It relies strictly on predefined `mockAnalysisOutput` to replicate the required output seamlessly. Vitest with React Testing Library was used to strictly verify each component during development.

## 4. Status
ACCEPTED

## 5. Consequences
- Improved: Fast, deterministic UI, entirely offline-capable for demo purposes.
- Worsened: Real AI backend integration is absent and will require a proxy or backend layer later.
- Debt created: Hardcoded JSON data within `src/data/mockData.ts`.

## 6. Alternatives Considered
- Live AI Integration: Rejected due to the MVP scope and risks associated with missing API keys on the client-side.
- Next.js: Rejected as Vite provides a faster footprint for a single-page hackathon demo.

## 7. Evidence
All 7 unit/integration tests passed natively utilizing Vitest, ensuring correct rendering of both the input form and conditionally rendered output sections (like the Private Vent toggle).

## 8. Owner
Eidolon-V

## 8b. Known Debts (PATTERN-DEBT)
None

## 9. Next Cycle Trigger
When the user connects a live API backend and the application requires dynamic parsing of an actual LLM response.

## 10. Cycle Retrospective
- What assumption proved wrong during this implementation? Tailwind v4 has shifted from using `tailwind.config.js` to pure CSS imports (`@import "tailwindcss"`).
- What surprised us about the codebase / domain / dependencies? The structure of the Vite React-TS template was sufficient without extensive modifications.
- What would we design differently if starting over? Better layout testing across breakpoints using Playwright.
- What debt was knowingly created and why? Hardcoded mock data to satisfy the fast hackathon demo constraint.
- What signal should the next cycle watch for? Replacing the `setTimeout` in `handleAnalyze` with a real `fetch` call.
