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
