import { create } from 'zustand';
import {
  fetchCheckpointsByEquipment,
  fetchEquipments,
} from '../../../firebase/service';
import { Checkpoint, Equipment } from '../../../firebase/type';

interface EquipmentState {
  equipments: Equipment[];
  checkpoints: Checkpoint[];
  searchTerm: string;
  loading: boolean;
  fetchEquipments: () => Promise<void>;
  fetchCheckpointsByEquipmentId: (equipmentId: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
}

export const useEquipmentStore = create<EquipmentState>((set) => ({
  equipments: [],
  checkpoints: [],
  searchTerm: '',
  loading: false,

  fetchEquipments: async () => {
    set({ loading: true });
    try {
      const data = await fetchEquipments();
      set({ equipments: data, loading: false });
    } catch (error) {
      console.error('Failed to fetch equipments', error);
      set({ loading: false });
    }
  },

  fetchCheckpointsByEquipmentId: async (equipmentId: string) => {
    set({ loading: true });
    try {
      const data = await fetchCheckpointsByEquipment(equipmentId);
      set({ checkpoints: data, loading: false });
    } catch (error) {
      console.error('Failed to fetch checkpoints', error);
      set({ loading: false });
    }
  },

  setSearchTerm: (term: string) => set({ searchTerm: term }),
}));
