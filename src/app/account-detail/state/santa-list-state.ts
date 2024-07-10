import { getInitialStateProperty, StateProperty } from '@my/domain';

import { Address } from '../models/address';
import { Contact } from '../models/contact';
import { Person } from '../models/person';

import { getAddresses, getContacts, getPeople } from './data';

export const santaListFeatureKey = 'santaList';

export interface SantaListState {
  addresses: StateProperty<Address[]>;
  contacts: StateProperty<Contact[]>;
  people: StateProperty<Person[]>;
}

export const initialSantaListState = {
  addresses: getInitialStateProperty<Address[]>(getAddresses()),
  contacts: getInitialStateProperty<Contact[]>(getContacts()),
  people: getInitialStateProperty<Person[]>(getPeople()),
};
