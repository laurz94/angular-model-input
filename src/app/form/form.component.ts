import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseFieldConfiguration, CheckboxConfiguration, ControlTypeEnum } from '@my/domain';
import { Store } from '@ngrx/store';

import { CheckboxComponent, TextboxComponent } from 'src/libs/controls/src';

import { FormActions } from './state/form-actions';
import { selectFormA } from './state/form-selectors';
import { StateComponent } from './state.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, CheckboxComponent, TextboxComponent, StateComponent],
  selector: 'app-form',
  styles: `.page {
    display: grid;
    grid-template-columns: repeat(3, 1fr);    

    div {
      padding: 0 1rem;
      margin: 1rem;
    }
  }`,
  template: `
    <div class="page">
      <div class="grid">
        <h2>Using just signals</h2>
        <div>
          <h3>Textbox</h3>
          <lib-textbox [config]="textboxConfig" [(value)]="text" (valueChange)="updateState($event, 'textbox')"></lib-textbox>
          <pre>text: {{ text() | json }}</pre>
        </div>
        <div>
          <h3>Checkbox</h3>
          <lib-checkbox [(checked)]="isAdmin" [config]="checkboxConfig"></lib-checkbox>
          <pre>isAdmin: {{ isAdmin() | json }}</pre>
        </div>
      </div>
      <div class="grid">
        <h2>Using signal selectors</h2>
        <div>
          <h3>Textbox</h3>
          <lib-textbox
            [config]="textboxConfig"
            [value]="myForm().value!.textbox"
            (valueChange)="updateState($event, 'textbox')"
          ></lib-textbox>
        </div>
        <div>
          <h3>Checkbox</h3>
          <lib-checkbox
            [checked]="myForm().value!.checkbox"
            [config]="checkboxConfig"
            (checkedChange)="updateState($event, 'checkbox')"
          ></lib-checkbox>
        </div>
      </div>
      <app-state></app-state>
    </div>
  `,
})
export class FormComponent {
  #store = inject(Store);

  protected myForm = this.#store.selectSignal(selectFormA);
  protected isAdmin = signal(true);
  protected text = signal('hello');

  checkboxConfig: CheckboxConfiguration = {
    controlType: ControlTypeEnum.Checkbox,
    inputId: 'check',
    name: 'check',
    isRequired: false,
    options: [{ label: 'I agree', value: true }],
  };

  textboxConfig: BaseFieldConfiguration = {
    controlType: ControlTypeEnum.Textbox,
    inputId: 'text',
    name: 'text',
    isRequired: true,
  };

  updateState(value: string | boolean, property: string) {
    this.#store.dispatch(
      FormActions.updateState({
        form: { ...this.myForm().value!, [property]: value },
      })
    );
  }
}
