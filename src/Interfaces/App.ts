import { TUser } from './Auth';
import { IChannelArray } from './SidePanel';

export interface IProps {
  currentUser?: TUser;
  currentChannel?: IChannelArray;
  isPrivateChannel?: boolean;
}
