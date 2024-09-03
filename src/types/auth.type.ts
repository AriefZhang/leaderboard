export interface JwtPayload {
  username: string;
}

export interface SignInResponse {
  accessToken: string;
}

export enum UserRoles {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}
