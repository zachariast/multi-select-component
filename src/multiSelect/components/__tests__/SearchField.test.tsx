import { render, screen, fireEvent } from '@testing-library/react';
import { SearchField } from '../SearchField';
import { describe, it, expect, vi } from 'vitest';

describe('SearchField', () => {
  it('renders correctly with default props', () => {
    const mockOnSearch = vi.fn();
    render(<SearchField query="" onSearch={mockOnSearch} />);

    const inputElement = screen.getByLabelText('Search options');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');

    const searchIcon = screen.getByAltText('Zoek icoon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('displays the query value', () => {
    const mockOnSearch = vi.fn();
    const testQuery = 'test query';
    render(<SearchField query={testQuery} onSearch={mockOnSearch} />);

    const inputElement = screen.getByLabelText('Search options');
    expect(inputElement).toHaveValue(testQuery);
  });

  it('calls onSearch when input value changes', () => {
    const mockOnSearch = vi.fn();
    render(<SearchField query="" onSearch={mockOnSearch} />);

    const inputElement = screen.getByLabelText('Search options');
    const testValue = 'test input';

    fireEvent.change(inputElement, { target: { value: testValue } });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith(testValue);
  });
});
