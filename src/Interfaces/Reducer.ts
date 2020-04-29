/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:47:02
 *
 */

import * as I from './Auth';
import * as IC from './SidePanel';
import { IUserPosts } from './Messages';

export interface IUserState {
  currentUser: I.TUser;
  isLoading: boolean;
}
export interface IChannel {
  currentChannel: IC.IChannelArray | null;
  isPrivateChannel: boolean;
  userPosts: IUserPosts;
}
