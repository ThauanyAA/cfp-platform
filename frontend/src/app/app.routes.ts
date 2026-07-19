import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'talks/new',
    loadComponent: () =>
      import('./cfp-form/cfp-form.component').then((m) => m.CfpFormComponent),
  },
  {
    path: 'event/new',
    loadComponent: () =>
      import('./event-form/event-form.component').then((m) => m.EventFormComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./cfp-dashboard/cfp-dashboard.component').then((m) => m.CfpDashboardComponent),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
