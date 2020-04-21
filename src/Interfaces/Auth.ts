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
  N?: Array<any>;
  l?: string;
  m?: string;
  s?: string;
  a?: any;
  b?: any;
  xa?: string;
  _lat?: string;
  refreshToken?: string;
  uid?: string;
  displayName?: string;
  photoURL?: string;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  isAnonymous?: boolean;
  tenantId?: any;
  metadata?: any;
  providerData?: any;
  wa?: boolean;
  na?: any;
  u?: any;
  Yb?: any;
  eb?: any;
  P?: boolean;
  i?: any;
  R?: any;
  h?: any;
  B?: any;
  Z?: any;
  oa?: any;
  za?: any;
  aa?: any;
  W?: any;
  ya?: any;
  $?: any;
  O?: any;
  multiFactor?: any;
  ga?: any;
}
