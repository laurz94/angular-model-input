import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ContentComponent, ContentConfiguration, fadeInListAnimation } from 'src/libs/controls/src';
import { FieldComponent } from 'src/libs/controls/src/lib/components/field.component';

import { Address } from './models/address';
import { Contact } from './models/contact';
import { Person } from './models/person';
import {
  getAddressDetailConfiguration,
  getContactDetailConfiguration,
  getPersonDetailConfiguration,
  getPersonDetailFormGroup,
} from './person-detail.configuration';
import { selectAddressByPerson, selectContactByPerson, selectPerson } from './state/santa-list-selectors';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ContentComponent, FieldComponent],
  animations: [fadeInListAnimation],
  styles: `
  .person {
    border: 1px lightgrey solid;
    border-radius: 6px;
    padding: 0.5rem;
  }
  .field-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0.25rem;
    gap: 1rem;
  }
  `,
  template: `
    <div class="page">
      <div class="person">
        @if(person() && formGroup.value){
        <h2>{{ person()!.firstName }} {{ person()!.lastName }}</h2>
        <lib-content [data]="person()" [configurations]="personConfigs" layout="two-column"></lib-content>

        <h3>Address</h3>
        <lib-content [data]="address()" [configurations]="addressConfigs" layout="two-column"></lib-content>

        <h3>Contact Information</h3>
        <lib-content [data]="contact()" [configurations]="contactConfigs" layout="two-column"></lib-content>
        }
      </div>
    </div>
  `,
})
export class PersonDetailComponent {
  #store = inject(Store);

  address: Signal<Address | undefined>;
  contact: Signal<Contact | undefined>;
  person: Signal<Person | undefined>;
  addressConfigs = getAddressDetailConfiguration();
  contactConfigs = getContactDetailConfiguration();
  personConfigs: ContentConfiguration;
  formGroup: FormGroup;

  age = computed(() => {
    if (this.person()) {
      const birthDate = new Date(this.person()!.dateOfBirth);
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
  });

  constructor(private route: ActivatedRoute) {
    this.address = this.#store.selectSignal(selectAddressByPerson(+route.snapshot.params['id']));
    this.contact = this.#store.selectSignal(selectContactByPerson(+route.snapshot.params['id']));
    this.person = this.#store.selectSignal(selectPerson(+route.snapshot.params['id']));
    this.personConfigs = getPersonDetailConfiguration(this.age);
    this.formGroup = getPersonDetailFormGroup(this.person(), this.address(), this.contact());
  }
}
