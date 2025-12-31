import { useAppTheme } from '@/providers/ThemeProvider';
import { forwardRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { IconSymbol } from '../common/IconSymbol';

interface SearchBarProps extends TextInputProps {
  placeholder?: string;
  onChange?: () => void;
  value?: string;
}
const SearchBar = forwardRef<TextInput, SearchBarProps>(({ placeholder, onChange, value, ...rest }, ref) => {
  const [text, setText] = useState('');
  const { theme } = useAppTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const handleFocus = () => setIsSearchFocused(true);
  const handleBlur = () => setIsSearchFocused(false);

  return (
    <View
      style={{
        ...styles.inputContainer,
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colors.surface,
        borderColor: isSearchFocused ? theme.colors.secondary : theme.colors.border,
        borderWidth: isSearchFocused ? 1.5 : 1,
        marginHorizontal: theme.spacing.sm,
      }}>
      {!text && (
        <IconSymbol
          name='magnifyingglass'
          color={theme.colors.textSecondary}
          size={20}
        />
      )}
      <TextInput
        testID='search-input-id'
        ref={ref}
        placeholder={placeholder ?? 'Search for events by city'}
        placeholderTextColor={theme.colors.textSecondary}
        value={value ?? text}
        onChangeText={onChange ?? setText}
        style={{
          width:'100%',
          ...theme.typography.body,
          height: 40,
          color: theme.colors.secondary,
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        returnKeyType='search'
        clearButtonMode='while-editing' // iOS-specific clear button for convenience
        autoCorrect={false} // Optional: disable auto-correct for search
        autoCapitalize='none'
        accessibilityLabel='Enter a city name for local events'
        accessibilityHint='Type the name of US city to find events in that city'
        accessibilityRole='text'
        accessibilityValue={{ text }}
      />
    </View>
  );
  // Add this for The ESLint error "Component definition is missing display name" occurs because the anonymous arrow function you passed to forwardRef doesn't automatically get a displayName property for use in React DevTools
  SearchBar.displayName = 'SearchBar';
});

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
export default SearchBar;
