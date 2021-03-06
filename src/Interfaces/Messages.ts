/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:46:58
 *
 */

import { IChannelArray } from './SidePanel';
import { IUser } from './Auth';

export interface IStateMessage {
  privateChannel?: boolean;
  messagesRef?: firebase.database.Reference;
  channel?: IChannelArray;
  user?: IUser;
  usersRef?: firebase.database.Reference;
  messages?: IMessage[];
  messagesLoading?: boolean;
  numUniqueUsers?: string;
  searchTerm?: string;
  searchLoading?: boolean;
  searchResult?: IMessage[];
  privateMessagesRef?: firebase.database.Reference;
  isChannelStarred?: boolean;
  typingRef?: firebase.database.Reference;
  typingUsers?: { id: string; name: any }[];
  connectedRef?: firebase.database.Reference;
  listeners: { id: string; ref: any; event: string }[];
}

export interface IPropsMessageForm {
  messagesRef: firebase.database.Reference;
  currentChannel: IChannelArray;
  currentUser: IUser;
  privateChannel: boolean;
  getMessagesRef: () => firebase.database.Reference;
}
export interface IStateMessageForm {
  message?: string;
  loading?: boolean;
  channel?: IChannelArray;
  user?: IUser;
  errors?: Array<any>;
  modal?: boolean;
  uploadState?: string;
  uploadTask?: any;
  storageRef?: firebase.storage.Reference;
  percentUploaded?: number;
  emojiPicker?: boolean;
  typingRef?: firebase.database.Reference;
}
export interface IEmoji {
  colons: string;
  emoticons: string[];
  id: string;
  name: string;
  native: string;
  short_names: string[];
  skin: any;
  unified: string;
}

export interface IMessagesOwnProp {
  currentChannel?: IChannelArray;
  currentUser?: IUser;
  isPrivateChannel?: boolean;
}
export interface IMessageReduxProps {
  setUserPosts: (userPost: any) => void;
}
export type IMessagesProp = IMessagesOwnProp & IMessageReduxProps;
export interface IMessage {
  timestamp: any;
  content?: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  image?: string;
}
export interface IUserPosts {
  avatar: string;
  count: number;
}

export interface IPropsForMessage {
  key: any;
  message: IMessage;
  user: IUser;
}
export interface IFileModalProps {
  modal: boolean;
  closeModal: () => void;
  uploadFile: (file: IFileModalFile, metaData: any) => void;
}

export interface IFileModalState {
  file?: IFileModalFile;
  authorized?: String[];
}

export interface IFileModalFile {
  name?: string;
  lastModified?: number;
  lastModifiedDate?: any;
  webkitRelativePath?: string;
  size?: number;
  type?: number;
}
export interface IFileModalMetaData {
  contentType: string;
}

export interface IPropsProgressBar {
  uploadState: string;
  percentUploaded: number;
}

export interface IMessageHeaderProp {
  channelName?: any;
  handleSearchChange?: any;
  numUniqueUsers?: string;
  searchLoading: boolean;
  privateChannel?: boolean;
  handleStar?: () => void;
  isChannelStar?: boolean;
}
