import * as I from './Auth';
import * as IC from './SidePanel';

export interface IUserState {
  currentUser: I.TUser;
  isLoading: boolean;
}
export interface IChannel {
  currentChannel: IC.IChannelArray | null;
}
