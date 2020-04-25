/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github //github.com/GunjanKadu
 * @date   2020-04-25 23:46:52
 *
 */

export interface IRegister {
  userName?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  errors?: Array<{ message: string }>;
  loading?: boolean;
  userRef?: firebase.database.Reference;
}
export type TError = Array<{ message: string }>;

export interface ILogin {
  userName?: string;
  email?: string;
  password?: string;
  errors?: Array<{ message: string }>;
  loading?: boolean;
}
export interface IUser {
  uid?: string;
  displayName?: string;
  photoURL?: string;
  email?: string;
  emailVerified?: boolean;
  phoneNumber?: any;
  isAnonymous?: boolean;
  tenantId?: any;
  providerData?: any;
  apiKey?: string;
  appName?: string;
  authDomain?: string;
  stsTokenManager?: any;
  redirectEventId?: any;
  lastLoginAt?: string;
  createdAt?: string;
  multiFactor?: any;
  status?: string;
  name?: string;
}
export type TUser = IUser | null | undefined;
