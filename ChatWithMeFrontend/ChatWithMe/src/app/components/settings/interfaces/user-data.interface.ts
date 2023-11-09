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
