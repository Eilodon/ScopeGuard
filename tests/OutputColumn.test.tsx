import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import React from 'react';
import OutputColumn from '../src/components/OutputColumn';
import { getMockAnalysis } from '../src/data/mockData';

test('renders risk meter and mitigates missing keys', () => {
    const data = getMockAnalysis('TechNova Landing Page');
    render(<OutputColumn data={data} showPrivateVent={false} />);
    expect(screen.getByText(/92% High Risk/i)).toBeInTheDocument();
    expect(screen.queryByText(/classic 'just one small thing' energy/i)).not.toBeInTheDocument();
});

test('renders private vent when enabled', () => {
    const data = getMockAnalysis('TechNova Landing Page');
    render(<OutputColumn data={data} showPrivateVent={true} />);
    expect(screen.getByText(/classic 'just one small thing' energy/i)).toBeInTheDocument();
});
