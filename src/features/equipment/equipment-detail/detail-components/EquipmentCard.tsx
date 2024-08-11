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
import AccordionPanel from '../../../../components/AccordionPanel';

interface EquipmentCardProps {
  photo: string;
  name: string;
  domain: string;
  building: string;
  local: string;
  niveau: string;
  brand: string;
  model: string;
  serialNumber: string;
  status: string;
  notes: string;
  quantity: string;
  nbFaults: number;
  onImageClick: (photoUrl: string) => void;
}

const getValueOrUnknown = (value: string | undefined) =>
  value ? value : 'Inconnu';

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  photo,
  name,
  domain,
  building,
  local,
  niveau,
  brand,
  model,
  serialNumber,
  status,
  notes,
  quantity,
  nbFaults,
  onImageClick,
}) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const badgeBgClass = nbFaults === 0 ? 'bg-green-500' : 'bg-red-500';

  return (
    <Card>
      <Grid container>
        <Grid
          item
          xs={6}
          style={{ position: 'relative', display: 'flex', padding: '16px' }}
        >
          <CardActionArea onClick={() => onImageClick(photo)}>
            <CardMedia
              component="img"
              height="300"
              image={photo}
              alt={name}
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
              {getValueOrUnknown(name)}
            </Typography>
            <div className={`${badgeBgClass} w-fit p-2 rounded-md mt-2`}>
              <Typography variant="body2" color="white" fontWeight="bold">
                Défauts: {nbFaults}
              </Typography>
            </div>
            <div>
              <AccordionPanel
                expanded={expanded === 'panel1'}
                onChange={handleAccordionChange('panel1')}
                title="Informations"
              >
                <Typography>
                  <strong>Domaine :</strong> {getValueOrUnknown(domain)}
                </Typography>
                <Typography>
                  <strong>Batiment :</strong> {getValueOrUnknown(building)}
                </Typography>
                <Typography>
                  <strong>Niveau :</strong> {getValueOrUnknown(niveau)}
                </Typography>
                <Typography>
                  <strong>Local :</strong> {getValueOrUnknown(local)}
                </Typography>
              </AccordionPanel>
              <AccordionPanel
                expanded={expanded === 'panel2'}
                onChange={handleAccordionChange('panel2')}
                title="Caractéristiques"
              >
                <Typography>
                  <strong>Marque :</strong> {getValueOrUnknown(brand)}
                </Typography>
                <Typography>
                  <strong>Modèle :</strong> {getValueOrUnknown(model)}
                </Typography>
                <Typography>
                  <strong>Numéro de série :</strong>{' '}
                  {getValueOrUnknown(serialNumber)}
                </Typography>
                <Typography>
                  <strong>Quantité :</strong> {getValueOrUnknown(quantity)}
                </Typography>
              </AccordionPanel>
            </div>
            <Typography variant="body2" fontSize={'1rem'}>
              <strong>Dernier statut constaté :</strong>{' '}
              {getValueOrUnknown(status)}
            </Typography>
            <Typography variant="body2" fontSize={'1rem'}>
              <strong>Commentaire :</strong> {notes ? notes : 'Aucun'}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EquipmentCard;
