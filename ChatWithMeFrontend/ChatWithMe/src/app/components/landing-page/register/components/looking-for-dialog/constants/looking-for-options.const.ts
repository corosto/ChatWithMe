export const LOOKING_FOR_OPTIONS: Options[] = [
  {
    text: 'Stałego związku',
    value: 'stable',
    icon: 'heart',
  },
  {
    text: 'Czegoś stałego lub na krótko',
    value: 'stable_or_short',
    icon: 'love',
  },
  {
    text: 'Czegoś na krótko lub dłużej',
    value: 'short_or_long',
    icon: 'champagne',
  },
  {
    text: 'Zabawy i czegoś przelotnego',
    value: 'fun',
    icon: 'party',
  },
  {
    text: 'Nowych znajomości',
    value: 'new_friends',
    icon: 'wave',
  },
  {
    text: 'Jeszcze nie wiem',
    value: 'idk',
    icon: 'think',
  },
];

interface Options {
  text: string,
  value: string,
  icon: string,
}