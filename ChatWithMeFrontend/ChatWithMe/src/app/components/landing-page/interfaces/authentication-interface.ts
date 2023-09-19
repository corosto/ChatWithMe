export interface UserLogin {
  email: string,
  password: string,
}

export interface UserAuthorization {
  accessToken: string,
  refreshToken: string,
}

export interface TokenData {
  email: string,
  firstName: string,
  id: string,
  exp?: number,
  expires_at?: string,
  refreshToken?: string,
}
