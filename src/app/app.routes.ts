import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/public/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'plantas/biogas',
        loadComponent: () => import('./features/public/public-page/public-page.component').then(m => m.PublicPageComponent),
        data: { pageKey: 'biogas' }
      },
      {
        path: 'plantas/biomethane',
        loadComponent: () => import('./features/public/public-page/public-page.component').then(m => m.PublicPageComponent),
        data: { pageKey: 'biomethane' }
      },
      {
        path: 'plantas/mini',
        loadComponent: () => import('./features/public/public-page/public-page.component').then(m => m.PublicPageComponent),
        data: { pageKey: 'mini' }
      },
      {
        path: 'ciad',
        loadComponent: () => import('./features/public/public-page/public-page.component').then(m => m.PublicPageComponent),
        data: { pageKey: 'ciad' }
      },
      {
        path: 'noticias',
        loadComponent: () => import('./features/public/public-page/public-page.component').then(m => m.PublicPageComponent),
        data: { pageKey: 'news' }
      },
      {
        path: 'videos',
        loadComponent: () => import('./features/public/public-page/public-page.component').then(m => m.PublicPageComponent),
        data: { pageKey: 'videos' }
      },
      {
        path: 'contacto',
        loadComponent: () => import('./features/public/public-page/public-page.component').then(m => m.PublicPageComponent),
        data: { pageKey: 'contact' }
      }
    ]
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'plants', loadComponent: () => import('./features/plants/plant-list/plant-list.component').then(m => m.PlantListComponent) },
      { path: 'plants/:id', loadComponent: () => import('./features/plants/plant-detail/plant-detail.component').then(m => m.PlantDetailComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
