import React, { useEffect, useState } from 'react';
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import CheckpointCard from './CheckpointCard';
import CheckpointDialog from './CheckpointDialog';
import { Checkpoint } from '../EquipmentDetail';

const CheckpointList: React.FC<{ checkpoints: Checkpoint[] }> = ({
  checkpoints,
}) => {
  const [selectedCheckpoint, setSelectedCheckpoint] =
    useState<Checkpoint | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (checkpoint: Checkpoint) => {
    setSelectedCheckpoint(checkpoint);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCheckpoint(null);
  };

  return (
    <div className="relative flex flex-col h-full">
      <Typography
        variant="h5"
        component="h2"
        fontWeight={'bold'}
        fontSize={'2.25rem'}
        className="sticky top-0 p-4"
      >
        Points de contrôles
      </Typography>
      <Divider />
      <div className="flex-grow overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <CircularProgress />
          </div>
        ) : checkpoints.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            Aucun point de contrôle
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {checkpoints.map((checkpoint, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <CheckpointCard
                  checkpoint={checkpoint}
                  onClick={handleCardClick}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <CheckpointDialog
        open={dialogOpen}
        checkpoint={selectedCheckpoint}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default CheckpointList;
