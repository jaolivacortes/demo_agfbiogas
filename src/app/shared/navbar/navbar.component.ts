import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

interface LangOption {
  code: string;
  label: string;
  flagSvg: SafeHtml;
}

const FLAG_ES = `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#c60b1e"/><rect y="4" width="24" height="8" fill="#ffc400"/></svg>`;
const FLAG_GB = `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#012169"/><path d="M0 0l24 16M24 0L0 16" stroke="#fff" stroke-width="2.5"/><path d="M0 0l24 16M24 0L0 16" stroke="#c8102e" stroke-width="1.2"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="4"/><path d="M12 0v16M0 8h24" stroke="#c8102e" stroke-width="2"/></svg>`;
const FLAG_PT = `<svg viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#ff0000"/><rect width="9.6" height="16" fill="#006600"/></svg>`;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isPlantsOpen = false;
  isProfileOpen = false;
  isScrolled = false;
  isMobileMenuOpen = false;
  currentLang = 'es';
  languages: LangOption[] = [];

  constructor(
    public auth: AuthService,
    private router: Router,
    private translate: TranslateService,
    sanitizer: DomSanitizer
  ) {
    this.translate.use('es');
    this.languages = [
      { code: 'es', label: 'Español', flagSvg: sanitizer.bypassSecurityTrustHtml(FLAG_ES) },
      { code: 'en', label: 'English', flagSvg: sanitizer.bypassSecurityTrustHtml(FLAG_GB) },
      { code: 'pt', label: 'Português', flagSvg: sanitizer.bypassSecurityTrustHtml(FLAG_PT) }
    ];
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 1024 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isPlantsOpen = false;
    document.body.style.overflow = '';
  }

  onPlantsEnter() {
    if (window.innerWidth > 1024) {
      this.isPlantsOpen = true;
    }
  }

  onPlantsLeave() {
    if (window.innerWidth > 1024) {
      this.isPlantsOpen = false;
    }
  }

  togglePlantsMobile() {
    if (window.innerWidth <= 1024) {
      this.isPlantsOpen = !this.isPlantsOpen;
    }
  }

  switchLang(code: string) {
    this.currentLang = code;
    this.translate.use(code);

    const googleLangMap: Record<string, string | null> = {
      es: null,
      en: 'en',
      pt: 'pt-PT'
    };

    const googleCode = googleLangMap[code];
    if (googleCode) {
      this.applyGoogleTranslate(googleCode);
    } else {
      this.removeGoogleTranslate();
    }
  }

  private applyGoogleTranslate(lang: string) {
    document.cookie = `googtrans=/es/${lang};path=/`;
    document.cookie = `googtrans=/es/${lang};domain=${location.hostname};path=/`;

    const el = document.getElementById('google_translate_element');
    if (!el) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
      this.loadGoogleTranslateScript();
    } else {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
      } else {
        // El script ya está pero el widget aún no inicializó, recarga con la cookie puesta
        location.reload();
      }
    }
  }

  private removeGoogleTranslate() {
    document.cookie = 'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = `googtrans=;domain=${location.hostname};path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    location.reload();
  }

  private loadGoogleTranslateScript() {
    if (document.getElementById('gt-script')) {
      location.reload();
      return;
    }
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'es', autoDisplay: false },
        'google_translate_element'
      );
    };
    const script = document.createElement('script');
    script.id = 'gt-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  }

  logout() {
    this.auth.logout();
    this.closeMobileMenu();
    this.router.navigate(['/']);
  }
}
