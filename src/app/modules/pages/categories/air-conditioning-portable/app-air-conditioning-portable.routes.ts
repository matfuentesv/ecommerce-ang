import {Routes} from "@angular/router";


export const appAirConditioningPortableRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./air-conditioning-portable.component').then(c => c.AirConditioningPortableComponent),

  }
]
