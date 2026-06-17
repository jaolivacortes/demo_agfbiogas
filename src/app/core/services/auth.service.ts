import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly FAKE_EMAIL = 'demo@empresa.com';
  private readonly FAKE_PASS = 'demo1234';

  private currentUser: User | null = null;

  login(email: string, password: string): boolean {
    if (email === this.FAKE_EMAIL && password === this.FAKE_PASS) {
      this.currentUser = {
        email,
        name: 'José Oliva',
        company: 'AGF Biogás'
      };
      localStorage.setItem('biogas_auth', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('biogas_auth');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('biogas_auth');
  }

  getUser(): User | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('biogas_auth');
      if (stored) this.currentUser = JSON.parse(stored);
    }
    return this.currentUser;
  }
}
