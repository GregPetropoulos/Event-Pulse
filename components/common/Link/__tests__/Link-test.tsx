import Link from '../Link';
import { render, fireEvent } from '@testing-library/react-native';
import { renderScreen } from '../../../../test/helpers/renderScreen';

describe('Link Component', () => {
  it('renders and is pressable', () => {
    const { getByTestId } = renderScreen(
      <Link testID="external-link-id" href="https://example.com">
        External Link
      </Link>
    );

    const link = getByTestId('external-link-id');
    fireEvent.press(link);
    expect(link).toBeTruthy();
  });
});
