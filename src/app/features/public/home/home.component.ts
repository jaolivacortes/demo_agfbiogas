import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cards = [
    { key: 'engineering', icon: '⚙️' },
    { key: 'experience', icon: '🏭' },
    { key: 'innovation', icon: '💡' },
    { key: 'sustainability', icon: '🌱' }
  ];
}
