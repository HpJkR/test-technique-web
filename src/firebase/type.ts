export interface Equipment {
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

export interface Checkpoint {
  equipmentKey: string;
  name: string;
  fault?: string;
  recommandation?: string;
  photo?: string;
}
