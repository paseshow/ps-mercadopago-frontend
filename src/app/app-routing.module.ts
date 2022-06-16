import { Routes } from '@angular/router';
import { AuthComponent } from './authentication/auth/auth.component';

export const AppRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./authentication/auth/auth.module').then(m => m.AuthenticationModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./sections/sections.module').then(m => m.SectionsModule)
      },
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/auth/auth.module').then(m => m.AuthenticationModule)
      }
    ]
  }
];

