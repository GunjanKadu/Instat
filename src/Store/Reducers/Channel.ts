/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:47:24
 *
 */

import * as actionTypes from '../Actions/types';
import * as I from '../../Interfaces/Reducer';
import { IActionChannel } from '../../Interfaces/Action';

const initialState: I.IChannel = {
  currentChannel: null,
  isPrivateChannel: false,
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
    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.payload,
      };

    default:
      return state;
  }
};
