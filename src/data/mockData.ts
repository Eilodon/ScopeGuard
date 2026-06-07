import type { AnalysisResult } from '../types/analysis';

export interface Project {
    id: string;
    name: string;
    price: string;
    included: string[];
    excluded: string[];
    additionalWork: string;
    demoClientRequest: string;
}

export type ReplyTone = 'Friendly' | 'Firm' | 'Diplomatic' | 'Premium' | 'Short';
export type ReplyTabId = 'friendly_upsell' | 'firm_pushback' | 'follow_up';

export const projects: Project[] = [
    {
        id: "technova",
        name: "TechNova Landing Page",
        price: "$700",
        included: [
            "One landing page",
            "Up to 5 sections",
            "Responsive design",
            "Basic contact form",
            "2 revision rounds"
        ],
        excluded: [
            "Copywriting",
            "Payment integration",
            "Additional pages",
            "Custom illustrations",
            "Banner assets",
            "Advanced animations"
        ],
        additionalWork: "$80/hour or fixed change quote after review.",
        demoClientRequest: "Can you also add a payment page, rewrite the copy, and create 3 banner images? Should be quick, right?"
    },
    {
        id: "cafe-logo",
        name: "Cafe Logo Design",
        price: "$450",
        included: [
            "One primary logo",
            "One secondary logo",
            "Color palette",
            "3 revision rounds",
            "Final files in PNG, SVG, and PDF"
        ],
        excluded: [
            "Full brand guideline book",
            "Packaging design",
            "Social media templates",
            "Menu design",
            "Extra logo concepts after approval"
        ],
        additionalWork: "$60/hour or fixed quote after review.",
        demoClientRequest: "Can you also design the menu, 10 Instagram templates, and a packaging sticker? We already paid for the logo so I thought this was included."
    },
    {
        id: "saas-mvp",
        name: "SaaS MVP Build",
        price: "$2,500",
        included: [
            "Authentication",
            "User dashboard",
            "Basic CRUD for one core workflow",
            "Stripe checkout",
            "Deployment to Vercel",
            "2 revision rounds"
        ],
        excluded: [
            "Mobile app",
            "Advanced analytics",
            "Admin panel",
            "Custom AI model training",
            "Third-party integrations beyond Stripe",
            "Ongoing maintenance"
        ],
        additionalWork: "$100/hour or fixed change quote after review.",
        demoClientRequest: "Can you also add an admin dashboard, mobile app version, analytics, and integrate HubSpot before launch? We need it by Friday."
    }
];

const disclaimer = "ScopeGuard helps with business communication and scope analysis. It does not provide legal advice.";

const analysisByProjectId: Record<string, Omit<AnalysisResult, 'analyzed_request' | 'selected_tone'>> = {
    technova: {
        scope_status: "out_of_scope",
        risk_level: "high",
        risk_score_percentage: 92,
        confidence_score_percentage: 88,
        summary: "This request adds three deliverables outside the original agreement.",
        evidence_highlights: [
            {
                client_requested: "payment page",
                original_scope_reference: "payment integration excluded",
                assessment: "out_of_scope"
            },
            {
                client_requested: "copywriting",
                original_scope_reference: "copywriting excluded",
                assessment: "out_of_scope"
            },
            {
                client_requested: "banner assets",
                original_scope_reference: "not listed in deliverables",
                assessment: "out_of_scope"
            }
        ],
        out_of_scope_items: ["payment page", "copywriting", "banner assets"],
        in_scope_items: [],
        missing_clarifications: ["payment provider", "banner dimensions", "copy length"],
        suggested_change_quote: {
            amount: 320,
            currency: "USD",
            label: "+$320",
            reason: "Extra page, copywriting, and banner design."
        },
        timeline_impact: {
            days: 2,
            label: "+2 days"
        },
        private_vent_roast: "This has classic 'just one small thing' energy, except the small thing is three new deliverables in a trench coat. Do not send this to clients.",
        smart_replies: {
            friendly_upsell: "Happy to help with those additions. They are outside the original landing page scope, mainly the payment page, copywriting, and banner assets.\n\nI can add them as a change request for $320 and extend delivery by 2 days. If you prefer to stay within the original budget, we can prioritize the original scope first.",
            firm_pushback: "Thanks for the update. These additions are not included in the original scope, so I would not be able to include them within the current project budget.\n\nWe can either keep the original scope as planned, or I can prepare a separate change quote for the payment page, copywriting, and banner assets.",
            follow_up: "Just checking in on the change request. I can either keep the project on the original scope and timeline, or add the extra items for $320 with a 2-day timeline extension. Let me know which option works best."
        },
        disclaimer
    },
    "cafe-logo": {
        scope_status: "out_of_scope",
        risk_level: "high",
        risk_score_percentage: 88,
        confidence_score_percentage: 84,
        summary: "This request adds menu, social template, and packaging work outside the logo package.",
        evidence_highlights: [
            {
                client_requested: "menu design",
                original_scope_reference: "menu design excluded",
                assessment: "out_of_scope"
            },
            {
                client_requested: "10 Instagram templates",
                original_scope_reference: "social media templates excluded",
                assessment: "out_of_scope"
            },
            {
                client_requested: "packaging sticker",
                original_scope_reference: "packaging design excluded",
                assessment: "out_of_scope"
            }
        ],
        out_of_scope_items: ["menu design", "Instagram templates", "packaging sticker"],
        in_scope_items: [],
        missing_clarifications: ["menu page count", "template dimensions", "sticker print specs"],
        suggested_change_quote: {
            amount: 240,
            currency: "USD",
            label: "+$240",
            reason: "Menu layout, social templates, and packaging sticker design."
        },
        timeline_impact: {
            days: 3,
            label: "+3 days"
        },
        private_vent_roast: "This has 'we bought a logo, so surely the entire brand universe is included' energy. Do not send this to clients.",
        smart_replies: {
            friendly_upsell: "Happy to help with the menu, Instagram templates, and packaging sticker. Those are outside the approved logo package, so I can add them as a separate change request for $240 with a 3-day timeline extension.",
            firm_pushback: "Thanks for clarifying. The current logo package covers the approved logo assets only, so menu design, social templates, and packaging are not included in the existing budget.\n\nI can either keep the project focused on the original logo deliverables or prepare a separate $240 change quote for the added items.",
            follow_up: "Just checking in on the additional cafe design items. I can keep delivering the original logo package as planned, or add the menu, Instagram templates, and packaging sticker for $240 with a 3-day extension."
        },
        disclaimer
    },
    "saas-mvp": {
        scope_status: "out_of_scope",
        risk_level: "high",
        risk_score_percentage: 95,
        confidence_score_percentage: 90,
        summary: "This request adds four major product surfaces outside the SaaS MVP agreement.",
        evidence_highlights: [
            {
                client_requested: "admin dashboard",
                original_scope_reference: "admin panel excluded",
                assessment: "out_of_scope"
            },
            {
                client_requested: "mobile app version",
                original_scope_reference: "mobile app excluded",
                assessment: "out_of_scope"
            },
            {
                client_requested: "analytics",
                original_scope_reference: "advanced analytics excluded",
                assessment: "out_of_scope"
            },
            {
                client_requested: "HubSpot integration",
                original_scope_reference: "third-party integrations beyond Stripe excluded",
                assessment: "out_of_scope"
            }
        ],
        out_of_scope_items: ["admin dashboard", "mobile app", "analytics", "HubSpot integration"],
        in_scope_items: [],
        missing_clarifications: ["admin permissions", "mobile platform", "analytics events", "HubSpot objects"],
        suggested_change_quote: {
            amount: 1200,
            currency: "USD",
            label: "+$1,200",
            reason: "Admin surface, mobile app scope, analytics, and HubSpot integration."
        },
        timeline_impact: {
            days: 8,
            label: "+8 days"
        },
        private_vent_roast: "This has 'before launch' doing the workload of an entire second project. Do not send this to clients.",
        smart_replies: {
            friendly_upsell: "I can help with those additions, but they are outside the current SaaS MVP scope. The admin dashboard, mobile app version, analytics, and HubSpot integration would need a separate change request.\n\nA sensible starting quote is $1,200 with an 8-day timeline extension, after we confirm the exact admin, mobile, analytics, and HubSpot requirements.",
            firm_pushback: "The current MVP scope includes authentication, a user dashboard, one CRUD workflow, Stripe checkout, and Vercel deployment. Admin tooling, mobile app work, advanced analytics, and HubSpot are explicitly outside that scope.\n\nWe can either keep the current launch scope intact or define a separate paid phase for those additions.",
            follow_up: "Following up on the added SaaS requests. I can keep the MVP on the original delivery plan, or scope the admin dashboard, mobile version, analytics, and HubSpot integration as a separate $1,200 change request with an estimated 8-day extension."
        },
        disclaimer
    }
};

interface MockAnalysisOptions {
    request?: string;
    tone?: ReplyTone;
}

export function getMockAnalysis(projectIdOrName: string, options: MockAnalysisOptions = {}): AnalysisResult {
    const project = projects.find((item) => item.id === projectIdOrName || item.name === projectIdOrName) ?? projects[0];
    const analysis = analysisByProjectId[project.id] ?? analysisByProjectId.technova;

    return {
        ...analysis,
        analyzed_request: options.request?.trim() || project.demoClientRequest,
        selected_tone: options.tone ?? 'Friendly'
    };
}
