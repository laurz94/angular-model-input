import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { MyForm } from '../models/form';

export const FormActions = createActionGroup({
  source: 'Form',
  events: {
    'Load Form': emptyProps(),
    'Load Form Success': props<{ form: MyForm }>(),
    'Load Form Failure': props<{ error: Error }>(),

    'Update State': props<{ form: MyForm }>(),
  },
});
