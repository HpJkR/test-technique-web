import React, { useCallback, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import EquipmentMedia from './equipment-card-component/EquipmentMedia';
import FaultsBadge from '../../../../../components/ui/FaultsBadge';
import InformationPanel from './equipment-card-component/InformationPanel';
import CharacteristicsPanel from './equipment-card-component/CharacteristicsPanel';
import { Equipment } from '@/firebase/type';

interface EquipmentCardProps {
  equipment: Equipment;
  onImageClick: (photo: string) => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  onImageClick,
}) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const getValueOrUnknown = (value: string | undefined) => value || 'Inconnu';

  const handleAccordionChange = useCallback(
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          className="relative m-4 md:m-0 flex justify-center items-center"
        >
          <EquipmentMedia
            equipment={equipment}
            onClick={() => onImageClick(equipment.photo)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent className="flex flex-col gap-4 p-0">
            <Typography
              variant="h5"
              component="div"
              className="mb-2"
              fontWeight="bold"
            >
              {getValueOrUnknown(equipment.name)}
            </Typography>
            <FaultsBadge nbFaults={equipment.nbFaults} />
            <div>
              <InformationPanel
                equipment={equipment}
                expanded={expanded === 'panel1'}
                onChange={handleAccordionChange('panel1')}
              />
              <CharacteristicsPanel
                equipment={equipment}
                expanded={expanded === 'panel2'}
                onChange={handleAccordionChange('panel2')}
              />
            </div>
            <Typography variant="body2" fontSize={'1rem'}>
              <strong>Dernier statut constaté :</strong>{' '}
              {getValueOrUnknown(equipment.status)}
            </Typography>
            <Typography variant="body2" fontSize={'1rem'}>
              <strong>Commentaire :</strong> {equipment.notes || 'Aucun'}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EquipmentCard;
