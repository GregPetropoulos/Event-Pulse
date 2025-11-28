import { render, screen } from '@testing-library/react-native';
import TextTitle from '../TextTitle';
import { mockTheme } from '../../../../__mocks__/mockTheme';

jest.mock('@/providers/ThemeProvider', () => ({
  useAppTheme: () => ({ theme: mockTheme }),
}));

describe('TextTitle Component', () => {
  it('renders the children text correctly', () => {
    const testMessage = 'Hello world!';
    render(<TextTitle>{testMessage}</TextTitle>);

    // Use getByText to find the rendered Text component by its content
    expect(screen.getByText(testMessage)).toBeOnTheScreen();
  });

  it('applies the default theme primary color when no color style is provided', () => {
    const testMessage = 'Default color text';
    render(<TextTitle>{testMessage}</TextTitle>);

    const textComponent = screen.getByText(testMessage);

    // Check if the style applied to the component matches the mock theme's color
    expect(textComponent.props.style[1].color).toBe(mockTheme.colors.textPrimary);
  });

  it('applies a custom color when the override color is provided to the style', () => {
    const testMessage = 'Custom color text';
    const customColor = '#FF0000';
    render(<TextTitle style={{ color: customColor }}>{testMessage}</TextTitle>);

    const textComponent = screen.getByText(testMessage);

    // Check if the style applied matches the custom color prop, overriding the default
    expect(textComponent.props.style[2].color).toBe(customColor);
  });

  it('applies fixedTypographyStyles typography styles from the theme', () => {
    const testMessage = 'Themed Styled text';
    render(<TextTitle>{testMessage}</TextTitle>);

    const textComponent = screen.getByText(testMessage);
    // Check if the typography styles from the mock theme are present
    expect(textComponent.props.style[3].fontFamily).toBe(mockTheme.typography.title.fontFamily);
    expect(textComponent.props.style[3].fontSize).toBe(mockTheme.typography.title.fontSize);
    expect(textComponent.props.style[3].lineHeight).toBe(mockTheme.typography.title.lineHeight);
  });

  it('renders React nodes as children', () => {
    const childNode = <TextTitle>Nested text</TextTitle>;
    render(<TextTitle>{childNode}</TextTitle>);

    // Check if the nested text is rendered
    expect(screen.getByText('Nested text')).toBeOnTheScreen();
  });
});
