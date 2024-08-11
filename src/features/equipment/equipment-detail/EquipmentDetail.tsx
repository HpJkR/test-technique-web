import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EquipmentHeader from './detail-components/EquipmentHeader';
import EquipmentCard from './detail-components/EquipmentCard';
import CheckpointList from './detail-components/CheckpointList';
import ImageDialog from './detail-components/ImageDialog';
import {
  fetchCheckpointsByEquipment,
  fetchEquipments,
} from '../../../firebase/service';
import { Box, CircularProgress, Typography } from '@mui/material';

interface Equipment {
  id: string;
  name: string;
  domain: string;
  photo: string;
  building: string;
  niveau: string;
  local: string;
  brand: string;
  model: string;
  serialNumber: string;
  quantity: number;
  status: string;
  notes: string;
  nbFaults: number;
}

export interface Checkpoint {
  equipmentKey: string;
  name: string;
  fault?: string;
  recommandation?: string;
  photo?: string;
}

const EquipmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadEquipmentAndCheckpoints = async () => {
      if (id) {
        const equipments = await fetchEquipments();
        const selectedEquipment = equipments.find((e) => e.id === id);
        if (selectedEquipment) {
          setEquipment(selectedEquipment);
          const cp = await fetchCheckpointsByEquipment(id);
          setCheckpoints(cp);
        } else {
          console.error(`No equipment found with id: ${id}`);
        }
      }
    };
    loadEquipmentAndCheckpoints();
  }, [id]);

  const handleImageClick = (photoUrl: string) => {
    setSelectedImage(photoUrl);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  if (!equipment) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" marginTop={2}>
          Chargement...
        </Typography>
      </Box>
    );
  }

  return (
    <div className="h-screen flex flex-col p-8">
      <EquipmentHeader title={equipment.name} />
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        <div className="w-full h-fit flex justify-center md:w-1/2 p-4 mt-4">
          <EquipmentCard
            photo={equipment.photo}
            name={equipment.name}
            domain={equipment.domain}
            building={equipment.building}
            local={equipment.local}
            niveau={equipment.niveau}
            brand={equipment.brand}
            model={equipment.model}
            serialNumber={equipment.serialNumber}
            status={equipment.status}
            notes={equipment.notes}
            quantity={equipment.quantity.toString()}
            nbFaults={equipment.nbFaults}
            onImageClick={handleImageClick}
          />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <CheckpointList checkpoints={checkpoints} />
        </div>
      </div>
      <ImageDialog
        open={open}
        image={selectedImage}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default EquipmentDetail;
