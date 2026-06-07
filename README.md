# ScopeGuard AI

**AI Revenue Shield for Freelancers & Small Agencies**

ScopeGuard AI helps freelancers stop working for free by comparing new client requests against the original project scope, detecting scope creep, identifying missing clarifications, suggesting fair change quotes, and drafting professional replies.

## Tagline

Stop working for free. Turn client requests into clear boundaries, fair quotes, and professional replies.

## Demo Flow

1. Select an active project.
2. Review the saved original scope.
3. Paste a client request.
4. Choose a reply tone.
5. Enable or disable Private Vent Mode.
6. Click **Analyze Request & Protect Revenue**.
7. Review scope risk, AI confidence, evidence highlights, clarification chips, suggested quote, timeline impact, and smart replies.
8. Copy the preferred client-ready response.

## AI Implementation

ScopeGuard uses an LLM to perform semantic comparison between the original scope and a new client request. It identifies in-scope and out-of-scope items, extracts missing clarifications, estimates scope creep risk and confidence, suggests pricing and timeline changes, and generates tone-aware business replies.

Unlike a general-purpose chatbot, ScopeGuard is built around a freelancer-specific revenue protection workflow. It remembers the project scope, maps every new request against that agreement, highlights evidence, suggests a structured change quote, and generates one-click professional replies.

## Built During HackOnVibe

- Single-page React/Tailwind demo app
- Project memory with saved scope examples
- Client request analyzer
- Claude-powered scope comparison API
- Risk and confidence meter
- Evidence highlights
- Missing clarification chips
- Suggested change quote
- Timeline impact
- Private Vent Mode
- Smart reply generator
- ROI card
- Discord validation CTA

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Vercel Functions
- Claude API via `@anthropic-ai/sdk`
- Vitest

## Environment Variables

Create a local `.env` file:

```bash
ANTHROPIC_API_KEY=your_key_here
```

For Vercel deployment, add `ANTHROPIC_API_KEY` in Project Settings → Environment Variables.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Disclaimer

ScopeGuard helps with business communication and scope analysis. It does not provide legal advice.
