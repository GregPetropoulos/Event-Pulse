
import { render, screen } from '@testing-library/react-native';
import TextBody from '../TextBody';
import { mockTheme } from '../../../../__mocks__/mockTheme';

jest.mock('@/providers/ThemeProvider', () => ({
  useAppTheme: () => ({ theme: mockTheme }),
}));

describe('TextBody Component', () => {
  it('renders the children text correctly', () => {
    const testMessage = 'Hello world!';
    render(<TextBody>{testMessage}</TextBody>);

    // Use getByText to find the rendered Text component by its content
    expect(screen.getByText(testMessage)).toBeOnTheScreen();
  });

  it('applies the default theme primary color when no color prop is provided', () => {
    const testMessage = 'Default color text';
    render(<TextBody>{testMessage}</TextBody>);

    const textComponent = screen.getByText(testMessage);

    // Check if the style applied to the component matches the mock theme's color
    expect(textComponent.props.style.color).toBe(mockTheme.colors.textPrimary);
  });

  it('applies a custom color when the color prop is provided', () => {
    const testMessage = 'Custom color text';
    const customColor = '#FF0000'; 
    render(<TextBody color={customColor}>{testMessage}</TextBody>);

    const textComponent = screen.getByText(testMessage);

    // Check if the style applied matches the custom color prop, overriding the default
    expect(textComponent.props.style.color).toBe(customColor);
  });

  it('applies default typography styles from the theme', () => {
    const testMessage = 'Styled text';
    render(<TextBody>{testMessage}</TextBody>);

    const textComponent = screen.getByText(testMessage);

    // Check if the typography styles from the mock theme are present
    expect(textComponent.props.style.fontSize).toBe(mockTheme.typography.body.fontSize);
    expect(textComponent.props.style.fontFamily).toBe(mockTheme.typography.body.fontFamily);
    expect(textComponent.props.style.lineHeight).toBe(mockTheme.typography.body.lineHeight);
  });

  it('renders React nodes as children', () => {
    const childNode = <TextBody>Nested text</TextBody>;
    render(<TextBody>{childNode}</TextBody>);

    // Check if the nested text is rendered
    expect(screen.getByText('Nested text')).toBeOnTheScreen();
  });
});
