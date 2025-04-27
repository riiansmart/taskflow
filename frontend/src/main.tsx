// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import './cyberpunk.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import { ThemeProvider as CustomThemeProvider, useTheme } from './context/ThemeContext';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';

// Find the root element
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Create a root
const root = createRoot(rootElement);

// Create a component to provide both custom and MUI themes
function MainApp() {
  const { isLightMode } = useTheme();
  const muiTheme = useMemo(
    () => createTheme({ palette: { mode: isLightMode ? 'light' : 'dark' } }),
    [isLightMode]
  );
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

// Render app with both custom and MUI theme providers
root.render(
  <StrictMode>
    <CustomThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </CustomThemeProvider>
  </StrictMode>
);