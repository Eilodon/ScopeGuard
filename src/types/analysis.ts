export type RiskLevel = 'low' | 'medium' | 'high';
export type ScopeStatus = 'in_scope' | 'partially_in_scope' | 'out_of_scope';

export interface EvidenceHighlight {
  client_requested: string;
  original_scope_reference: string;
  assessment: 'in_scope' | 'partially_in_scope' | 'out_of_scope';
}

export interface ChangeQuote {
  amount: number;
  currency: string;
  label: string;
  reason: string;
}

export interface TimelineImpact {
  days: number;
  label: string;
}

export interface SmartReplies {
  friendly_upsell: string;
  firm_pushback: string;
  follow_up: string;
  [key: string]: string;
}

export interface AnalysisResult {
  scope_status: ScopeStatus;
  risk_level: RiskLevel;
  risk_score_percentage: number;
  confidence_score_percentage: number;
  summary: string;
  evidence_highlights: EvidenceHighlight[];
  out_of_scope_items: string[];
  in_scope_items: string[];
  missing_clarifications: string[];
  suggested_change_quote: ChangeQuote;
  timeline_impact: TimelineImpact;
  private_vent_roast: string;
  smart_replies: SmartReplies;
  disclaimer: string;
  analyzed_request?: string;
  selected_tone?: string;
}
