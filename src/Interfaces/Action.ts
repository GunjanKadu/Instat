/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:46:43
 *
 */

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
export interface ISetUserPosts
  extends Action<typeof actionsTypes.SET_USER_POSTS> {
  payload: any;
}

export type IActionChannel = ISetChannel | ISetPrivateChannel | ISetUserPosts;

// Colors
export interface ISetColor extends Action<typeof actionsTypes.SET_COLORS> {
  payload: { primary: string; secondary: string };
}

export type IActionColor = ISetColor;
