import React from 'react';
import AccordionPanel from '../../../../../../components/ui/AccordionPanel';
import { Divider, Typography } from '@mui/material';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import { Equipment } from '@/firebase/type';

interface InformationPanelProps {
  equipment: Equipment;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const getValueOrUnknown = (value: string | undefined) => value || 'Inconnu';

const InformationPanel: React.FC<InformationPanelProps> = ({
  equipment,
  expanded,
  onChange,
}) => (
  <AccordionPanel expanded={expanded} onChange={onChange} title="Informations">
    <Typography>
      <CategoryTwoToneIcon className="mr-2" />
      <strong>Domaine :</strong> {getValueOrUnknown(equipment.domain)}
    </Typography>
    <Divider />
    <Typography>
      <BusinessTwoToneIcon className="mr-2" />
      <strong>Bâtiment :</strong> {getValueOrUnknown(equipment.building)}
    </Typography>
    <Divider />
    <Typography>
      <LayersTwoToneIcon className="mr-2" />
      <strong>Niveau :</strong> {getValueOrUnknown(equipment.niveau)}
    </Typography>
    <Divider />
    <Typography>
      <RoomTwoToneIcon className="mr-2" />
      <strong>Local :</strong> {getValueOrUnknown(equipment.local)}
    </Typography>
  </AccordionPanel>
);

export default InformationPanel;
