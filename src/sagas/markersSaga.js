// @flow
import { takeLatest, put, call } from "redux-saga/effects";
import {
  FETCH_MARKERS_START,
  ADD_MARKER_START,
  DELETE_MARKER_START,
  fetchAllMarkersSuccess,
  fetchAllMarkersFailed,
  addMarkerSuccess,
  addMarkerFailed,
  deleteMarkerSuccess,
  deleteMarkerFailed,
  fetchMarkerSuccess
} from "../actions";
import * as markersService from "../services/googleMap/markers/markersService";

export default function* markersSaga(): GeneratorType {
  yield takeLatest(FETCH_MARKERS_START, getAllMarkers);
  yield takeLatest(ADD_MARKER_START, addMarker);
  yield takeLatest(DELETE_MARKER_START, deleteMarker);
}

function* getAllMarkers() {
  try {
    const markers = yield call(markersService.getAllMarkers);
    yield put(fetchAllMarkersSuccess(markers));
  } catch (e) {
    console.log(e);
    yield put(fetchAllMarkersFailed(e.message));
  }
}

function* addMarker(action) {
  const { marker } = action.payload;
  try {
    const newMarker = yield call(markersService.addMarker, marker);
    yield put(addMarkerSuccess());
    yield put(fetchMarkerSuccess(newMarker));
  } catch (e) {
    yield put(addMarkerFailed(e.message));
  }
}

function* deleteMarker(action) {
  const { _id } = action.payload;
  try {
    yield call(markersService.deleteMarker, _id);
    yield put(deleteMarkerSuccess(_id));
  } catch (e) {
    yield put(deleteMarkerFailed(e.message));
  }
}
