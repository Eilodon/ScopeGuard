import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from '../src/App';

test('renders both columns', () => {
    render(<App />);
    expect(screen.getByText(/Analyze Request/i)).toBeInTheDocument();
});
