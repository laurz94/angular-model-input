import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Person } from '../models/person';

export const SantaListActions = createActionGroup({
  source: 'Santa List',
  events: {
    'Load List': emptyProps(),
    'Load List Success': props<{ list: Person[] }>(),
    'Load List Failure': props<{ error: Error }>(),
  },
});
