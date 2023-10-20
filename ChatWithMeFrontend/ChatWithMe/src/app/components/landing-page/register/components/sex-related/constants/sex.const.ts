export const SEX: ValueText[] = [
  {
    value: 'male',
    text: 'Mężczyzna',
  },
  {
    value: 'female',
    text: 'Kobieta',
  },
  {
    value: 'other',
    text: 'Inna',
  },
];

export const SHOW_ME_SEX: ValueText[] = [
  {
    value: 'male',
    text: 'Mężczyzn',
  },
  {
    value: 'female',
    text: 'Kobiety',
  },
  {
    value: 'all',
    text: 'Wszystkich',
  },
];

interface ValueText {
  value: string,
  text: string,
}