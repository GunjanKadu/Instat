import * as actionTypes from '../Actions/types';
import * as I from '../../Interfaces/UserReducer';
import { IAction } from '../../Interfaces/Action';

const initialState: I.IUserState = {
  currentUser: null,
  isLoading: true,
};

export const userReducer = (
  state: I.IUserState = initialState,
  action: IAction
): I.IUserState => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload,
        isLoading: false,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
