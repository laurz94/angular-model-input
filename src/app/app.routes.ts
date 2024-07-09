import { Route } from '@angular/router';

import { FormComponent } from './form/form.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: FormComponent,
    title: 'Angular Model Input Example',
  },
];
