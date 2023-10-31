import { Match } from "@components/home/components/matches/components/match/mock/mock";
import { City } from "@shared/components/city/city.component";

export interface UserData {
  email: string,
  lookingForAgeMin: number,
  lookingForAgeMax: number,
  lookingForDistanceMax: number,
  showMe: string,
  useAgeFilter: boolean,
  useDistanceFilter: boolean,
  cityInput: string,
  cityChosen: City,
}

export const USER_DATA_MOCK: UserData = {
  email: 'email@example.com',
  lookingForAgeMin: 20,
  lookingForAgeMax: 35,
  lookingForDistanceMax: 40,
  showMe: 'female',
  useAgeFilter: false,
  useDistanceFilter: true,
  cityInput: "Rudy, Powiat raciborski",
  cityChosen: { Name: 'Rudy', Height: 50.191890265496895, Width: 18.448735892422576 },
};

export const USER_PROFILE_MOCKS: Match =
{
  name: 'Jarosław',
  age: '72',
  city: 'Rudy',
  images: [
    'https://images.pexels.com/photos/18031817/pexels-photo-18031817/free-photo-of-pouring-drink-to-cup.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3468548/pexels-photo-3468548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/17951936/pexels-photo-17951936/free-photo-of-facade-of-a-town-hall-in-wroclaw.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/18799882/pexels-photo-18799882/free-photo-of-palm-trees-line-the-beach-in-front-of-the-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/17960592/pexels-photo-17960592/free-photo-of-park-and-trees-with-buildings-behind.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ],
  height: '180',
  weight: '75',
  sex: 'female',
  lookingFor: 'Stałego związku',
  interests: ['Sneakersy', 'Gorące źródła', 'Spacery', 'Filmy', 'Gitarzyści'],
  sexualOrientations: ['Biseksualna', 'Aseksualna', 'Demiseksualna'],
  description: 'I love adventure and trying new things. I enjoy hiking in the mountains and exploring new places.',
  zodiac: 'Bliźnięta',
  education: 'Chodzę do liceum',
  kids: 'Mam dzieci i chcę więcej',
  pets: 'Płaz',
  alcohol: 'Próbuję ograniczać',
  smoking: 'Nie palę',
  gym: 'Często',
  diet: 'Peskatariańska',
  school: 'Polsl',
  job: 'Elzab',
  position: 'Programista',
};