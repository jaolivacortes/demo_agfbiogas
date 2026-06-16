import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  today = new Date();
  user: any = null;

  stats = [
    { label: 'Plantas activas', value: '4', icon: '🏭', color: '#00C896' },
    { label: 'Producción total', value: '1.240 m³/día', icon: '⚡', color: '#4A9EFF' },
    { label: 'Energía generada', value: '3.850 kWh', icon: '🔋', color: '#F5A623' },
    { label: 'Eficiencia media', value: '87%', icon: '📈', color: '#00C896' }
  ];

  constructor(private auth: AuthService) {
    this.user = this.auth.getUser();
  }
}
