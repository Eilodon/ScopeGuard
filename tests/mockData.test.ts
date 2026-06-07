import { test, expect } from 'vitest';
import { getMockAnalysis, projects } from '../src/data/mockData';

test('projects are defined', () => {
    expect(projects.length).toBeGreaterThan(0);
});
test('getMockAnalysis returns predefined json', () => {
    const analysis = getMockAnalysis('TechNova Landing Page');
    expect(analysis.scope_status).toBe('out_of_scope');
});

test('getMockAnalysis returns project-specific output', () => {
    const cafeAnalysis = getMockAnalysis('cafe-logo');

    expect(cafeAnalysis.evidence_highlights[0].client_requested).toBe('menu design');
    expect(cafeAnalysis.suggested_change_quote.label).toBe('+$240');
    expect(cafeAnalysis.smart_replies.friendly_upsell).toContain('menu');
});
