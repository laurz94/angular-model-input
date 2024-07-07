import { createSelector } from '@ngrx/store';

import { AppState } from '../../app.config';

import { formFeatureKey, FormState } from './form-state';

export const selectFormState = (state: AppState) => state[formFeatureKey];

export const selectFormA = createSelector(
  selectFormState,
  (state: FormState) => state.formA
);
