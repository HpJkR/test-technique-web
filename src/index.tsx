import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline, ThemeProvider } from '@mui/material';
import getTheme from './theme';
import * as serviceWorker from './serviceWorker';
import ThemeToggle from './components/ui/ThemeToggle';

const RootApp: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const handleThemeChange = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <div className="fixed top-2 right-10">
        <ThemeToggle mode={mode} onToggle={handleThemeChange} />
      </div>
      <App />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

serviceWorker.unregister();
