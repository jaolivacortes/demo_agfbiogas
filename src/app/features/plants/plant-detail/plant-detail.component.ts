import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BiogasPlant } from '../../../core/models/plant.model';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plant-detail.component.html',
  styleUrl: './plant-detail.component.scss'
})
export class PlantDetailComponent {
  plant: BiogasPlant | undefined;

  private plants: BiogasPlant[] = [
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

  weeklyData = [
    { day: 'Lun', production: 310, energy: 950 },
    { day: 'Mar', production: 325, energy: 990 },
    { day: 'Mié', production: 298, energy: 910 },
    { day: 'Jue', production: 340, energy: 1040 },
    { day: 'Vie', production: 320, energy: 980 },
    { day: 'Sáb', production: 280, energy: 860 },
    { day: 'Dom', production: 260, energy: 800 }
  ];

  maxProduction = Math.max(...this.weeklyData.map(d => d.production));

  constructor(private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.plant = this.plants.find(p => p.id === id);
  }

  getStatusLabel(status: string): string {
    const labels: any = {
      online: 'Operativa',
      maintenance: 'Mantenimiento',
      offline: 'Desconectada'
    };
    return labels[status];
  }

  getBarHeight(value: number): number {
    return (value / this.maxProduction) * 100;
  }
}
