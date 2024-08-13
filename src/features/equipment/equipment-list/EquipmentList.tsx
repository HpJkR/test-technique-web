import React, { useEffect, useMemo, useState } from 'react';
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EquipmentCard from './list-component/EquipmentCard';
import SearchBar from '../../../components/ui/SearchBar';
import PaginationControls from '../../../components/ui/PaginationControls';
import { useEquipmentStore } from '../store/useEquipmentStore';

const EquipmentList: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const ITEMS_PER_PAGE = isSmallScreen ? 6 : 12;

  const { equipments, searchTerm, loading, fetchEquipments, setSearchTerm } =
    useEquipmentStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchEquipments();
  }, [fetchEquipments]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredEquipments = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();

    return equipments
      .filter((equipment) =>
        Object.values({
          name: equipment.name,
          building: equipment.building,
          domain: equipment.domain,
          niveau: equipment.niveau,
          local: equipment.local,
          brand: equipment.brand,
          model: equipment.model,
          serialNumber: equipment.serialNumber,
        }).some((field) => field?.toLowerCase().includes(lowerSearchTerm))
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [equipments, searchTerm]);

  return (
    <Container
      className="py-0 md:py-8 mb-4 md:mb-0"
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        label={
          isSmallScreen
            ? 'Rechercher par nom, domaine...'
            : 'Rechercher par nom, bâtiment, domaine, niveau, local, marque, modèle ou numéro de série'
        }
      />
      <div className="flex flex-1 overflow-y-auto justify-center">
        {loading ? (
          <CircularProgress />
        ) : filteredEquipments.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Aucun équipement trouvé
          </Typography>
        ) : (
          <Grid container spacing={3} py={2} className="md:px-8">
            {filteredEquipments
              .slice(
                (currentPage - 1) * ITEMS_PER_PAGE,
                currentPage * ITEMS_PER_PAGE
              )
              .map((equipment) => (
                <Grid item xs={12} sm={6} md={4} key={equipment.id}>
                  <EquipmentCard equipment={equipment} />
                </Grid>
              ))}
          </Grid>
        )}
      </div>
      {filteredEquipments.length > 0 && (
        <PaginationControls
          items={filteredEquipments}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </Container>
  );
};

export default EquipmentList;
