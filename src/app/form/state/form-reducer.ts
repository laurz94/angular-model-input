import { createReducer, on } from '@ngrx/store';
import { initialFormState } from './form-state';
import { FormActions } from './form-actions';
import { setStatePropertyErrored, setStatePropertyLoaded, setStatePropertyLoading } from '@my/domain';
import { MyForm } from '../models/form';

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
);
