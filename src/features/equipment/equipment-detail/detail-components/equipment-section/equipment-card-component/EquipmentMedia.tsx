import React from 'react';
import { CardActionArea, CardMedia } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Equipment } from '@/firebase/type';

interface EquipmentMediaProps {
  equipment: Equipment;
  onClick: () => void;
}

const EquipmentMedia: React.FC<EquipmentMediaProps> = ({
  equipment,
  onClick,
}) => {
  return (
    <CardActionArea onClick={onClick} sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="300"
        image={equipment.photo}
        alt={equipment.name}
        sx={{
          cursor: 'pointer',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ZoomInIcon
          style={{
            color: 'white',
            fontSize: 50,
            opacity: 0.75,
            transition: 'opacity 0.3s',
          }}
        />
      </div>
    </CardActionArea>
  );
};

export default EquipmentMedia;
