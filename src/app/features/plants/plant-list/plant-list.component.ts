import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BiogasPlant } from '../../../core/models/plant.model';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.scss'
})
export class PlantListComponent {
  plants: BiogasPlant[] = [
    {
      id: 1,
      name: 'Planta Sevilla Norte',
      location: 'Sevilla, Andalucía',
      status: 'online',
      productionM3: 320,
      energyKwh: 980,
      efficiency: 91,
      lastUpdate: '2025-01-15 08:32'
    },
    {
      id: 2,
      name: 'Planta Zaragoza Este',
      location: 'Zaragoza, Aragón',
      status: 'online',
      productionM3: 280,
      energyKwh: 850,
      efficiency: 88,
      lastUpdate: '2025-01-15 08:28'
    },
    {
      id: 3,
      name: 'Planta Valencia Sur',
      location: 'Valencia, C. Valenciana',
      status: 'maintenance',
      productionM3: 0,
      energyKwh: 0,
      efficiency: 0,
      lastUpdate: '2025-01-14 17:00'
    },
    {
      id: 4,
      name: 'Planta Madrid Oeste',
      location: 'Madrid, Comunidad de Madrid',
      status: 'online',
      productionM3: 640,
      energyKwh: 2020,
      efficiency: 83,
      lastUpdate: '2025-01-15 08:30'
    }
  ];

  getStatusLabel(status: string): string {
    const labels: any = {
      online: 'Operativa',
      maintenance: 'Mantenimiento',
      offline: 'Desconectada'
    };
    return labels[status];
  }
}
