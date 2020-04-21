export interface IRegister {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  errors: Array<{ message: string }>;
  loading: boolean;
}
export type TError = Array<{ message: string }>;
