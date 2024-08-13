import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EquipmentHeader from './detail-components/EquipmentHeader';
import EquipmentCard from './detail-components/equipment-section/EquipmentCard';
import CheckpointList from './detail-components/checkpoint-section/CheckpointList';
import ImageDialog from './detail-components/equipment-section/ImageDialog';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEquipmentStore } from '../store/useEquipmentStore';
import { Equipment } from '@/firebase/type';

const EquipmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    equipments,
    checkpoints,
    fetchEquipments,
    fetchCheckpointsByEquipmentId,
    loading,
  } = useEquipmentStore();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (equipments.length === 0) {
      fetchEquipments();
    }
  }, [equipments.length, fetchEquipments]);

  useEffect(() => {
    const loadEquipmentAndCheckpoints = async () => {
      if (id && equipments.length > 0) {
        const selectedEquipment = equipments.find((e) => e.id === id);
        if (selectedEquipment) {
          setEquipment(selectedEquipment);
          await fetchCheckpointsByEquipmentId(id);
        } else {
          console.error(`No equipment found with id: ${id}`);
        }
      }
    };

    loadEquipmentAndCheckpoints();
  }, [id, equipments, fetchCheckpointsByEquipmentId]);

  const handleImageClick = (photoUrl: string) => {
    setSelectedImage(photoUrl);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  if (loading || !equipment) {
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
    <div className="h-screen flex flex-col p-4 pt-0 md:p-8">
      <EquipmentHeader title={equipment.name} />
      <div className="flex flex-col items-center xl:items-start xl:flex-row xl:overflow-y-auto">
        <div className="w-full flex xl:w-1/2 p-4">
          <EquipmentCard
            equipment={equipment}
            onImageClick={handleImageClick}
          />
        </div>
        <div className="w-full h-full xl:w-1/2 p-4 flex flex-col">
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
