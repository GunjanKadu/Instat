/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github //github.com/GunjanKadu
 * @date   2020-04-30 17:23:34
 *
 */

import * as actionTypes from '../Actions/types';
import * as I from '../../Interfaces/Reducer';
import { IActionColor } from '../../Interfaces/Action';

const initialState: I.IColorState = {
  primaryColor: '',
  secondaryColor: '',
};

export const colorReducer = (
  state: I.IColorState = initialState,
  action: IActionColor
): I.IColorState => {
  switch (action.type) {
    case actionTypes.SET_COLORS:
      return {
        primaryColor: action.payload.primary,
        secondaryColor: action.payload.secondary,
      };

    default:
      return state;
  }
};
