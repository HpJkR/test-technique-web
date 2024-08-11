import React from 'react';
import { Button, Typography } from '@mui/material';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageRange?: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageRange = 5,
}) => {
  const getPageButtons = () => {
    const start = Math.max(currentPage - pageRange, 1);
    const end = Math.min(currentPage + pageRange, totalPages);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <div
      className="pagination-controls"
      style={{ marginTop: '16px', textAlign: 'center' }}
    >
      <Button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Précédent
      </Button>
      {currentPage > pageRange + 1 && (
        <Button onClick={() => onPageChange(1)}>1</Button>
      )}
      {currentPage > pageRange + 2 && <Typography>...</Typography>}
      {getPageButtons().map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          style={{ margin: '0 4px' }}
          variant={currentPage === page ? 'contained' : 'outlined'}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages - pageRange && <Typography>...</Typography>}
      {currentPage < totalPages - pageRange - 1 && (
        <Button onClick={() => onPageChange(totalPages)}>{totalPages}</Button>
      )}
      <Button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Suivant
      </Button>
    </div>
  );
};

export default PaginationControls;
