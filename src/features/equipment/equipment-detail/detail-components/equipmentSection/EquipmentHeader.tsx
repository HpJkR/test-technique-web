import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EquipmentHeader: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-4 gap-2">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        onClick={() => navigate('/')}
        className="mr-4"
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
    </div>
  );
};

export default EquipmentHeader;
