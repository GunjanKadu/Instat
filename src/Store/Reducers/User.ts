import * as actionTypes from '../Actions/types';
import * as I from '../../Interfaces/UserReducer';
import { IAction } from '../../Interfaces/Action';

const initialState: I.IUserState = {
  current: null,
  isLoading: true,
};

export const userReducer = (
  state: I.IUserState = initialState,
  action: IAction
): I.IUserState => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        current: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
