import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '@/components/SearchBar';
import { ThemeProvider } from '@/providers/ThemeProvider';

describe('SearchBar', () => {
  it('renders placeholder and updates input text', () => {
    const mockOnChange = jest.fn();

    const { getByPlaceholderText, getByTestId } = render(
      <ThemeProvider>
        <SearchBar
          value=''
          placeholder='Search for events by city'
          onChange={mockOnChange}
        />
      </ThemeProvider>,
    );

    const input = getByPlaceholderText('Search for events by city');
    fireEvent.changeText(input, 'concerts near me');
    expect(mockOnChange).toHaveBeenCalledWith('concerts near me');
    expect(getByTestId('search-input').props.value).toBe('');
  });
});
