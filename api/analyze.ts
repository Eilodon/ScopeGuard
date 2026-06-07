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

function normalizeAnalysisResult(parsed: Record<string, unknown>, tone: string, privateVentEnabled: boolean) {
  const smartReplies = parsed.smart_replies as Record<string, unknown> | undefined;
  const suggestedQuote = parsed.suggested_change_quote as Record<string, unknown> | undefined;
  const timelineImpact = parsed.timeline_impact as Record<string, unknown> | undefined;

  return {
    scope_status: typeof parsed.scope_status === 'string' ? parsed.scope_status : 'out_of_scope',
    risk_level: typeof parsed.risk_level === 'string' ? parsed.risk_level : 'high',
    risk_score_percentage:
      typeof parsed.risk_score_percentage === 'number' ? parsed.risk_score_percentage : 85,
    confidence_score_percentage:
      typeof parsed.confidence_score_percentage === 'number'
        ? parsed.confidence_score_percentage
        : 80,
    summary:
      typeof parsed.summary === 'string'
        ? parsed.summary
        : 'This request may add work outside the original project scope.',
    evidence_highlights: Array.isArray(parsed.evidence_highlights)
      ? parsed.evidence_highlights
      : [],
    out_of_scope_items: Array.isArray(parsed.out_of_scope_items)
      ? parsed.out_of_scope_items
      : [],
    in_scope_items: Array.isArray(parsed.in_scope_items) ? parsed.in_scope_items : [],
    missing_clarifications: Array.isArray(parsed.missing_clarifications)
      ? parsed.missing_clarifications
      : [],
    suggested_change_quote: {
      amount: typeof suggestedQuote?.amount === 'number' ? suggestedQuote.amount : 0,
      currency: typeof suggestedQuote?.currency === 'string' ? suggestedQuote.currency : 'USD',
      label: typeof suggestedQuote?.label === 'string' ? suggestedQuote.label : 'Needs review',
      reason:
        typeof suggestedQuote?.reason === 'string'
          ? suggestedQuote.reason
          : 'More details are needed before quoting.',
    },
    timeline_impact: {
      days: typeof timelineImpact?.days === 'number' ? timelineImpact.days : 0,
      label: typeof timelineImpact?.label === 'string' ? timelineImpact.label : 'Needs review',
    },
    private_vent_roast:
      privateVentEnabled && typeof parsed.private_vent_roast === 'string'
        ? parsed.private_vent_roast
        : '',
    smart_replies: {
      friendly_upsell:
        typeof smartReplies?.friendly_upsell === 'string'
          ? smartReplies.friendly_upsell
          : 'Thanks for the update. I can review this as a separate change request.',
      firm_pushback:
        typeof smartReplies?.firm_pushback === 'string'
          ? smartReplies.firm_pushback
          : 'This appears to be outside the current scope. I can prepare a separate quote for it.',
      follow_up:
        typeof smartReplies?.follow_up === 'string'
          ? smartReplies.follow_up
          : 'Just checking in on the change request. Let me know how you would like to proceed.',
    },
    disclaimer:
      typeof parsed.disclaimer === 'string'
        ? parsed.disclaimer
        : 'ScopeGuard helps with business communication and scope analysis. It does not provide legal advice.',
    selected_tone: tone,
  };
}

export default async function handler(req: Request): Promise<Response> {
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
