export const SEXUAL_ORIENTATIONS_OPTIONS: Options[] = [
  {
    text: 'Heteroseksualna',
    value: 'hetero',
    isChecked: false,
  },
  {
    text: 'Gej',
    value: 'gay_male',
    isChecked: false,
  },
  {
    text: 'Lesbijka',
    value: 'gay_female',
    isChecked: false,
  },
  {
    text: 'Biseksualna',
    value: 'bi',
    isChecked: false,
  },
  {
    text: 'Aseksualna',
    value: 'asex',
    isChecked: false,
  },
  {
    text: 'Demiseksualna',
    value: 'demi',
    isChecked: false,
  },
  {
    text: 'Panseksualna',
    value: 'pan',
    isChecked: false,
  },
  {
    text: 'Queer',
    value: 'qr',
    isChecked: false,
  },
  {
    text: 'Niezdefiniowana',
    value: 'idk',
    isChecked: false,
  },
];

interface Options {
  text: string,
  value: string,
  isChecked: boolean,
}