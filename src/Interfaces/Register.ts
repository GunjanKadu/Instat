export interface IRegister {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  errors: Array<any>;
}
