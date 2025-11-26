import Link from '../Link';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import { Link as ExpoRouterLink } from 'expo-router';
import * as Linking from 'expo-linking';
import { mockTheme } from '../../../../__mocks__/mockTheme';

jest.mock('@/providers/ThemeProvider', () => ({
  useAppTheme: () => ({ theme: mockTheme }),
}));

describe('Link Component', () => {
  // Mock Linking.openURL
  const mockOpenURL = jest.fn();
  jest.spyOn(Linking, 'openURL').mockImplementation(mockOpenURL);
  it('should call Linking.openURL when an external link is pressed', () => {
    render(
      <Link
        href='https://reactnative.dev/docs/next/getting-started'
        target='_blank'>
        External Link
      </Link>,
    );

    const externalLink = screen.getByText('External Link');
    fireEvent.press(externalLink);

    expect(mockOpenURL).toHaveBeenCalledWith('https://reactnative.dev/docs/next/getting-started');
  });
  it('Link has basic props such as text children, href, custom id', () => {
    const { getByText, getByTestId } = render(
      <Link
        testID='common-link-id-1'
        href='/'>
        This is the children text
      </Link>,
    );

    const text = getByText('This is the children text');
    expect(getByTestId('common-link-id-1')).toHaveProp('href');
    expect(getByTestId('common-link-id-1')).toHaveProp('children');
    expect(text).toHaveProp('children');
  });
});

// Need routing work on this
// describe('Link to expo router screen in tabs', () => {
//   it('should navigate to the correct internal route when pressed', async () => {
//     renderRouter(
//       {
//         index: () => (
//           <ThemeProvider>
//             <Link href='/(tabs)/favorites'>Favorites Screen</Link>
//           </ThemeProvider>
//         ),
//         favorites: () => screen.getByText('My Favorites'),
//       },
//       {
//         initialUrl: '/',
//       },
//     );

//     const favoritesLink = screen.getByText('Favorites Screen');
//     fireEvent.press(favoritesLink);

//       // Assert that the path has changed
//     expect(screen).toHavePathname('/(tabs)/favorites');
//       // Assert that the content of the new page is rendered
//     expect(screen.getByText('My Favorites')).toBeVisible();
//   });
// });
