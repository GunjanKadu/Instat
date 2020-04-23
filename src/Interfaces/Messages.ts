import { IChannelArray } from './SidePanel';
import { IUser } from './Auth';

export interface IStateMessage {
  messagesRef?: firebase.database.Reference;
  channel?: IChannelArray;
  user?: IUser;
  messages?: IMessage[];
  messagesLoading?: boolean;
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
  modal?: boolean;
}

export interface IMessagesProp {
  currentChannel?: IChannelArray;
  currentUser?: IUser;
}

export interface IMessage {
  timestamp: any;
  content: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface IPropsForMessage {
  key: any;
  message: IMessage;
  user: IUser;
}
export interface IFileModalProps {
  modal: boolean;
  closeModal: () => void;
}
