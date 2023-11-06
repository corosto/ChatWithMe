import { City } from "@shared/components/city/city.component";

export interface UserLogin {
  email: string,
  password: string,
}

export interface UserAuthorization {
  accessToken: string,
  refreshToken: string,
}

export interface TokenData {
  userId: string,
  exp?: number,
  expires_at?: string,
  refreshToken?: string,
}

export interface Register {
  name: string,
  email: string,
  password: string,
  confirmedPassword: string,
  height: string,
  weight: string,
  birthDate: Date,
  sex: string,
  description: string,
  zodiac: string,
  education: string,
  kids: string,
  pets: string,
  alcohol: string,
  smoking: string,
  gym: string,
  diet: string,
  school: string,
  job: string,
  position: string,
  cityInput: string,
  cityChosen: City,
  showMe: string,
  lookingFor: string,
  images: string[],
  interests: string[],
  sexualOrientations: string[],
}