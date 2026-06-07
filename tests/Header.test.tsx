import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import Header from '../src/components/Header';

test('renders header with tagline', () => {
    render(<Header />);
    expect(screen.getByText(/Stop working for free/i)).toBeInTheDocument();
});
