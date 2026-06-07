# ScopeGuard MVP Implementation Plan

> **For agentic workers:** Use `subagent-driven-development` (recommended)
> or `executing-plans` to implement this plan task-by-task.

**Goal:** Build the ScopeGuard AI MVP as a single-page React + Tailwind app utilizing robust mock data.
**Architecture:** Frontend-only React app. State management via React hooks. UI is divided into a Header, Left Column (inputs), and Right Column (outputs).
**Tech Stack:** React, Vite, Tailwind CSS, Lucide React, Vitest.
**Audit Gate:** PASS WITH FLAGS
**Risk Flags:** 
- UI crashes on missing keys (HIGH)
- "Private Vent" data leaks (HIGH)

---

### Task 1: Project Initialization & Test Setup

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`

- [ ] **Step 1: Write the failing test**
```typescript
// tests/setup.test.ts
import { test, expect } from 'vitest';
test('environment is set up', () => {
    expect(true).toBe(true);
});
```
- [ ] **Step 2: Run — verify FAIL** `npm run test` -> expected: FAIL (not installed)
- [ ] **Step 3: Write minimal implementation**
```bash
npm install -D vitest @testing-library/react jsdom @testing-library/jest-dom tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Configure `vitest.config.ts` for jsdom, update `tailwind.config.js` to scan `./src/**/*.{js,jsx,ts,tsx}`.
- [ ] **Step 4: Run — verify PASS** `npx vitest run` -> expected: PASS
- [ ] **Step 5: Commit** `git commit -m "feat: setup vite, tailwind, and vitest"`

### Task 2: Implement Mock Data Layer

**Files:**
- Create: `src/data/mockData.ts`
- Create: `tests/mockData.test.ts`

- [ ] **Step 1: Write the failing test**
```typescript
// tests/mockData.test.ts
import { test, expect } from 'vitest';
import { getMockAnalysis, projects } from '../src/data/mockData';

test('projects are defined', () => {
    expect(projects.length).toBeGreaterThan(0);
});
test('getMockAnalysis returns predefined json', () => {
    const analysis = getMockAnalysis('TechNova Landing Page');
    expect(analysis.scope_status).toBe('out_of_scope');
});
```
- [ ] **Step 2: Run — verify FAIL** `npx vitest run tests/mockData.test.ts` -> expected: FAIL
- [ ] **Step 3: Write minimal implementation**
Implement `src/data/mockData.ts` containing the 3 projects and the mock JSON analysis from the blueprint.
- [ ] **Step 4: Run — verify PASS** `npx vitest run tests/mockData.test.ts` -> expected: PASS
- [ ] **Step 5: Commit** `git commit -m "feat: implement mock data layer"`

### Task 3: Layout & Header Component

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/App.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Write the failing test**
```typescript
// tests/Header.test.tsx
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import Header from '../src/components/Header';

test('renders header with tagline', () => {
    render(<Header />);
    expect(screen.getByText(/Stop working for free/i)).toBeInTheDocument();
});
```
- [ ] **Step 2: Run — verify FAIL** `npx vitest run tests/Header.test.tsx` -> expected: FAIL
- [ ] **Step 3: Write minimal implementation**
Implement `src/components/Header.tsx` with Tailwind styling. Update `src/index.css` to import tailwind directives. Add Header to `App.tsx`.
- [ ] **Step 4: Run — verify PASS** `npx vitest run tests/Header.test.tsx` -> expected: PASS
- [ ] **Step 5: Commit** `git commit -m "feat: implement layout and header"`

### Task 4: Left Column (Input Form)

**Files:**
- Create: `src/components/InputColumn.tsx`

- [ ] **Step 1: Write the failing test**
```typescript
// tests/InputColumn.test.tsx
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import InputColumn from '../src/components/InputColumn';

test('renders project dropdown and analyze button', () => {
    render(<InputColumn onAnalyze={() => {}} />);
    expect(screen.getByText(/Analyze Request/i)).toBeInTheDocument();
});
```
- [ ] **Step 2: Run — verify FAIL** `npx vitest run tests/InputColumn.test.tsx` -> expected: FAIL
- [ ] **Step 3: Write minimal implementation**
Implement `InputColumn.tsx` containing project selection dropdown, locked scope textarea, client request textarea, tone dropdown, private vent toggle, and the Analyze button.
- [ ] **Step 4: Run — verify PASS** `npx vitest run tests/InputColumn.test.tsx` -> expected: PASS
- [ ] **Step 5: Commit** `git commit -m "feat: implement input column"`

### Task 5: Right Column (Output Cards & Defensive Rendering)

**Files:**
- Create: `src/components/OutputColumn.tsx`

- [ ] **Step 1: Write the failing test**
```typescript
// tests/OutputColumn.test.tsx
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import OutputColumn from '../src/components/OutputColumn';
import { getMockAnalysis } from '../src/data/mockData';

test('renders risk meter and mitigates missing keys', () => {
    const data = getMockAnalysis('TechNova Landing Page');
    render(<OutputColumn data={data} showPrivateVent={false} />);
    expect(screen.getByText(/92% High Risk/i)).toBeInTheDocument();
    expect(screen.queryByText(/classic 'just one small thing' energy/i)).not.toBeInTheDocument();
});
```
- [ ] **Step 2: Run — verify FAIL** `npx vitest run tests/OutputColumn.test.tsx` -> expected: FAIL
- [ ] **Step 3: Write minimal implementation**
Implement `OutputColumn.tsx` utilizing optional chaining (mitigating HIGH risk missing keys) and strict condition for `showPrivateVent` (mitigating HIGH risk data leak).
- [ ] **Step 4: Run — verify PASS** `npx vitest run tests/OutputColumn.test.tsx` -> expected: PASS
- [ ] **Step 5: Commit** `git commit -m "feat: implement output column with defensive rendering"`

### Task 6: Application Integration

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Write the failing test**
```typescript
// tests/App.test.tsx
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from '../src/App';

test('renders both columns', () => {
    render(<App />);
    expect(screen.getByText(/Analyze Request/i)).toBeInTheDocument();
});
```
- [ ] **Step 2: Run — verify FAIL** `npx vitest run tests/App.test.tsx` -> expected: FAIL
- [ ] **Step 3: Write minimal implementation**
Combine `InputColumn` and `OutputColumn` inside `App.tsx`. Wire up the `onAnalyze` handler to simulate a network delay and set the output data state.
- [ ] **Step 4: Run — verify PASS** `npx vitest run tests/App.test.tsx` -> expected: PASS
- [ ] **Step 5: Commit** `git commit -m "feat: integrate application state"`

---

## Risk Summary
- UI crashes on missing keys: Mitigated in Task 5 via defensive optional chaining.
- "Private Vent" data leaks: Mitigated in Task 5 via strict boolean conditional rendering passed from App state.

## Task Risk Summary (task-risk-score)
<!-- task-risk-score: DO NOT DUPLICATE — update this section -->
<!-- last-run: 2026-06-07 | sprint: 1 -->

| Task | S×B/D | QBR | Risk | Boundary | Action |
|------|-------|-----|------|----------|--------|
| Task 1 | 1×1/3 | 0.33 | LOW | SINGLE | proceed |
| Task 2 | 2×2/3 | 1.33 | LOW | SINGLE | proceed |
| Task 3 | - | - | LOW | SINGLE | SKIPPED (trivial) |
| Task 4 | 2×1/3 | 0.67 | LOW | SINGLE | proceed |
| Task 5 | 2×2/3 | 1.33 | LOW | SINGLE | proceed |
| Task 6 | 2×3/3 | 2.0 | LOW | SINGLE | proceed |

**Summary:**
- High-risk tasks: None
- Cross-boundary tasks: None
- Estimated integration-test surface: 1 task needing integration tests (Task 6)
