export const LOOKING_FOR_OPTIONS: Options[] = [
  {
    text: 'Stałego związku',
    icon: 'heart',
  },
  {
    text: 'Czegoś stałego lub na krótko',
    icon: 'love',
  },
  {
    text: 'Czegoś na krótko lub dłużej',
    icon: 'champagne',
  },
  {
    text: 'Zabawy i czegoś przelotnego',
    icon: 'party',
  },
  {
    text: 'Nowych znajomości',
    icon: 'wave',
  },
  {
    text: 'Jeszcze nie wiem',
    icon: 'think',
  },
];

interface Options {
  text: LookingForText,
  icon: LookingForIcon,
}

export type LookingForText = 'Stałego związku' | 'Czegoś stałego lub na krótko' | 'Czegoś na krótko lub dłużej' | 'Zabawy i czegoś przelotnego' | 'Nowych znajomości' | 'Jeszcze nie wiem';
export type LookingForIcon = 'heart' | 'love' | 'champagne' | 'party' | 'wave' | 'think';

