/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:47:06
 *
 */

import { TUser, IUser } from './Auth';

export interface IOwnProps {
  currentUser: TUser;
  primaryColor?: string;
  setChannel?: (channel: IChannelArray) => void;
}
export interface IReduxProps {
  setChannel: (channel: IChannelArray) => void;
  setPrivateChannel: (value: boolean) => void;
}

export type IProps = IOwnProps & IReduxProps;

export interface IChannel {
  activeChannels?: string;
  activeChannel?: string;
  user?: TUser;
  channels?: IChannelArray[];
  modal?: boolean;
  channelName?: string;
  channelDetails?: string;
  channelsRef?: firebase.database.Reference;
  messageRef?: firebase.database.Reference;
  firstLoad?: boolean;
  notifications?: INotifications[];
  channel?: IChannelArray;
  typingRef?: firebase.database.Reference;
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
export interface INotifications {
  id: string;
  total: number;
  lastKnownTotal: number;
  count: number;
}
export interface IDirectMessagesPropsRedux {
  setCurrentChannel: (channel: any) => void;
  setPrivateChannel: (value: boolean) => void;
}

export interface IStarredState {
  starredChannels?: Array<any>;
  activeChannel?: string;
  user?: IUser;
  usersRef?: firebase.database.Reference;
}
export interface IStarredReduxProps {
  setChannel?: (channel: IChannelArray) => void;
  setPrivateChannel?: (value: boolean) => void;
}
export interface IStarredOwnProps {
  currentUser: IUser;
}
export type IStarredProps = IStarredReduxProps & IStarredOwnProps;
export type IDirectMessagesProps = IDirectMessagesPropsRedux & IDirectOwnProps;

export interface IUserPanelProps {
  currentUser?: TUser;
  primaryColor?: string;
}
export interface IUserPanelState {
  user: TUser;
  modal?: boolean;
  previewImage?: any;
  croppedImage: string;
  blob: any;
  storageRef: firebase.storage.Reference;
  userRef: any;
  metadata: { contentType: string };
  uploadedCroppedImage: string;
  usersRef: firebase.database.Reference;
}
