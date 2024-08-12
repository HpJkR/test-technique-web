import React from 'react';
import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getPageButtons = () => {
    const start = Math.max(currentPage - pageRange, 1);
    const end = Math.min(currentPage + pageRange, totalPages);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <div
      className="pagination-controls"
      style={{
        marginTop: '16px',
        textAlign: 'center',
        fontSize: isSmallScreen ? '0.75rem' : '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isSmallScreen ? '4px' : '8px',
      }}
    >
      <Button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        style={{
          minWidth: isSmallScreen ? '32px' : 'auto',
          padding: isSmallScreen ? '6px' : '8px 16px',
        }}
      >
        {isSmallScreen ? <ArrowBack fontSize="small" /> : 'Précédent'}
      </Button>
      {currentPage > pageRange + 1 && (
        <Button
          onClick={() => onPageChange(1)}
          style={{
            minWidth: isSmallScreen ? '32px' : 'auto',
            padding: isSmallScreen ? '6px' : '8px 16px',
          }}
        >
          1
        </Button>
      )}
      {currentPage > pageRange + 2 && <Typography>...</Typography>}
      {getPageButtons().map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            margin: isSmallScreen ? '0 2px' : '0 4px',
            minWidth: isSmallScreen ? '32px' : 'auto',
            padding: isSmallScreen ? '6px' : '8px 16px',
          }}
          variant={currentPage === page ? 'contained' : 'outlined'}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages - pageRange && <Typography>...</Typography>}
      {currentPage < totalPages - pageRange - 1 && (
        <Button
          onClick={() => onPageChange(totalPages)}
          style={{
            minWidth: isSmallScreen ? '32px' : 'auto',
            padding: isSmallScreen ? '6px' : '8px 16px',
          }}
        >
          {totalPages}
        </Button>
      )}
      <Button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        style={{
          minWidth: isSmallScreen ? '32px' : 'auto',
          padding: isSmallScreen ? '6px' : '8px 16px',
        }}
      >
        {isSmallScreen ? <ArrowForward fontSize="small" /> : 'Suivant'}
      </Button>
    </div>
  );
};

export default PaginationControls;
