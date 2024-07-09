export interface MyForm {
  checkbox: boolean;
  textbox: string;
}

export function getDefaultMyForm(overrides?: Partial<MyForm>) {
  return Object.assign({ checkbox: false, textbox: null }, overrides);
}
