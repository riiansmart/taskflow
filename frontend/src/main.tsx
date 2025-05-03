// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import './cyberpunk.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import { ThemeProvider as MuiThemeProvider, createTheme, PaletteOptions } from '@mui/material/styles';
import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';

// Find the root element
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Create a root
const root = createRoot(rootElement);

// Component to bridge Custom Theme context and configure MUI Theme
function ThemedApp() {
  const { isLightMode } = useTheme();

  const muiTheme = useMemo(() => {
    // Define palette based on your CSS variables
    const palette: PaletteOptions = isLightMode
      ? { // Light Mode Palette
          mode: 'light',
          primary: { main: '#36ff74' }, // --accent-primary (light)
          secondary: { main: '#6affb0' }, // --accent-secondary (light)
          background: {
            default: '#ffffff', // --bg-primary (light)
            paper: '#f6f8fb',   // --bg-secondary (light)
          },
          text: {
            primary: '#101820',   // --text-primary (light)
            secondary: '#505868', // --text-secondary (light)
          },
        }
      : { // Dark Mode Palette (Cyberpunk)
          mode: 'dark',
          primary: { main: '#ff3a4c' }, // --accent-primary (dark)
          secondary: { main: '#ff7080' }, // --accent-secondary (dark)
          background: {
            default: '#0a0a0f', // --bg-primary (dark)
            paper: '#141420',   // --bg-secondary (dark)
          },
          text: {
            primary: '#e0e0e0',   // --text-primary (dark)
            secondary: '#9b9ba7', // --text-secondary (dark)
          },
        };

    return createTheme({ palette });
  }, [isLightMode]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

// Render app: CustomThemeProvider provides the toggle, ThemedApp consumes it for MUI
root.render(
  <StrictMode>
    <CustomThemeProvider>
      <AuthProvider>
        <ThemedApp />
      </AuthProvider>
    </CustomThemeProvider>
  </StrictMode>
);