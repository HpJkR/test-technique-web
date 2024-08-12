import React, { useEffect, useMemo, useState } from 'react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import EquipmentCard from './list-component/EquipmentCard';
import SearchBar from '../../../components/ui/SearchBar';
import PaginationControls from '../../../components/ui/PaginationControls';
import { useEquipmentStore } from '../store/useEquipmentStore';

const ITEMS_PER_PAGE = 12;

const EquipmentList: React.FC = () => {
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
    return equipments
      .filter((equipment) =>
        [
          equipment.name,
          equipment.building,
          equipment.domain,
          equipment.niveau,
          equipment.local,
          equipment.brand,
          equipment.model,
          equipment.serialNumber,
        ].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [equipments, searchTerm]);

  const paginatedEquipments = useMemo(() => {
    return filteredEquipments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredEquipments, currentPage]);

  const totalPages = Math.ceil(filteredEquipments.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage((prevPage) => (page !== prevPage ? page : prevPage));
  };

  return (
    <Container
      className="py-8"
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
        label="Rechercher par nom, bâtiment, domaine, niveau, local, marque, modèle ou numéro de série"
      />
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : filteredEquipments.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Aucun équipements trouvé
          </Typography>
        ) : (
          <Grid container spacing={3} py={2} px={8}>
            {paginatedEquipments.map((equipment) => (
              <Grid item xs={12} sm={6} md={4} key={equipment.id}>
                <EquipmentCard equipment={equipment} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      {filteredEquipments.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default EquipmentList;
