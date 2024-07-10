import { CommonModule } from '@angular/common';
import { Component, input, model, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { SelectConfiguration } from '@my/domain';

@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<select [(ngModel)]="value" [name]="config()!.name" [id]="config()!.inputId" (ngModelChange)="writeValue($event)">
    @for(option of config()!.options; track option.value) {
    <option [value]="option.value">{{ option.name }}</option>
    }
  </select>`,
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  config = input<SelectConfiguration>();
  disabled = input(false);
  value = model('');

  control!: AbstractControl | null;
  selectedValue!: string;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.config()) {
      this.control = this.ngControl?.control;

      if (this.config()!.isRequired) {
        this.control?.addValidators(Validators.required);
        this.control?.updateValueAndValidity();
      }
    }
  }

  writeValue(event: any) {
    if (typeof event === 'string') {
      this.value.set(event);
    } else {
      this.value.set(event?.target.value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
