// @flow
import { combineReducers } from "redux";

import googlemap from "./googleMapReducer";
import addmarker from "./addMarkerReducer";

export default combineReducers({
  googlemap,
  addmarker
});
