import { IChannelArray } from './SidePanel';

export interface IMetaState {
  activeIndex?: number;
  privateChannel?: boolean;
  channel?: IChannelArray;
}
export interface IMetaProps {
  isPrivateChannel?: boolean;
  currentChannel?: IChannelArray;
}
