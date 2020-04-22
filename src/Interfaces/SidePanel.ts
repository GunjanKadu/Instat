import { TUser } from './Auth';

export interface IProps {
  currentUser?: TUser;
}

export interface IChannel {
  user?: TUser;
  channels?: Array<any>;
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
