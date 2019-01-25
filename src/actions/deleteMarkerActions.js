export const DELETE_MARKER_START = "DELETE_MARKER_START";
export const DELETE_MARKER_SUCCESS = "DELETE_MARKER_SUCCESS";
export const DELETE_MARKER_FAILURE = "DELETE_MARKER_FAILURE";

export function deleteMarker(_id) {
  return {
    type: DELETE_MARKER_START,
    payload: { _id }
  };
}

export function deleteMarkerSuccess(_id) {
  return {
    type: DELETE_MARKER_SUCCESS,
    payload: { _id }
  };
}

export function deleteMarkerFailed() {
  return {
    type: DELETE_MARKER_FAILURE
  };
}
