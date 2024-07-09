import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'my-lib-textbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` <input type="text" [(ngModel)]="value" (change)="writeValue($event)" />`,
})
export class MyTextboxComponent implements ControlValueAccessor {
  disabled = input(false);
  value = model('');

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(event: any) {
    this.value.set(event.target.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
