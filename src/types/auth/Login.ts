export interface LoginResponse {
  idToken: IDToken;
  refreshToken: RefreshToken;
  accessToken: AccessToken;
  clockDrift: number;
}

export interface AccessToken {
  jwtToken: string;
  payload: AccessTokenPayload;
}

export interface AccessTokenPayload {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
}

export interface IDToken {
  jwtToken: string;
  payload: IDTokenPayload;
}

export interface IDTokenPayload {
  sub: string;
  email_verified: boolean;
  iss: string;
  "cognito:username": string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  email: string;
}

export interface RefreshToken {
  token: string;
}

export type FBLoginResponse = {
  status: string;
  authResponse: {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  };
};

export type FBUserResponse = {
  id: string;
  name: string;
  email?: string | null | undefined;
};
