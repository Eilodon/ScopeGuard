import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import InputColumn from '../src/components/InputColumn';
import { projects } from '../src/data/mockData';

test('renders project dropdown and analyze button', () => {
    const onAnalyze = vi.fn();
    render(<InputColumn projects={projects} onAnalyze={onAnalyze} isAnalyzing={false} />);
    expect(screen.getByText(/Analyze Request/i)).toBeInTheDocument();
});
