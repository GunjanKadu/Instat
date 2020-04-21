import * as actionsTypes from '../Store/Actions/types';
import { Action } from 'redux';

export interface ISetUser extends Action<typeof actionsTypes.SET_USER> {
  payload: any;
}

export type IAction = ISetUser;
