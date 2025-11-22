import Link from '../Link';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import { Link as ExpoRouterLink } from 'expo-router'; // Assuming you are using expo-router
import * as Linking from 'expo-linking'; // Or 'react-native' if not using expo-linking

// Mock Linking.openURL
const mockOpenURL = jest.fn();
jest.spyOn(Linking, 'openURL').mockImplementation(mockOpenURL);

describe('Link Component', () => {
  it('should call Linking.openURL when an external link is pressed', () => {
    render(
      <Link
        href='https://example.com'
        target='_blank'>
        External Link
      </Link>,
    );

    const externalLink = screen.getByText('External Link');
    fireEvent.press(externalLink);

    expect(mockOpenURL).toHaveBeenCalledWith('https://example.com');
  });
  it('Link has basic props such as text children, href, custom id', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <Link
          testID='common-link-id-1'
          href='/'>
          This is the children text
        </Link>
      </ThemeProvider>,
    );

    const text = getByText('This is the children text');
    expect(getByTestId('common-link-id-1')).toHaveProp('href');
    expect(getByTestId('common-link-id-1')).toHaveProp('children');
    expect(text).toHaveProp('children');
  });
  // Need routing work on this
  // it('should navigate to the correct internal route when pressed', async () => {
  //   renderRouter(
  //     {
  //       index: () => <Link href='/(tabs)/favorites'>Favorites Screen</Link>,
  //       favorites: () => screen.getByText('My Favorites'),
  //     },
  //     {
  //       initialUrl: '/',
  //     },
  //   );

  //   const favoritesLink = screen.getByText('Favorites Screen');
  //   fireEvent.press(favoritesLink);

  // //   // Assert that the path has changed
  //   // expect(screen).toHavePathname('/(tabs)/favorites');
  // //   // Assert that the content of the new page is rendered
  // //   // expect(screen.getByText('My Favorites')).toBeVisible();
  // });
});
