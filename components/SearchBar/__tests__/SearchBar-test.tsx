import SearchBar from '../SearchBar';
import { fireEvent, render } from '@testing-library/react-native';
import { mockTheme } from '../../../__mocks__/mockTheme';

jest.mock('@/providers/ThemeProvider', () => ({
  useAppTheme: () => ({ theme: mockTheme }),
}));

describe('SearchBar', () => {
  it('renders placeholder and updates input text', () => {
    const mockOnChange = jest.fn();

    const { getByPlaceholderText, getByTestId } = render(
      <SearchBar
        value=''
        placeholder='Search for events by city'
        onChange={mockOnChange}
      />,
    );

    const input = getByPlaceholderText('Search for events by city');
    fireEvent.changeText(input, 'concerts near me');
    expect(mockOnChange).toHaveBeenCalledWith('concerts near me');
    expect(getByTestId('search-input-id').props.value).toBe('');
  });
});
