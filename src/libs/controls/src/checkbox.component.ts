import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'my-lib-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<pre>checkbox value {{ checked() | json }}</pre>
    <div>
      <input type="checkbox" [id]="name()" [name]="name()" [(ngModel)]="checked" (click)="writeValue()" />
      <label [for]="name()">{{ label() }}</label>
    </div> `,
  styles: ``,
})
export class MyCheckboxComponent implements ControlValueAccessor {
  checked = model(false);
  disabled = input(false);
  label = input('');
  name = input('');

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(): void {
    this.checked.set(!this.checked());
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
