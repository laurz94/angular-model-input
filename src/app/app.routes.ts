import { Route } from '@angular/router';

import { FormComponent } from './form/form.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: FormComponent,
    title: 'Angular Model Input Example',
  },
  {
    path: 'people',
    loadChildren: () => import('./account-detail/santas-list.routes').then((c) => c.appRoutes),
    title: `Santa's List`,
  },
];
