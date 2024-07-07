import { Component, input, model, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-lib-textbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<pre>textbox value {{ value() | json }}</pre>
    <input type="text" [(ngModel)]="value" (change)="updateValue($event)" />`,
})
export class MyTextboxComponent {
  disabled = input(false);
  value = model('');

  updateValue(event: any) {
    this.value.set(event.target.value);
  }
}
