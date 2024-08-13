import React from 'react';
import { Typography } from '@mui/material';

interface FaultsBadgeProps {
  nbFaults: number;
}

const FaultsBadge: React.FC<FaultsBadgeProps> = ({ nbFaults }) => {
  const badgeBgClass = nbFaults === 0 ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`${badgeBgClass} w-fit p-2 rounded-md mt-2`}>
      <Typography variant="body2" color="white" fontWeight="bold">
        Défauts: {nbFaults}
      </Typography>
    </div>
  );
};

export default FaultsBadge;
