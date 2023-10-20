export interface UserLogin {
  email: string,
  password: string,
}

export interface UserAuthorization {
  accessToken: string,
  refreshToken: string,
}

export interface TokenData {
  name: string,
  // image: string, //TODO żeby token dawał też zdjęcie
  exp?: number,
  expires_at?: string,
  refreshToken?: string,
}
