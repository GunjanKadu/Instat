import { TUser } from './Auth';

export interface IColorPanelState {
  modal?: boolean;
  primary?: string;
  secondary?: string;
  usersRef?: firebase.database.Reference;
  user?: TUser;
  userColors?: IColorSnap[];
}
export interface IColorPanelOwnProps {
  currentUser: TUser;
  key: string;
}
export interface IColor {
  hex: string;
}
export interface IColorSnap {
  primary: string;
  secondary: string;
}
