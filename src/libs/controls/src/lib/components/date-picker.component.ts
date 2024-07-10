import { CommonModule } from '@angular/common';
import { Component, input, model, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { BaseFieldConfiguration } from '@my/domain';

@Component({
  selector: 'lib-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<input type="date" [id]="config()?.inputId" [(ngModel)]="value" (change)="writeValue($event)" />`,
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
  config = input<BaseFieldConfiguration>();
  disabled = input(false);
  value = model('');

  control!: AbstractControl | null;

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
