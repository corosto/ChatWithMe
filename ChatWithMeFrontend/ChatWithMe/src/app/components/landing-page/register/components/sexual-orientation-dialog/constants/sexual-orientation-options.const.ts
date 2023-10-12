export const SEXUAL_ORIENTATIONS_OPTIONS: Options[] = [
  {
    text: 'Heteroseksualna',
    isChecked: false,
  },
  {
    text: 'Gej',
    isChecked: false,
  },
  {
    text: 'Lesbijka',
    isChecked: false,
  },
  {
    text: 'Biseksualna',
    isChecked: false,
  },
  {
    text: 'Aseksualna',
    isChecked: false,
  },
  {
    text: 'Demiseksualna',
    isChecked: false,
  },
  {
    text: 'Panseksualna',
    isChecked: false,
  },
  {
    text: 'Queer',
    isChecked: false,
  },
  {
    text: 'Niezdefiniowana',
    isChecked: false,
  },
];

interface Options {
  text: string
  isChecked: boolean,
}