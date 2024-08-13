import React from 'react';
import OfflineBoltTwoToneIcon from '@mui/icons-material/OfflineBoltTwoTone';
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import TimelapseTwoToneIcon from '@mui/icons-material/TimelapseTwoTone';
import AirTwoToneIcon from '@mui/icons-material/AirTwoTone';
import HomeWorkTwoToneIcon from '@mui/icons-material/HomeWorkTwoTone';

interface DomainIconProps {
  domain: string;
}

const DomainIcon: React.FC<DomainIconProps> = ({ domain }) => {
  const firstWord = domain.split(' ')[0].toUpperCase();

  switch (firstWord) {
    case 'ELECTRICITE':
      return <OfflineBoltTwoToneIcon />;
    case 'PLOMBERIE':
      return <WaterDropTwoToneIcon />;
    case 'INCENDIE':
      return <LocalFireDepartmentTwoToneIcon />;
    case 'COMPTAGE':
      return <TimelapseTwoToneIcon />;
    case 'CVC':
      return <AirTwoToneIcon />;
    case 'BATIMENT':
      return <HomeWorkTwoToneIcon />;
    default:
      return null;
  }
};

export default DomainIcon;
