import { signal, WritableSignal } from "@angular/core";

export interface MyForm {
  checkbox: WritableSignal<boolean>;
  textbox: WritableSignal<string>;
}

export function getDefaultMyForm(overrides?: Partial<MyForm>) {
  return Object.assign({checkbox: signal(false), textbox: signal('') }, overrides);
}
