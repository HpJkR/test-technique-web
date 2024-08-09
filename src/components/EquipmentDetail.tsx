import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { fetchCheckpointsByEquipment, fetchEquipments } from '../firebaseService';

interface Equipment {
  id: string;
  name: string;
  domain: string;
  photo: string;
  building: string;
  niveau: string;
  local: string;
  brand: string;
  model: string;
  serialNumber: string;
  quantity: number;
  status: string;
  notes: string;
  nbFaults: number;
}

interface Checkpoint {
  equipmentKey: string;
  name: string;
  fault?: string;
  recommendation?: string;
}

const EquipmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

  useEffect(() => {
    const loadEquipmentAndCheckpoints = async () => {
      if (id) {
        const equipments = await fetchEquipments();
        const selectedEquipment = equipments.find((e) => e.id === id);
        if (selectedEquipment) {
          setEquipment(selectedEquipment);
          const cp = await fetchCheckpointsByEquipment(id);
          setCheckpoints(cp);
        } else {
          console.error(`No equipment found with id: ${id}`);
        }
      }
    };
    loadEquipmentAndCheckpoints();
  }, [id]);

  if (!equipment) return <div>Loading...</div>;

  return (
    <Container className="py-8">
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={equipment.photo}
          alt={equipment.name}
        />
        <CardContent>
          <Typography variant="h4" component="div" className="mb-4">
            {equipment.name}
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h5" component="div" className="mt-8 mb-4">
        Checkpoints
      </Typography>
      <Grid container spacing={2}>
        {checkpoints.map((checkpoint, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="p-4">
              <CardContent>
                <Typography variant="h6" component="div">
                  {checkpoint.name}
                </Typography>
                {checkpoint.fault && (
                  <Typography variant="body2" color="textSecondary">
                    Fault: {checkpoint.fault}
                  </Typography>
                )}
                {checkpoint.recommendation && (
                  <Typography variant="body2" color="textSecondary">
                    Recommendation: {checkpoint.recommendation}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EquipmentDetail;
