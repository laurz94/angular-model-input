import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectFormA } from './state/form-selectors';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-state',
  styles: ``,
  template: `
    <div class="grid">
      <h2>Store Value</h2>
      <pre>{{ myForm() | json }}</pre>
    </div>
  `,
})
export class StateComponent {
  #store = inject(Store);

  protected myForm = this.#store.selectSignal(selectFormA);
}
