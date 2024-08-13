import React, { useEffect, useMemo, useState } from 'react';
import {
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CheckpointCard from './CheckpointCard';
import CheckpointDialog from './CheckpointDialog';
import PaginationControls from '../../../../../components/ui/PaginationControls';
import { Checkpoint } from '@/firebase/type';
import ChecklistTwoToneIcon from '@mui/icons-material/ChecklistTwoTone';

const CheckpointList: React.FC<{ checkpoints: Checkpoint[] }> = ({
  checkpoints,
}) => {
  const [selectedCheckpoint, setSelectedCheckpoint] =
    useState<Checkpoint | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showOnlyWithDefects, setShowOnlyWithDefects] =
    useState<boolean>(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const ITEMS_PER_PAGE = isSmallScreen ? 4 : 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [showOnlyWithDefects]);

  const handleCardClick = (checkpoint: Checkpoint) => {
    setSelectedCheckpoint(checkpoint);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCheckpoint(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCheckpoints = useMemo(() => {
    return showOnlyWithDefects
      ? checkpoints.filter((checkpoint) => checkpoint.fault)
      : checkpoints;
  }, [checkpoints, showOnlyWithDefects]);

  const paginatedCheckpoints = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCheckpoints.slice(startIndex, endIndex);
  }, [filteredCheckpoints, currentPage, ITEMS_PER_PAGE]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex flex-col gap-1 items-start">
        <div className="flex items-center gap-2">
          <ChecklistTwoToneIcon width={36} />
          <Typography variant="h5" component="h2" fontWeight="bold">
            {showOnlyWithDefects
              ? filteredCheckpoints.length
              : checkpoints.length}
          </Typography>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Points de contrôles
          </Typography>
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={showOnlyWithDefects}
              onChange={(e) => setShowOnlyWithDefects(e.target.checked)}
              color="primary"
            />
          }
          label={
            isSmallScreen
              ? 'Afficher uniquement les défauts'
              : 'Afficher uniquement les points de contrôles avec des défauts'
          }
          className="mb-4"
        />
      </div>
      <Divider />
      <div className="overflow-y-auto p-0 pt-4 md:p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <CircularProgress />
          </div>
        ) : paginatedCheckpoints.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            Aucun point de contrôle
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {paginatedCheckpoints.map((checkpoint, index) => (
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
      {!loading && filteredCheckpoints.length > ITEMS_PER_PAGE && (
        <PaginationControls
          items={filteredCheckpoints}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
      <CheckpointDialog
        open={dialogOpen}
        checkpoint={selectedCheckpoint}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default CheckpointList;
