import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AccordionPanel from '../../../../../components/ui/AccordionPanel';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import DomainAddTwoToneIcon from '@mui/icons-material/DomainAddTwoTone';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import { Equipment } from '@/firebase/type';

interface EquipmentCardProps {
  equipment: Equipment;
  onImageClick: (photo: string) => void;
}

const getValueOrUnknown = (value: string | undefined) =>
  value ? value : 'Inconnu';

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  onImageClick,
}) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const badgeBgClass = equipment.nbFaults === 0 ? 'bg-green-500' : 'bg-red-500';

  return (
    <Card>
      <Grid container>
        <Grid item xs={6} className="relative p-4">
          <CardActionArea onClick={() => onImageClick(equipment.photo)}>
            <CardMedia
              component="img"
              height="300"
              image={equipment.photo}
              alt={equipment.name}
              sx={{ cursor: 'pointer' }}
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
                sx={{ fontSize: 50 }}
              />
            </div>
          </CardActionArea>
        </Grid>
        <Grid item xs={6}>
          <CardContent className="flex flex-col gap-2">
            <Typography variant="h5" component="div" className="mb-2">
              {getValueOrUnknown(equipment.name)}
            </Typography>
            <div className={`${badgeBgClass} w-fit p-2 rounded-md mt-2`}>
              <Typography variant="body2" color="white" fontWeight="bold">
                Défauts: {equipment.nbFaults}
              </Typography>
            </div>
            <div>
              <AccordionPanel
                expanded={expanded === 'panel1'}
                onChange={handleAccordionChange('panel1')}
                title="Informations"
              >
                <Typography>
                  <DomainAddTwoToneIcon className="mr-2" />
                  <strong>Domaine :</strong>{' '}
                  {getValueOrUnknown(equipment.domain)}
                </Typography>
                <Typography>
                  <BusinessTwoToneIcon className="mr-2" />
                  <strong>Bâtiment :</strong>{' '}
                  {getValueOrUnknown(equipment.building)}
                </Typography>
                <Typography>
                  <LayersTwoToneIcon className="mr-2" />
                  <strong>Niveau :</strong>{' '}
                  {getValueOrUnknown(equipment.niveau)}
                </Typography>
                <Typography>
                  <RoomTwoToneIcon className="mr-2" />
                  <strong>Local :</strong> {getValueOrUnknown(equipment.local)}
                </Typography>
              </AccordionPanel>
              <AccordionPanel
                expanded={expanded === 'panel2'}
                onChange={handleAccordionChange('panel2')}
                title="Caractéristiques"
              >
                <Typography>
                  <strong>Marque :</strong> {getValueOrUnknown(equipment.brand)}
                </Typography>
                <Typography>
                  <strong>Modèle :</strong> {getValueOrUnknown(equipment.model)}
                </Typography>
                <Typography>
                  <strong>Numéro de série :</strong>{' '}
                  {getValueOrUnknown(equipment.serialNumber)}
                </Typography>
                <Typography>
                  <strong>Quantité :</strong>{' '}
                  {getValueOrUnknown(equipment.quantity.toString())}
                </Typography>
              </AccordionPanel>
            </div>
            <Typography variant="body2" fontSize={'1rem'}>
              <strong>Dernier statut constaté :</strong>{' '}
              {getValueOrUnknown(equipment.status)}
            </Typography>
            <Typography variant="body2" fontSize={'1rem'}>
              <strong>Commentaire :</strong>{' '}
              {equipment.notes ? equipment.notes : 'Aucun'}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EquipmentCard;
