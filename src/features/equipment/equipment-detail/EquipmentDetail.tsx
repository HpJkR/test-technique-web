import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EquipmentHeader from './detail-components/equipmentSection/EquipmentHeader';
import EquipmentCard from './detail-components/equipmentSection/EquipmentCard';
import CheckpointList from './detail-components/checkpointSection/CheckpointList';
import ImageDialog from './detail-components/equipmentSection/ImageDialog';
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
    <div className="h-screen flex flex-col p-8">
      <EquipmentHeader title={equipment.name} />
      <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
        <div className="w-full h-fit flex justify-center md:w-1/2 p-4 mt-4">
          <EquipmentCard
            equipment={equipment}
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
