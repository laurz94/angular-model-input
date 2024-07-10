import { Route } from '@angular/router';

import { PersonDetailComponent } from './person-detail.component';
import { SantasListComponent } from './santas-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: SantasListComponent,
    title: `Santa's List`,
  },
  {
    path: ':id',
    component: PersonDetailComponent,
    title: `Person Detail`,
  },
];
