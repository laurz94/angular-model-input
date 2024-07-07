import { signal } from '@angular/core';
import { getDefaultMyForm, MyForm } from '../models/form';
import { getInitialStateProperty, StateProperty } from '@my/domain';

export const formFeatureKey = 'form';

export interface FormState {
  formA: StateProperty<MyForm>;
}

export const initialFormState = {
  formA: getInitialStateProperty<MyForm>(getDefaultMyForm({ textbox: signal('hi!') })),
};
