import React from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Checkpoint } from '@/firebase/type';

interface CheckpointCardProps {
  checkpoint: Checkpoint;
  onClick: (checkpoint: Checkpoint) => void;
}

const CheckpointCard: React.FC<CheckpointCardProps> = ({
  checkpoint,
  onClick,
}) => {
  return (
    <Card
      className="relative p-4 h-full cursor-pointer flex flex-col justify-between"
      onClick={() => onClick(checkpoint)}
      sx={{
        position: 'relative',
      }}
    >
      <CardContent className="flex flex-col h-full">
        <Typography
          variant="h6"
          component="div"
          className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {checkpoint.name}
        </Typography>
        <div className="flex flex-col mt-2">
          {checkpoint.fault && (
            <Typography
              variant="body2"
              color="error"
              fontWeight="bold"
              className="text-ellipsis overflow-hidden whitespace-nowrap"
            >
              Défauts: {checkpoint.fault}
            </Typography>
          )}
          {checkpoint.photo && (
            <div className="absolute bottom-4 right-4">
              <Tooltip title="Photo disponible">
                <IconButton aria-label="photo">
                  <PhotoCameraIcon color="primary" />
                </IconButton>
              </Tooltip>
            </div>
          )}
          <Typography
            variant="body2"
            color="primary"
            className="mt-2 text-sm cursor-pointer"
          >
            Cliquer pour afficher plus de détails...
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckpointCard;
