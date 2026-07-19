import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'cfp',
    loadComponent: () =>
      import('./cfp-form/cfp-form.component').then((m) => m.CfpFormComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./cfp-dashboard/cfp-dashboard.component').then((m) => m.CfpDashboardComponent),
  },
  {
    path: '',
    redirectTo: 'cfp',
    pathMatch: 'full',
  },
];
