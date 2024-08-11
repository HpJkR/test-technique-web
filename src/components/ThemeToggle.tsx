import React from 'react';
import { IconButton, Switch } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';

interface ThemeToggleProps {
  mode: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, onToggle }) => {
  return (
    <div className="flex items-center">
      <IconButton disabled={mode === 'dark'}>
        <WbSunnyIcon />
      </IconButton>
      <Switch
        checked={mode === 'dark'}
        onChange={onToggle}
        color="default"
        inputProps={{ 'aria-label': 'theme toggle' }}
      />
      <IconButton disabled={mode === 'light'}>
        <NightsStayIcon />
      </IconButton>
    </div>
  );
};

export default ThemeToggle;
