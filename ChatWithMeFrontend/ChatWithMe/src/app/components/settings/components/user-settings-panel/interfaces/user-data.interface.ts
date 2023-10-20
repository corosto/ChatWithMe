import { CityData } from "@shared/components/city/city.component";

export interface UserData {
  email: string,
  lookingForAgeMin: number,
  lookingForAgeMax: number,
  lookingForDistanceMax: number,
  showMe: string,
  useAgeFilter: boolean,
  useDistanceFilter: boolean,
  cityInput: string,
  cityChosen: CityData,
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
  cityChosen: { city: 'Rudy', height: 50.191890265496895, width: 18.448735892422576 },
};
