import { setStatePropertyErrored, setStatePropertyLoaded, setStatePropertyLoading } from '@my/domain';
import { createReducer, on } from '@ngrx/store';

import { Person } from '../models/person';

import { SantaListActions } from './santa-list-actions';
import { initialSantaListState } from './santa-list-state';

export const santaListReducer = createReducer(
  initialSantaListState,
  on(SantaListActions.loadList, (state) => ({
    ...state,
    list: setStatePropertyLoading<Person[]>(),
  })),
  on(SantaListActions.loadListSuccess, (state, { list }) => ({
    ...state,
    list: setStatePropertyLoaded(list),
  })),
  on(SantaListActions.loadListFailure, (state, { error }) => ({
    ...state,
    list: setStatePropertyErrored<Person[]>(error),
  }))
);
