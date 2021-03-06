/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:47:14
 *
 */

import * as actionTypes from './types';
import * as IActions from '../../Interfaces/Action';
import { IUser } from '../../Interfaces/Auth';
import * as I from '../../Interfaces/SidePanel';
import { IUserPosts } from '../../Interfaces/Messages';

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

export const setUserPosts = (userPosts: IUserPosts): IActions.ISetUserPosts => {
  return {
    type: actionTypes.SET_USER_POSTS,
    payload: userPosts,
  };
};

// Color  actions
export const setColors = (
  primary: string,
  secondary: string
): IActions.ISetColor => {
  return {
    type: actionTypes.SET_COLORS,
    payload: { primary: primary, secondary: secondary },
  };
};
