import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EquipmentHeader: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 mt-4 md:mb-4">
      <div className="flex items-center gap-2">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={() => navigate('/')}
          className="mr-4"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
        >
          {title}
        </Typography>
      </div>
      <Divider />
    </div>
  );
};

export default EquipmentHeader;
