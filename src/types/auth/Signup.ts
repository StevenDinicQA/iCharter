export interface SignUpResponse {
  user: User;
  userConfirmed: boolean;
  userSub: string;
  codeDeliveryDetails: CodeDeliveryDetails;
}

export interface CodeDeliveryDetails {
  AttributeName: string;
  DeliveryMedium: string;
  Destination: string;
}

export interface User {
  username: string;
  pool: Pool;
  Session: null;
  client: Client;
  signInUserSession: null;
  authenticationFlowType: string;
  keyPrefix: string;
  userDataKey: string;
}

export interface Client {
  endpoint: string;
  fetchOptions: FetchOptions;
}

export interface FetchOptions {}

export interface Pool {
  userPoolId: string;
  clientId: string;
  client: Client;
  advancedSecurityDataCollectionFlag: boolean;
}
