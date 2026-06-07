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
    },
    {
        id: "apple-clone",
        name: "Basic Website Setup",
        price: "$1,200",
        included: [
            "5-page static website",
            "Responsive layout",
            "Contact form",
            "Basic SEO setup",
            "1 week of support"
        ],
        excluded: [
            "E-commerce & Payments",
            "User accounts",
            "Custom web app development",
            "AI integration",
            "Content writing"
        ],
        additionalWork: "$150/hour or fixed quote after review.",
        demoClientRequest: "Hey man — quick small update, shouldn’t be a big deal.\n\nI was showing the site to my cousin (he does a bit of coding), and he mentioned this should all be pretty straightforward.\n\nCan you just:\n• Make it look exactly like Apple’s site but more unique\n• Add full payment system + subscriptions + coupons + referral logic\n• Build user + admin dashboards (with analytics, exports, etc.)\n• Rewrite all the content (keep it premium but also relatable and viral)\n• Add smooth animations everywhere (but make sure it loads instantly)\n• Set up SEO so we rank top 3 on Google\n• Integrate WhatsApp, email automation, and an AI chatbot\n• Also maybe turn this into an app later, so keep that in mind while building\n\nLet’s try to wrap this up by tomorrow evening — I have an important demo.\n\nAlso, since most of this is just small tweaks and improvements, let’s keep the budget the same for now. We’ll definitely do more work together after this if it goes well 👍"
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
    },
    "apple-clone": {
        scope_status: "out_of_scope",
        risk_level: "high",
        risk_score_percentage: 99,
        confidence_score_percentage: 98,
        summary: "Severe scope creep. The client is asking to turn a marketing website into a full SaaS/e-commerce platform, while keeping the same budget and compressing delivery into tomorrow evening.",
        evidence_highlights: [
            {
                client_requested: "full payment system + subscriptions",
                original_scope_reference: "E-commerce & Payments excluded",
                assessment: "out_of_scope"
            },
            {
                client_requested: "user + admin dashboards",
                original_scope_reference: "User accounts excluded",
                assessment: "out_of_scope"
            },
            {
                client_requested: "AI chatbot & WhatsApp automation",
                original_scope_reference: "AI integration excluded",
                assessment: "out_of_scope"
            },
            {
                client_requested: "wrap this up by tomorrow evening",
                original_scope_reference: "Standard timelines apply",
                assessment: "out_of_scope"
            },
            {
                client_requested: "Set up SEO so we rank top 3 on Google",
                original_scope_reference: "SEO guarantees excluded / not realistically guaranteeable",
                assessment: "out_of_scope"
            },
            {
                client_requested: "keep the budget the same + tomorrow deadline",
                original_scope_reference: "Commercial and timeline mismatch",
                assessment: "out_of_scope"
            }
        ],
        out_of_scope_items: ["payment system", "dashboards", "content rewrite", "top 3 SEO", "AI chatbot", "app architecture"],
        in_scope_items: [],
        missing_clarifications: ["enterprise budget availability", "payment gateway provider", "app platform (iOS/Android)"],
        suggested_change_quote: {
            amount: 3200,
            currency: "USD",
            label: "+$3,200",
            reason: "Paid scope reset, technical planning, and Phase 2 proposal for the expanded product.\n\nFull implementation estimate: $25k–$45k / 8–12 weeks."
        },
        timeline_impact: {
            days: 7,
            label: "+5–7 business days"
        },
        private_vent_roast: "Ah yes, the classic 'my cousin said it’s easy' maneuver — where a landing page quietly becomes a SaaS platform wearing a fake mustache.",
        smart_replies: {
            friendly_upsell: "Hi there! Thanks for sharing these ideas — there are definitely some valuable directions here.\n\nA few of these may be small refinements, but most of the list is outside the original website scope. Payments, subscriptions, coupons, referral logic, user/admin dashboards, analytics, automations, AI chatbot, and mobile-app planning would turn this from a website project into a full product build.\n\nFor tomorrow’s demo, I recommend we keep the current scope and budget focused on the original website deliverables.\n\nIf you’d like to explore the expanded feature set, I can prepare a separate Phase 2 scope and technical plan. A paid discovery/change-scope package would be $3,200 and take 5–7 business days. After that, I can provide a proper build estimate for the full platform.",
            firm_pushback: "Thanks for the update. While these are exciting directions, they represent a completely new product build. The current agreement covers the 5-page static website only. E-commerce systems, user dashboards, and AI chatbots are explicitly out of scope.\n\nI cannot accommodate these additions within the current budget or by tomorrow evening. I will deliver the project exactly as originally scoped for tomorrow. If you'd like to pursue these new features, I can prepare a paid discovery and Phase 2 proposal next week.",
            follow_up: "Just checking in regarding the new feature requests. As mentioned, I will proceed with the original static site for your demo tomorrow. Let me know if you’d like to keep the scope as-is moving forward, or if you'd like me to send over the paid discovery package to properly map out the SaaS and AI expansion."
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
