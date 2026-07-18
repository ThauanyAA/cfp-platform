import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'cfp',
    loadComponent: () =>
      import('./cfp-form/cfp-form.component').then((m) => m.CfpFormComponent),
  },
  {
    path: '',
    redirectTo: 'cfp',
    pathMatch: 'full',
  },
];
