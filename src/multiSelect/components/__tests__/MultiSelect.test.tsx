import { render, screen } from '@testing-library/react';
import { MultiSelect } from '../MultiSelect';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../store/useMultiSelectStore', () => ({
  useMultiSelectStore: vi.fn()
}));

describe('MultiSelect', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  const mockSelectedOptions = ['Option 1', 'Option 2'];
  const mockOnChange = vi.fn();
  const mockOnSearch = vi.fn();
  const mockQuery = '';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with title and search field', () => {
    render(
      <MultiSelect
        options={mockOptions}
        selectedOptions={mockSelectedOptions}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        query={mockQuery}
      />
    );

    expect(screen.getByText('Productgroep')).toBeInTheDocument();

    expect(screen.getByLabelText('Search options')).toBeInTheDocument();

    expect(screen.getByText('Toepassen')).toBeInTheDocument();
  });

  it('displays both selected and available options when not loading', () => {
    render(
      <MultiSelect
        options={mockOptions}
        selectedOptions={mockSelectedOptions}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        query={mockQuery}
      />
    );

    mockSelectedOptions.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });

    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('Option 4')).toBeInTheDocument();
  });

  it('correctly filters out selected options from available options', () => {
    render(
      <MultiSelect
        options={mockOptions}
        selectedOptions={mockSelectedOptions}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        query={mockQuery}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');

    // First two should be checked (selected options)
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();

    // Last two should be unchecked (available options)
    expect(checkboxes[2]).not.toBeChecked();
    expect(checkboxes[3]).not.toBeChecked();
  });

});
