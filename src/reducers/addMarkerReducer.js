import {
  ADD_MARKER_START,
  ADD_MARKER_SUCCESS,
  ADD_MARKER_FAILURE
} from "../actions";

import {
  STATUS_START,
  STATUS_LOADING,
  STATUS_FAILURE,
  STATUS_SUCCESS
} from "../constants/statusConstants";

const initialState = {
  status: STATUS_START
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MARKER_START:
      return {
        ...state,
        status: STATUS_LOADING
      };
    case ADD_MARKER_SUCCESS:
      return {
        ...state,
        status: STATUS_SUCCESS
      };
    case ADD_MARKER_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE
      };
    default:
      return state;
  }
}
