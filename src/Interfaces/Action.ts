import * as actionsTypes from '../Store/Actions/types';
import { Action } from 'redux';

export interface ISetUser extends Action<typeof actionsTypes.SET_USER> {
  payload: any;
}
export interface IClearUser extends Action<typeof actionsTypes.CLEAR_USER> {}

export type IAction = ISetUser | IClearUser;
