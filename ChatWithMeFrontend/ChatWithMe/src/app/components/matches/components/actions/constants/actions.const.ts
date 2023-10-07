export const ACTIONS: Action[] = [
  {
    iconName: 'left',
    text: 'Nie',
  },
  {
    iconName: 'right',
    text: 'Like',
  },
  {
    iconName: 'up',
    text: 'Pokaż profil',
  },
  {
    iconName: 'down',
    text: 'Zamknij profil',
  },
  {
    iconName: 'space',
    text: 'Następne zdjęcie',
  },
];

export interface Action {
  iconName: action,
  text: string,
}

export type action = 'left' | 'right' | 'up' | 'down' | 'space';