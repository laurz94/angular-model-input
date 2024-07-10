import { signal, Signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContentConfiguration } from '@my/controls';
import { ControlTypeEnum } from '@my/domain';

import { Address } from './models/address';
import { Contact } from './models/contact';
import { Person } from './models/person';
import { colorSelectOptions } from './state/data/color-select-options';
import { countrySelectOptions } from './state/data/country-options';

export function getAddressDetailConfiguration(): ContentConfiguration {
  return {
    addressLine1: {
      formControlName: 'addressLine1',
      label: 'Address Line 1',
      controlConfig: { controlType: ControlTypeEnum.Textbox, inputId: 'text', name: 'text', isRequired: true },
    },
    addressLine2: {
      formControlName: 'addressLine2',
      label: 'Address Line 2',
      controlConfig: { controlType: ControlTypeEnum.Textbox, inputId: 'text', name: 'text', isRequired: true },
    },
    city: {
      formControlName: 'city',
      label: 'City',
      controlConfig: { controlType: ControlTypeEnum.Textbox, inputId: 'text', name: 'text', isRequired: true },
    },
    state: {
      formControlName: 'state',
      label: 'State',
      controlConfig: { controlType: ControlTypeEnum.Textbox, inputId: 'text', name: 'text', isRequired: true },
    },
    country: {
      formControlName: 'country',
      label: 'Country',
      controlConfig: {
        controlType: ControlTypeEnum.Dropdown,
        inputId: 'text',
        name: 'text',
        isRequired: true,
        options: countrySelectOptions,
      },
    },
  };
}

export function getContactDetailConfiguration(): ContentConfiguration {
  return {
    motherPhone: {
      formControlName: 'motherPhone',
      label: `Mother's Phone Number`,
      controlConfig: { controlType: ControlTypeEnum.Textbox, inputId: 'motherPhone', name: 'motherPhone', isRequired: false },
    },
    fatherPhone: {
      formControlName: 'fatherPhone',
      label: `Father's Phone Number`,
      controlConfig: { controlType: ControlTypeEnum.Textbox, inputId: 'fatherPhone', name: 'fatherPhone', isRequired: false },
    },
  };
}

export function getPersonDetailConfiguration(age: Signal<number | undefined>): ContentConfiguration {
  return {
    firstName: {
      formControlName: 'firstName',
      label: 'First Name',
      controlConfig: { controlType: ControlTypeEnum.Textbox, inputId: 'firstName', name: 'firstName', isRequired: true },
    },
    lastName: {
      formControlName: 'lastName',
      label: 'Last Name',
      controlConfig: { controlType: ControlTypeEnum.Textbox, inputId: 'lastName', name: 'lastName', isRequired: true },
    },
    dateOfBirth: {
      formControlName: 'dateOfBirth',
      label: 'Birthdate',
      controlConfig: { controlType: ControlTypeEnum.DatePicker, inputId: 'dateOfBirth', name: 'dateOfBirth', isRequired: true },
      hint: `${age()} years`,
    },
    favoriteColor: {
      formControlName: 'favoriteColor',
      label: 'Favorite Color',
      controlConfig: {
        controlType: ControlTypeEnum.Dropdown,
        inputId: 'text',
        name: 'text',
        isRequired: true,
        options: colorSelectOptions,
      },
    },
    isNaughty: {
      formControlName: 'isNaughty',
      label: 'Is Naughty',
      hideLabel: true,
      controlConfig: {
        controlType: ControlTypeEnum.Checkbox,
        inputId: 'text',
        name: 'text',
        isRequired: true,
        options: [{ label: 'Is Naughty', value: true }],
      },
    },
  };
}

export function getPersonDetailFormGroup(person: Person | any, address: Address | any, contact: Contact | any): FormGroup {
  const formGroup = new FormGroup({});
  Object.keys(getPersonDetailConfiguration(signal(undefined))).forEach((field) =>
    formGroup.addControl(`${field}`, new FormControl(person[field]))
  );
  Object.keys(getAddressDetailConfiguration()).forEach((field) => formGroup.addControl(`${field}`, new FormControl(address[field])));
  Object.keys(getContactDetailConfiguration()).forEach((field) => formGroup.addControl(`${field}`, new FormControl(contact[field])));

  return formGroup;
}
