import { CommonModule } from '@angular/common';
import { Component, computed, Input, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldConfiguration } from '@my/domain';

import { buildFormGroup } from '../../functions';
import { FieldComponent } from '../field.component';

export type ContentConfiguration = {
  [key: string]: FieldConfiguration<any>;
};

@Component({
  selector: 'lib-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FieldComponent],
  styleUrl: './content.component.scss',
  template: `
    <div class="section" [ngClass]="layout" [formGroup]="formGroup()">
      @for(field of fields(); track field){
      <lib-field [fieldConfig]="configurations()![field]"></lib-field>
      }
    </div>
  `,
})
export class ContentComponent {
  @Input() layout: 'one-column' | 'two-column' = 'one-column';
  data = input.required<any>();
  configurations = input.required<ContentConfiguration>();

  fields = computed(() => Object.keys(this.configurations()));
  formGroup = computed(() => buildFormGroup(this.data(), this.configurations(), this.fields()));
}
