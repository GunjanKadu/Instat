import { TUser, IUser } from './Auth';

export interface IOwnProps {
  currentUser: TUser;
  setChannel?: (channel: IChannelArray) => void;
}
export interface IReduxProps {
  setChannel: (channel: IChannelArray) => void;
  setPrivateChannel: (value: boolean) => void;
}

export type IProps = IOwnProps & IReduxProps;

export interface IChannel {
  activeChannel?: string;
  user?: TUser;
  channels?: IChannelArray[];
  modal?: boolean;
  channelName?: string;
  channelDetails?: string;
  channelsRef?: firebase.database.Reference;
  firstLoad?: boolean;
}

export interface INewChannel {
  id: string | null;
  name: string;
  details: string;
  createdBy: {
    name: string | undefined;
    avatar: string | undefined;
  };
}

export interface IChannelArray {
  details?: string;
  id?: string;
  name?: string;
  createdBy?: {
    avatar?: string;
    name?: string;
  };
}
export interface IDirectMessagesState {
  users: Array<IUser>;
  user: IUser;
  usersRef: firebase.database.Reference;
  connectedRef: firebase.database.Reference;
  presenceRef: firebase.database.Reference;
}
export interface IDirectOwnProps {
  currentUser: IUser;
}
export interface IDirectMessagesPropsRedux {
  setCurrentChannel: (channel: any) => void;
  setPrivateChannel: (value: boolean) => void;
}
export type IDirectMessagesProps = IDirectMessagesPropsRedux & IDirectOwnProps;
