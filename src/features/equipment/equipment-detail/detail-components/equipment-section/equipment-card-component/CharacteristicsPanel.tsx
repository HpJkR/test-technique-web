import React from 'react';
import AccordionPanel from '../../../../../../components/ui/AccordionPanel';
import { Divider, Typography } from '@mui/material';
import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';
import FingerprintTwoToneIcon from '@mui/icons-material/FingerprintTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import PinTwoToneIcon from '@mui/icons-material/PinTwoTone';
import { Equipment } from '@/firebase/type';

interface CharacteristicsPanelProps {
  equipment: Equipment;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const getValueOrUnknown = (value: string | undefined) => value || 'Inconnu';

const CharacteristicsPanel: React.FC<CharacteristicsPanelProps> = ({
  equipment,
  expanded,
  onChange,
}) => (
  <AccordionPanel
    expanded={expanded}
    onChange={onChange}
    title="Caractéristiques"
  >
    <Typography>
      <FactoryTwoToneIcon className="mr-2" />
      <strong>Marque :</strong> {getValueOrUnknown(equipment.brand)}
    </Typography>
    <Divider />
    <Typography>
      <LibraryBooksTwoToneIcon className="mr-2" />
      <strong>Modèle :</strong> {getValueOrUnknown(equipment.model)}
    </Typography>
    <Divider />
    <Typography>
      <FingerprintTwoToneIcon className="mr-2" />
      <strong>Numéro de série :</strong>
      {getValueOrUnknown(equipment.serialNumber)}
    </Typography>
    <Divider />
    <Typography>
      <PinTwoToneIcon className="mr-2" />
      <strong>Quantité :</strong> {equipment.quantity}
    </Typography>
  </AccordionPanel>
);

export default CharacteristicsPanel;
