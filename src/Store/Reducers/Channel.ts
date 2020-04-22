import * as actionTypes from '../Actions/types';
import * as I from '../../Interfaces/Reducer';
import { IActionChannel } from '../../Interfaces/Action';

const initialState: I.IChannel = {
  currentChannel: null,
};

export const channelReducer = (
  state: I.IChannel = initialState,
  action: IActionChannel
): I.IChannel => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };

    default:
      return state;
  }
};
