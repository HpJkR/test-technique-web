import { database } from './firebase';

interface Equipment {
  id: string;
  name: string;
  building: string;
  domain: string;
  niveau: string;
  local: string;
  photo: string;
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

export const fetchEquipments = async (): Promise<Equipment[]> => {
  try {
    const snapshot = await database.ref('Equipments').once('value');
    const data = snapshot.val();

    if (!data || typeof data !== 'object') return [];

    return Object.entries(data).map(([id, equipment]) => {
      if (typeof equipment === 'object' && equipment !== null) {
        return { id, ...(equipment as Omit<Equipment, 'id'>) };
      }
      return {
        id,
        name: '',
        building: '',
        domain: '',
        niveau: '',
        local: '',
        photo: '',
        brand: '',
        model: '',
        serialNumber: '',
        quantity: 0,
        status: '',
        notes: '',
        nbFaults: 0,
      };
    });
  } catch (error) {
    console.error('Error fetching equipments:', error);
    return [];
  }
};

export const fetchCheckpointsByEquipment = async (
  equipmentKey: string,
): Promise<Checkpoint[]> => {
  try {
    const snapshot = await database.ref('Checkpoints').once('value');
    const data = snapshot.val();
    console.log('Fetched checkpoints data:', data);

    if (data && typeof data === 'object') {
      return Object.values(data).filter((checkpoint: any) => {
        if (typeof checkpoint === 'object' && checkpoint !== null) {
          return checkpoint.equipmentKey === equipmentKey;
        }
        return false;
      }) as Checkpoint[];
    }

    return [];
  } catch (error) {
    console.error('Error fetching checkpoints:', error);
    return [];
  }
};
