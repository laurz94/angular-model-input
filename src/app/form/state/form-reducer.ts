import { setStatePropertyErrored, setStatePropertyLoaded, setStatePropertyLoading } from '@my/domain';
import { createReducer, on } from '@ngrx/store';

import { MyForm } from '../models/form';

import { FormActions } from './form-actions';
import { initialFormState } from './form-state';

export const formReducer = createReducer(
  initialFormState,
  on(FormActions.loadForm, (state) => ({
    ...state,
    formA: setStatePropertyLoading<MyForm>(),
  })),
  on(FormActions.loadFormSuccess, (state, { form }) => ({
    ...state,
    formA: setStatePropertyLoaded(form),
  })),
  on(FormActions.loadFormFailure, (state, { error }) => ({
    ...state,
    formA: setStatePropertyErrored<MyForm>(error),
  })),

  on(FormActions.updateState, (state, { form }) => ({
    ...state,
    formA: { ...state.formA, value: { ...form } },
  }))
);
