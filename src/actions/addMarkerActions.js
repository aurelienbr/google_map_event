export const ADD_MARKER_START = "ADD_MARKER_START";
export const ADD_MARKER_SUCCESS = "ADD_MARKER_SUCCESS";
export const ADD_MARKER_FAILURE = "ADD_MARKER_FAILURE";

export function addMarker(marker) {
  return {
    type: ADD_MARKER_START,
    payload: { marker }
  };
}

export function addMarkerSuccess() {
  return {
    type: ADD_MARKER_SUCCESS
  };
}

export function addMarkerFailed() {
  return {
    type: ADD_MARKER_FAILURE
  };
}
