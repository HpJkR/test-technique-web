import React, { useEffect, useState } from 'react';
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import CheckpointCard from './CheckpointCard';
import CheckpointDialog from './CheckpointDialog';
import { Checkpoint } from '@/firebase/type';

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
        className="p-2 md:p-4 bg-background"
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
      >
        Points de contrôles
      </Typography>
      <Divider />
      <div className="flex-grow overflow-y-auto p-0 pt-4 md:p-4">
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
