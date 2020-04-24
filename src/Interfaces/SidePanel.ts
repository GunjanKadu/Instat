import { TUser } from './Auth';

export interface IOwnProps {
  currentUser: TUser;
  setChannel?: (channel: IChannelArray) => void;
}
export interface IReduxProps {
  setChannel: (channel: IChannelArray) => void;
}

export type IProps = IOwnProps | IReduxProps;

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
  details: string;
  id: string;
  name: string;
  createdBy: {
    avatar: string;
    name: string;
  };
}
export interface IDirectMessagesState {
  users: Array<string>;
}
