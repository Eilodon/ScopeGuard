export interface Project {
    id: string;
    name: string;
    price: string;
    included: string[];
    excluded: string[];
    additionalWork: string;
    demoClientRequest: string;
}

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

export const mockAnalysisOutput = {
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
      },
      {
        "client_requested": "copywriting",
        "original_scope_reference": "copywriting excluded",
        "assessment": "out_of_scope"
      },
      {
        "client_requested": "banner assets",
        "original_scope_reference": "not listed in deliverables",
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
      "friendly_upsell": "Happy to help with those additions. They are outside the original landing page scope, mainly the payment page, copywriting, and banner assets.\n\nI can add them as a change request for $320 and extend delivery by 2 days. If you prefer to stay within the original budget, we can prioritize the original scope first.",
      "firm_pushback": "Thanks for the update. These additions are not included in the original scope, so I would not be able to include them within the current project budget.\n\nWe can either keep the original scope as planned, or I can prepare a separate change quote for the payment page, copywriting, and banner assets.",
      "follow_up": "Just checking in on the change request. I can either keep the project on the original scope and timeline, or add the extra items for $320 with a 2-day timeline extension. Let me know which option works best."
    },
    "disclaimer": "ScopeGuard helps with business communication and scope analysis. It does not provide legal advice."
};

export function getMockAnalysis(projectName: string) {
    return mockAnalysisOutput;
}
