import { database } from '../firebase';
import { Checkpoint, Equipment } from '../type';

interface FirebaseData<T> {
  [key: string]: T;
}

export const fetchEquipments = async (): Promise<Equipment[]> => {
  try {
    const snapshot = await database.ref('Equipments').once('value');
    const data: FirebaseData<Partial<Equipment>> = snapshot.val();

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
  equipmentKey: string
): Promise<Checkpoint[]> => {
  try {
    const snapshot = await database.ref('Checkpoints').once('value');
    const data: FirebaseData<Partial<Checkpoint>> = snapshot.val();
    console.log('Fetched checkpoints data:', data);

    if (data && typeof data === 'object') {
      return Object.values(data).filter(
        (checkpoint): checkpoint is Checkpoint => {
          return (
            typeof checkpoint === 'object' &&
            checkpoint !== null &&
            checkpoint.equipmentKey === equipmentKey
          );
        }
      );
    }

    return [];
  } catch (error) {
    console.error('Error fetching checkpoints:', error);
    return [];
  }
};
