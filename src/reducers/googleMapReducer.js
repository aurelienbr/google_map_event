import {
  FETCH_MARKERS_START,
  FETCH_MARKERS_SUCCESS,
  SORT_MARKERS_BY_DATES,
  FETCH_MARKERS_FAILURE,
  FETCH_MARKER_SUCCESS,
  DELETE_MARKER_SUCCESS,
  CHANGE_GOOGLE_MAP_LOCATION,
  SELECT_MARKER
} from "../actions";

import {
  STATUS_START,
  STATUS_LOADING,
  STATUS_FAILURE,
  STATUS_SUCCESS
} from "../constants/statusConstants";

const initialState = {
  center: [37.78825, -122.4324],
  defaultCenter: [37.78825, -122.4324],
  status: STATUS_START,
  markers: [],
  markerSelected: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MARKERS_START:
      return {
        ...state,
        status: STATUS_LOADING
      };
    case SELECT_MARKER: {
      return {
        ...state,
        markerSelected: action.payload._id
      };
    }
    case CHANGE_GOOGLE_MAP_LOCATION: {
      return {
        ...state,
        center: action.payload.center
      };
    }
    case FETCH_MARKERS_SUCCESS:
      return {
        ...state,
        markers: action.payload.data,
        status: STATUS_SUCCESS
      };
    case FETCH_MARKERS_FAILURE:
      return {
        ...state,
        status: STATUS_FAILURE
      };
    case SORT_MARKERS_BY_DATES:
      return { ...state };
    case FETCH_MARKER_SUCCESS:
      const { marker } = action.payload;
      return {
        ...state,
        markers: [marker, ...state.markers]
      };
    case DELETE_MARKER_SUCCESS:
      const markersAfterDelete = state.markers.filter(function(marker) {
        return marker._id !== action.payload._id;
      });
      return {
        ...state,
        markers: markersAfterDelete
      };
    default:
      return state;
  }
}
