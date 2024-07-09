import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { MyCheckboxComponent, MyTextboxComponent } from 'src/libs/controls/src';

import { FormActions } from './state/form-actions';
import { selectFormA } from './state/form-selectors';
import { StateComponent } from './state.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MyCheckboxComponent, MyTextboxComponent, StateComponent],
  selector: 'app-form',
  styles: `.page {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }`,
  template: `
    <div class="page">
      <div class="grid">
        <h2>Using just signals</h2>
        <div>
          <h3>Textbox</h3>
          <my-lib-textbox [(value)]="text" (valueChange)="updateState($event, 'textbox')"></my-lib-textbox>
          <pre>text: {{ text() | json }}</pre>
        </div>
        <div>
          <h3>Checkbox</h3>
          <my-lib-checkbox [(checked)]="isAdmin" [label]="'Is Admin'" [name]="'isAdmin'"></my-lib-checkbox>
          <pre>isAdmin: {{ isAdmin() | json }}</pre>
        </div>
      </div>
      <div class="grid">
        <h2>Using signal selectors</h2>
        <div>
          <h3>Textbox</h3>
          <my-lib-textbox [value]="myForm().value!.textbox" (valueChange)="updateState($event, 'textbox')"></my-lib-textbox>
        </div>
        <div>
          <h3>Checkbox</h3>
          <my-lib-checkbox
            [checked]="myForm().value!.checkbox"
            [label]="'I Agree'"
            [name]="'agree'"
            (checkedChange)="updateState($event, 'checkbox')"
          ></my-lib-checkbox>
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

  updateState(value: string | boolean, property: string) {
    this.#store.dispatch(
      FormActions.updateState({
        form: { ...this.myForm().value!, [property]: value },
      })
    );
  }
}
