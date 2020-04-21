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
