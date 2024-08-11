import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DomainIcon from '../../../../components/DomainIcon';

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

  const badgeBgClass = equipment.nbFaults === 0 ? 'bg-green-500' : 'bg-red-500';

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 400,
        borderRadius: 2,
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        sx={{
          height: 230,
          objectFit: 'cover',
        }}
        image={equipment.photo}
        alt={equipment.name}
      />
      <CardContent
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">{equipment.name}</Typography>
        <div className="flex items-center gap-2">
          <DomainIcon domain={equipment.domain} />
          <Typography variant="body2" color="textSecondary">
            {equipment.domain}
          </Typography>
        </div>
        <div className={`${badgeBgClass} w-fit p-2 rounded-md`}>
          <Typography variant="body2" color="white" fontWeight="bold">
            Défauts: {equipment.nbFaults}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
