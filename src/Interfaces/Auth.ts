export interface IRegister {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  errors: Array<{ message: string }>;
  loading: boolean;
  userRef: firebase.database.Reference;
}
export type TError = Array<{ message: string }>;

export interface ILogin {
  userName: string;
  email: string;
  password: string;
  errors: Array<{ message: string }>;
  loading: boolean;
}
export interface IUser {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: any;
  isAnonymous: boolean;
  tenantId: any;
  providerData: any;
  apiKey: string;
  appName: string;
  authDomain: string;
  stsTokenManager: any;
  redirectEventId: any;
  lastLoginAt: string;
  createdAt: string;
  multiFactor: any;
}
