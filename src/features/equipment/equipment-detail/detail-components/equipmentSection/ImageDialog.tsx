import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

const ImageDialog: React.FC<{
  open: boolean;
  image: string | null;
  onClose: () => void;
}> = ({ open, image, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogContent>
      {image && <img src={image} alt="Enlarged" className="w-full h-auto" />}
    </DialogContent>
  </Dialog>
);

export default ImageDialog;
