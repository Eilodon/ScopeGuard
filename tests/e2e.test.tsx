import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import App from '../src/App';
import { projects } from '../src/data/mockData';

// Mock matchMedia for window
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock fetch for Live API
global.fetch = vi.fn();

describe('End-to-End Flow: ScopeGuard AI', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
    });

    afterEach(() => {
        document.body.innerHTML = '';
        vi.clearAllMocks();
    });

    it('should complete the full analysis flow and interact with output', async () => {
        const user = userEvent.setup();
        
        // Setup fetch to fail so we use the mock fallback for predictable testing
        (global.fetch as Mock).mockRejectedValue(new Error('API offline'));

        render(<App />);

        // 1. Verify Initial State
        expect(screen.getByText('ScopeGuard AI')).toBeInTheDocument();
        
        // 2. Select a different project
        const projectSelect = screen.getByLabelText(/Select Active Project/i);
        const secondProject = projects[1];
        await user.selectOptions(projectSelect, secondProject.id);
        
        // Verify original scope updates
        const originalScopeArea = screen.getByLabelText(/Original Scope of Work/i);
        expect((originalScopeArea as HTMLTextAreaElement).value).toContain(secondProject.name);

        // 3. Toggle Private Vent
        const privateVentCheckbox = screen.getByLabelText(/Private Vent Mode/i);
        await user.click(privateVentCheckbox);
        expect(privateVentCheckbox).toBeChecked();

        // 4. Submit Analysis
        // Using getAllByRole to avoid any theoretical duplicate DOM node issues
        const analyzeButtons = screen.getAllByRole('button', { name: /Analyze Request/i });
        await user.click(analyzeButtons[0]);

        // Wait for spinner to disappear (isAnalyzing false)
        await waitFor(() => {
            expect(analyzeButtons[0]).not.toBeDisabled();
        });

        // 6. Verify Output Rendering
        // Expecting private vent to be visible since we toggled it
        await waitFor(() => {
            expect(screen.getByText('Private Vent')).toBeInTheDocument();
        });

        // 7. Test Smart Reply Tabs
        const firmTab = screen.getByRole('button', { name: /Firm Pushback/i });
        await user.click(firmTab);
        
        await waitFor(() => {
            expect(firmTab.className).toContain('border-indigo-500'); // Active tab styling
        });
    });

    it('should display a subtle demo badge if Live API throws error but fallback succeeds', async () => {
        const user = userEvent.setup();
        (global.fetch as Mock).mockRejectedValue(new Error('Network error'));

        render(<App />);
        
        const analyzeButtons = screen.getAllByRole('button', { name: /Analyze Request/i });
        await user.click(analyzeButtons[0]);

        await waitFor(() => {
            expect(screen.getByText('Demo analysis sample')).toBeInTheDocument();
        });
    });
});
