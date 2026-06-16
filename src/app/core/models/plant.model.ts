export interface BiogasPlant {
  id: number;
  name: string;
  location: string;
  status: 'online' | 'maintenance' | 'offline';
  productionM3: number;
  energyKwh: number;
  efficiency: number;
  lastUpdate: string;
}
