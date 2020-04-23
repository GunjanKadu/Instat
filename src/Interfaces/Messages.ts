import { IChannelArray } from './SidePanel';
import { IUser } from './Auth';

export interface IStateMessage {
  messagesRef: firebase.database.Reference;
  channel: IChannelArray;
  user: IUser;
}

export interface IPropsMessageForm {
  messagesRef: firebase.database.Reference;
  currentChannel: IChannelArray;
  currentUser: IUser;
}
export interface IStateMessageForm {
  message?: string;
  loading?: boolean;
  channel?: IChannelArray;
  user?: IUser;
  errors?: Array<any>;
}

export interface IMessagesProp {
  currentChannel?: IChannelArray;
  currentUser?: IUser;
}
