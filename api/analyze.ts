import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are ScopeGuard AI, an expert business communication and revenue protection assistant for freelancers and small agencies.

Your job:
- Compare the original project scope against the new client request.
- Identify whether the request is in scope, partially in scope, or out of scope.
- Explain the evidence clearly.
- Identify missing clarifications needed before quoting.
- Suggest a fair change quote and timeline impact.
- Draft professional client replies.
- Optionally generate a private humorous vent, but never insult protected traits, identity, race, gender, religion, disability, nationality, or personal attributes.
- Do NOT provide legal advice.
- Do NOT claim legal certainty.
- Frame outputs as business communication support.
- If the original scope is informal or incomplete, infer cautiously and list missing clarifications instead of making strong claims.

Return ONLY a valid JSON object. No markdown. No code fences. No extra text.

JSON shape:
{
  "scope_status": "out_of_scope",
  "risk_level": "high",
  "risk_score_percentage": 92,
  "confidence_score_percentage": 88,
  "summary": "This request adds three deliverables outside the original agreement.",
  "evidence_highlights": [
    {
      "client_requested": "payment page",
      "original_scope_reference": "payment integration excluded",
      "assessment": "out_of_scope"
    }
  ],
  "out_of_scope_items": ["payment page", "copywriting", "banner assets"],
  "in_scope_items": [],
  "missing_clarifications": ["payment provider", "banner dimensions", "copy length"],
  "suggested_change_quote": {
    "amount": 320,
    "currency": "USD",
    "label": "+$320",
    "reason": "Extra page, copywriting, and banner design."
  },
  "timeline_impact": {
    "days": 2,
    "label": "+2 days"
  },
  "private_vent_roast": "This has classic 'just one small thing' energy — except the small thing is three new deliverables in a trench coat. Do not send this to clients.",
  "smart_replies": {
    "friendly_upsell": "Client-ready email here.",
    "firm_pushback": "Client-ready email here.",
    "follow_up": "Client-ready email here."
  },
  "disclaimer": "ScopeGuard helps with business communication and scope analysis. It does not provide legal advice."
}`;

function extractJson(text: string): Record<string, unknown> {
  const cleaned = text.trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) {
      throw new Error('Claude response did not contain valid JSON.');
    }
    return JSON.parse(cleaned.slice(start, end + 1));
  }
}

const riskLevels = new Set(['low', 'medium', 'high']);
const scopeStatuses = new Set(['in_scope', 'partially_in_scope', 'out_of_scope']);
const assessments = new Set(['in_scope', 'partially_in_scope', 'out_of_scope']);

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  if (typeof value === 'string') {
    const parsed = Number(value.replace('%', '').trim());
    if (Number.isFinite(parsed)) return parsed;
  }

  return fallback;
}

function clampPercent(value: unknown, fallback: number): number {
  const number = asNumber(value, fallback);
  return Math.max(0, Math.min(100, Math.round(number)));
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim());
}

function normalizeRiskLevel(value: unknown) {
  const candidate = asString(value, 'high');
  return riskLevels.has(candidate) ? candidate : 'high';
}

function normalizeScopeStatus(value: unknown) {
  const candidate = asString(value, 'out_of_scope');
  return scopeStatuses.has(candidate) ? candidate : 'out_of_scope';
}

function normalizeAssessment(value: unknown) {
  const candidate = asString(value, 'out_of_scope');
  return assessments.has(candidate) ? candidate : 'out_of_scope';
}

function normalizeEvidenceHighlights(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map(asRecord)
    .filter((item): item is Record<string, unknown> => item !== null)
    .map((item) => ({
      client_requested: asString(item.client_requested, 'Client requested additional work'),
      original_scope_reference: asString(
        item.original_scope_reference,
        'Not clearly included in the original scope',
      ),
      assessment: normalizeAssessment(item.assessment),
    }))
    .slice(0, 6);
}

function normalizeAnalysisResult(
  parsed: Record<string, unknown>,
  tone: string,
  privateVentEnabled: boolean,
) {
  const smartReplies = asRecord(parsed.smart_replies);
  const suggestedQuote = asRecord(parsed.suggested_change_quote);
  const timelineImpact = asRecord(parsed.timeline_impact);

  return {
    scope_status: normalizeScopeStatus(parsed.scope_status),
    risk_level: normalizeRiskLevel(parsed.risk_level),
    risk_score_percentage: clampPercent(parsed.risk_score_percentage, 85),
    confidence_score_percentage: clampPercent(parsed.confidence_score_percentage, 80),
    summary: asString(
      parsed.summary,
      'This request may add work outside the original project scope.',
    ),
    evidence_highlights: normalizeEvidenceHighlights(parsed.evidence_highlights),
    out_of_scope_items: asStringArray(parsed.out_of_scope_items),
    in_scope_items: asStringArray(parsed.in_scope_items),
    missing_clarifications: asStringArray(parsed.missing_clarifications),
    suggested_change_quote: {
      amount: asNumber(suggestedQuote?.amount, 0),
      currency: asString(suggestedQuote?.currency, 'USD'),
      label: asString(suggestedQuote?.label, 'Needs review'),
      reason: asString(suggestedQuote?.reason, 'More details are needed before quoting.'),
    },
    timeline_impact: {
      days: asNumber(timelineImpact?.days, 0),
      label: asString(timelineImpact?.label, 'Needs review'),
    },
    private_vent_roast:
      privateVentEnabled && typeof parsed.private_vent_roast === 'string'
        ? parsed.private_vent_roast.trim()
        : '',
    smart_replies: {
      friendly_upsell: asString(
        smartReplies?.friendly_upsell,
        'Thanks for the update. I can review this as a separate change request.',
      ),
      firm_pushback: asString(
        smartReplies?.firm_pushback,
        'This appears to be outside the current scope. I can prepare a separate quote for it.',
      ),
      follow_up: asString(
        smartReplies?.follow_up,
        'Just checking in on the change request. Let me know how you would like to proceed.',
      ),
    },
    disclaimer: asString(
      parsed.disclaimer,
      'ScopeGuard helps with business communication and scope analysis. It does not provide legal advice.',
    ),
    selected_tone: tone,
  };
}

async function handleAnalyzeRequest(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'Missing ANTHROPIC_API_KEY' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { originalScope, clientRequest, tone, privateVentEnabled } = body;

    if (!originalScope || !clientRequest) {
      return Response.json(
        { error: 'originalScope and clientRequest are required' },
        { status: 400 },
      );
    }

    const userPrompt = `
Original Scope:
${originalScope}

Client Request:
${clientRequest}

Tone:
${tone || 'Friendly'}

Private Vent Enabled:
${Boolean(privateVentEnabled)}

The reply tone must be: ${tone || 'Friendly'}. Make all smart replies follow this tone.

Generate the ScopeGuard analysis as valid JSON only.
`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 1800,
      temperature: 0.2,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const firstBlock = message.content[0];

    if (!firstBlock || firstBlock.type !== 'text') {
      return Response.json({ error: 'Unexpected Claude response format' }, { status: 502 });
    }

    const parsed = extractJson(firstBlock.text);
    const normalized = normalizeAnalysisResult(parsed, tone || 'Friendly', Boolean(privateVentEnabled));

    return Response.json(normalized);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}

export default {
  fetch: handleAnalyzeRequest,
};

export const config = {
  maxDuration: 30,
};
