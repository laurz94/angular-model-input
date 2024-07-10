import { CommonModule } from '@angular/common';
import { Component, input, model, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, Validators } from '@angular/forms';
import { CheckboxConfiguration } from '@my/domain';

@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: ` @for(option of config()!.options; track option.value){
    <div>
      <input
        type="checkbox"
        [id]="config()!.inputId"
        [name]="option.value.toString()"
        class="checkbox"
        [(ngModel)]="checked"
        (click)="writeValue()"
      />
      <label [for]="option.value">{{ option.label }}</label>
    </div>
    }`,
  styles: `.checkbox {
    padding: 0.5rem; margin: 0.25rem; border: 1px solid lightgrey; border-radius: 6px;
  }`,
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  config = input<CheckboxConfiguration>();
  checked = model(false);
  disabled = input(false);
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
      }

      this.control?.updateValueAndValidity();
    }
  }

  writeValue(value?: boolean): void {
    this.checked.set(value ?? !this.checked());
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
