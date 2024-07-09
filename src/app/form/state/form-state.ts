import { getInitialStateProperty, StateProperty } from '@my/domain';

import { getDefaultMyForm, MyForm } from '../models/form';

export const formFeatureKey = 'form';

export interface FormState {
  formA: StateProperty<MyForm>;
}

export const initialFormState = {
  formA: getInitialStateProperty<MyForm>(getDefaultMyForm({ textbox: 'hi!' })),
};
