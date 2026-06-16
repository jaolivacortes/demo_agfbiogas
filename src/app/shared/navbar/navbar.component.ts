import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isPlantsOpen = false;
  isProfileOpen = false;
  isScrolled = false;
  currentLang = 'es';
  languages = [
    { code: 'es', label: 'ES', flag: '🇪🇸' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'pt', label: 'PT', flag: '🇵🇹' }
  ];

  constructor(
    public auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate.use('es');
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  switchLang(code: string) {
    this.currentLang = code;
    this.translate.use(code);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
