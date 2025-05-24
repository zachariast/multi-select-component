import { render, screen, fireEvent } from '@testing-library/react';
import OptionsList from '../OptionsList';
import { describe, it, expect, vi } from 'vitest';

describe('OptionsList', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3'];

  it('renders correctly with provided options', () => {
    const mockOnChange = vi.fn();
    render(<OptionsList options={mockOptions} onChange={mockOnChange} />);

    mockOptions.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });

    // Check that checkboxes are unchecked by default
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it('renders selected options when checked=true', () => {
    const mockOnChange = vi.fn();
    render(<OptionsList options={mockOptions} onChange={mockOnChange} checked={true} />);

    // Check that all checkboxes are checked
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked();
    });

    // Check that options have aria-selected="true"
    const listItems = screen.getAllByRole('listitem');
    listItems.forEach(item => {
      expect(item).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('calls onChange with the correct option when clicked', () => {
    const mockOnChange = vi.fn();
    render(<OptionsList options={mockOptions} onChange={mockOnChange} />);

    // Click on the first option
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    // Check that onChange was called with the correct option
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(mockOptions[0]);
  });
});
