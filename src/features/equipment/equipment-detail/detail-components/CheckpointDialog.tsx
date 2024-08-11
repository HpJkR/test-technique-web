import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Checkpoint } from '../EquipmentDetail';

interface CheckpointDialogProps {
  open: boolean;
  checkpoint: Checkpoint | null;
  onClose: () => void;
}

const CheckpointDialog: React.FC<CheckpointDialogProps> = ({
  open,
  checkpoint,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" component="div" fontWeight={'bold'}>
          Détails du point de contrôle
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {checkpoint && (
          <div className="flex flex-col gap-4">
            <Typography variant="h6" component="div">
              {checkpoint.name}
            </Typography>
            {checkpoint.fault && (
              <Typography
                variant="body2"
                color="error"
                fontWeight="bold"
                fontSize={'1rem'}
              >
                Défaut : {checkpoint.fault}
              </Typography>
            )}
            {checkpoint.recommandation && (
              <div className="p-2 bg-gray-400 rounded-md">
                <Typography
                  variant="body2"
                  fontSize={'1rem'}
                  fontWeight={'bold'}
                >
                  Préconisation : {checkpoint.recommandation}
                </Typography>
              </div>
            )}
            {checkpoint.photo && (
              <img
                src={checkpoint.photo}
                alt="Checkpoint"
                className="w-full h-auto"
              />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckpointDialog;
