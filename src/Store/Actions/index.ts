import * as actionTypes from './types';
import * as IActions from '../../Interfaces/Action';
import { IUser } from '../../Interfaces/Auth';
import * as I from '../../Interfaces/SidePanel';

// User Actions
export const setUser = (user: IUser): IActions.ISetUser => {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
};
export const clearUser = (): IActions.IClearUser => {
  return {
    type: actionTypes.CLEAR_USER,
  };
};

// Channel Actions
export const setChannel = (channel: I.IChannelArray): IActions.ISetChannel => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: channel,
  };
};
export const setPrivateChannel = (
  isPrivatechannel: boolean
): IActions.ISetPrivateChannel => {
  return {
    type: actionTypes.SET_PRIVATE_CHANNEL,
    payload: isPrivatechannel,
  };
};
