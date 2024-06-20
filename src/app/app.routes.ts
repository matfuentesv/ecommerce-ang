import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/pages/pages.component').then(c => c.PagesComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: () => import('./modules/pages/home').then(r => r.homeRoutes)
      },
      {
        path: 'notebooks',
        loadChildren: () => import('./modules/pages/categories/notebooks').then(r => r.notebooksRoutes)
      },
      {
        path: 'cell-phones',
        loadChildren: () => import('./modules/pages/categories/cell-phones').then(r => r.cellPhonesRoutes)
      },
      {
        path: 'coffee-makers',
        loadChildren: () => import('./modules/pages/categories/coffee-makers').then(r => r.coffeeMakersRoutes)
      },
      {
        path: 'air-conditioning',
        loadChildren: () => import('./modules/pages/categories/air-conditioning-portable').then(r => r.appAirConditioningPortableRoutes)
      }

    ]
  }
];
