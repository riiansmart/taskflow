import { createContext, useContext, useLayoutEffect, useState, ReactNode } from 'react';

interface ThemeContextValue {
  isLightMode: boolean;
  toggleTheme: () => void;
  themeReady: boolean;
  accentPrimary: string;
  accentSecondary: string;
}

// default accent colors match dark mode defaults
const DEFAULT_DARK_PRIMARY = '#ff3a4c';
const DEFAULT_DARK_SECONDARY = '#ff7080';
const DEFAULT_LIGHT_PRIMARY = '#36ff74';
const DEFAULT_LIGHT_SECONDARY = '#6affb0';
const ThemeContext = createContext<ThemeContextValue>({
  isLightMode: false,
  toggleTheme: () => {},
  themeReady: false,
  accentPrimary: DEFAULT_DARK_PRIMARY,
  accentSecondary: DEFAULT_DARK_SECONDARY,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    return localStorage.getItem('taskflow-cyberpunk-theme') === 'light';
  });
  const [themeReady, setThemeReady] = useState(false);

  useLayoutEffect(() => {
    if (isLightMode) document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
    localStorage.setItem('taskflow-cyberpunk-theme', isLightMode ? 'light' : 'dark');
    setThemeReady(true);
  }, [isLightMode]);

  const toggleTheme = () => setIsLightMode(prev => !prev);

  // determine accent colors based on current theme
  const accentPrimary = isLightMode ? DEFAULT_LIGHT_PRIMARY : DEFAULT_DARK_PRIMARY;
  const accentSecondary = isLightMode ? DEFAULT_LIGHT_SECONDARY : DEFAULT_DARK_SECONDARY;

  return (
    <ThemeContext.Provider
      value={{ isLightMode, toggleTheme, themeReady, accentPrimary, accentSecondary }}
    >
      {themeReady ? children : null}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}