import { test, expect } from 'vitest';
import { getMockAnalysis, projects } from '../src/data/mockData';

test('projects are defined', () => {
    expect(projects.length).toBeGreaterThan(0);
});
test('getMockAnalysis returns predefined json', () => {
    const analysis = getMockAnalysis('TechNova Landing Page');
    expect(analysis.scope_status).toBe('out_of_scope');
});
