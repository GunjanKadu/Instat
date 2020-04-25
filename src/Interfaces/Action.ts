import * as actionsTypes from '../Store/Actions/types';
import { Action } from 'redux';
import * as I from './SidePanel';

// User
export interface ISetUser extends Action<typeof actionsTypes.SET_USER> {
  payload: any;
}
export interface IClearUser extends Action<typeof actionsTypes.CLEAR_USER> {}

export type IActionUser = ISetUser | IClearUser;

// Channels
export interface ISetChannel
  extends Action<typeof actionsTypes.SET_CURRENT_CHANNEL> {
  payload: I.IChannelArray;
}
export interface ISetPrivateChannel
  extends Action<typeof actionsTypes.SET_PRIVATE_CHANNEL> {
  payload: boolean;
}

export type IActionChannel = ISetChannel | ISetPrivateChannel;
