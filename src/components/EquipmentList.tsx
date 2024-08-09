import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField } from '@mui/material';
import { fetchEquipments } from '../firebaseService';
import EquipmentCard from './EquipmentCard';

interface Equipment {
  id: string;
  name: string;
  domain: string;
  photo: string;
  nbFaults: number;
}

const EquipmentList: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const loadEquipments = async () => {
      const data = await fetchEquipments();
      setEquipments(data);
    };
    loadEquipments();
  }, []);

  const filteredEquipments = equipments
    .filter(
      (equipment) =>
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.domain.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Container className="py-8">
      <TextField
        label="Search by name or domain"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />
      <Grid container spacing={3}>
        {filteredEquipments.map((equipment) => (
          <Grid item xs={12} sm={6} md={4} key={equipment.id}>
            <EquipmentCard equipment={equipment} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EquipmentList;
