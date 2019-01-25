export const FETCH_MARKERS_START = "GET_MARKERS_START";
export const FETCH_MARKERS_SUCCESS = "GET_MARKERS_SUCCESS";
export const FETCH_MARKERS_FAILURE = "GET_MARKERS_FAILURE";
export const FETCH_MARKER_SUCCESS = "FETCH_MARKER_SUCCESS";
export const SORT_MARKERS_BY_DATES = "SORT_MARKERS_BY_DATES";
export const CHANGE_GOOGLE_MAP_LOCATION = "CHANGE_GOOGLE_MAP_LOCATION";
export const SELECT_MARKER = "SELECT_MARKER";

export function fetchMarkers() {
  return {
    type: FETCH_MARKERS_START
  };
}

export function fetchMarkerSuccess(marker) {
  console.log(marker);
  return {
    type: FETCH_MARKER_SUCCESS,
    payload: { marker }
  };
}

export function fetchAllMarkersSuccess(data) {
  return {
    type: FETCH_MARKERS_SUCCESS,
    payload: { data } // just put data without payload ?
  };
}

export function fetchAllMarkersFailed(error) {
  return {
    type: FETCH_MARKERS_FAILURE,
    payload: { error }
  };
}

export function sortMarkersByDates() {
  return {
    type: SORT_MARKERS_BY_DATES
  };
}

export function changeLocation(center) {
  return {
    type: CHANGE_GOOGLE_MAP_LOCATION,
    payload: { center }
  };
}

export function selectMarker(_id) {
  return {
    type: SELECT_MARKER,
    payload: { _id }
  };
}
