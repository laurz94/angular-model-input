import { createSelector } from '@ngrx/store';

import { AppState } from '../../app.config';

import { santaListFeatureKey, SantaListState } from './santa-list-state';

export const selectListState = (state: AppState) => state[santaListFeatureKey];

export const selectSantaList = createSelector(selectListState, (state: SantaListState) => state.people.value);
export const selectNiceList = createSelector(selectSantaList, (people) => people?.filter((p) => !p.isNaughty));
export const selectNaughtyList = createSelector(selectSantaList, (people) => people?.filter((p) => p.isNaughty));

export const selectPerson = (id: number) =>
  createSelector(selectSantaList, (people) => {
    return people?.find((p) => p.id === id);
    /*
    return {
      ...person,
       age: computed(() => {
        if (person) {
          const birthDate = new Date(person.dateOfBirth);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();

          // If birth month hasn't occurred yet this year, or it's the birth month but the day hasn't occurred yet, subtract 1 from age
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
          }

          return age;
        } else {
          return undefined;
        }
      }), 
    };*/
  });

export const selectAddresses = createSelector(selectListState, (state: SantaListState) => state.addresses.value);
export const selectAddress = (id: number) => createSelector(selectAddresses, (address) => address?.find((p) => p.id === id));
export const selectAddressByPerson = (personId: number) =>
  createSelector(selectAddresses, (address) => address?.find((p) => p.personId === personId));

export const selectContacts = createSelector(selectListState, (state: SantaListState) => state.contacts.value);
export const selectContact = (id: number) => createSelector(selectContacts, (contact) => contact?.find((p) => p.id === id));
export const selectContactByPerson = (personId: number) =>
  createSelector(selectContacts, (contact) => contact?.find((p) => p.personId === personId));
