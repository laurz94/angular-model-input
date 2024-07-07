import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-lib-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<pre>checkbox value {{ checked() | json }}</pre>
    <div>
      <input type="checkbox" [id]="name()" [name]="name()" [(ngModel)]="checked" />
      <label [for]="name()">{{ label() }}</label>
    </div> `,
  styles: ``,
})
export class MyCheckboxComponent {
  checked = model(false);
  disabled = input(false);
  label = input('');
  name = input('');

  toggle() {
    // While standard inputs are read-only, you can write directly to model inputs.
    this.checked.set(!this.checked());
  }
}
