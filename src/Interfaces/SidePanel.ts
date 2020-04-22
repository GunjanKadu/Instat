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
  user?: TUser;
  channels?: IChannelArray[];
  modal?: boolean;
  channelName?: string;
  channelDetails?: string;
  channelsRef?: firebase.database.Reference;
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
