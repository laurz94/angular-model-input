import { Component, inject, model, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyCheckboxComponent, MyTextboxComponent } from 'src/libs/controls/src';
import { getDefaultMyForm, MyForm } from './models/form';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectFormA } from './state/form-selectors';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MyCheckboxComponent,
    MyTextboxComponent,
  ],
  selector: 'app-form',
  styles: `div {
    padding: 0 1rem;
  }
  h2 {
    color: darkturquoise;
  }
  h3{
    color: navy;
  }
  
  .grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }`,
  template: `
    <h2>Using just signals</h2>
    <div class="grid">
      <div>
        <h3>Textbox</h3>
        <my-lib-textbox [(value)]="text"></my-lib-textbox>
        <pre>text: {{ text() | json }}</pre>
      </div>
      <div>
        <h3>Checkbox</h3>
        <my-lib-checkbox
          [(checked)]="isAdmin"
          [label]="'Is Admin'"
          [name]="'isAdmin'"
        ></my-lib-checkbox>
        <pre>isAdmin: {{ isAdmin() | json }}</pre>
      </div>
      <pre>Form Value: {{ myForm().value | json }}</pre>
    </div>
    <h2>Using signal selectors</h2>
    <div class="grid">
      <div>
        <h3>Textbox</h3>
        <my-lib-textbox [(value)]="myForm().value!.textbox"></my-lib-textbox>
        <pre>Form Textbox: {{ myForm().value!.textbox() | json }}</pre>
      </div>
      <div>
        <h3>Checkbox</h3>
        <my-lib-checkbox
          [(checked)]="myForm().value!.checkbox"
          [label]="'I Agree'"
          [name]="'agree'"
        ></my-lib-checkbox>
        <pre>Form checkbox: {{ myForm().value!.checkbox() | json }}</pre>
      </div>
    </div>
  `,
})
export class FormComponent {
  #store = inject(Store);

  protected myForm = this.#store.selectSignal(selectFormA);
  protected isAdmin = signal(true);
  protected text = signal('hello');
}
