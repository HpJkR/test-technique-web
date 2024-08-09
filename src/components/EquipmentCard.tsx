import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Equipment {
  id: string;
  name: string;
  domain: string;
  photo: string;
  nbFaults: number;
}

interface EquipmentCardProps {
  equipment: Equipment;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/equipments/${equipment.id}`);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={equipment.photo}
        alt={equipment.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {equipment.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {equipment.domain}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Defects: {equipment.nbFaults}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
