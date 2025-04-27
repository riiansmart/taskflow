import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextValue {
  isLightMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ isLightMode: false, toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    return localStorage.getItem('taskflow-cyberpunk-theme') === 'light';
  });

  useEffect(() => {
    if (isLightMode) document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
    localStorage.setItem('taskflow-cyberpunk-theme', isLightMode ? 'light' : 'dark');
  }, [isLightMode]);

  const toggleTheme = () => setIsLightMode(prev => !prev);

  return <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}