import SearchBar from '../SearchBar';
import { fireEvent } from '@testing-library/react-native';
import { renderScreen } from '../../../test/helpers/renderScreen';

describe('SearchBar', () => {
  it('renders placeholder and updates input text', () => {
    const mockOnChange = jest.fn();

    const { getByPlaceholderText, getByTestId } = renderScreen(
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
