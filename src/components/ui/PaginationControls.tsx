import React from 'react';
import {
  Pagination,
  PaginationItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface PaginationControlsProps {
  // eslint-disable-next-line
  items: any[];
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  items,
  currentPage,
  onPageChange,
  itemsPerPage,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(event, page) => onPageChange(page)}
      size={isSmallScreen ? 'small' : 'medium'}
      showFirstButton
      showLastButton
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: ArrowBack, next: ArrowForward }}
          {...item}
        />
      )}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
      }}
    />
  );
};

export default PaginationControls;
