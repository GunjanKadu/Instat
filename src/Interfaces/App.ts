/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:46:48
 *
 */

import { TUser } from './Auth';
import { IChannelArray } from './SidePanel';

export interface IProps {
  currentUser?: TUser;
  currentChannel?: IChannelArray;
  isPrivateChannel?: boolean;
  userPosts?: any;
}
