// @flow

import { fork, spawn, all } from "redux-saga/effects";
import markersSaga from "./markersSaga";

export type GeneratorType = Generator<*, *, *>;

export default function*(): GeneratorType {
  yield fork(bootstrap);
}

function* bootstrap(): GeneratorType {
  try {
    yield all([spawn(markersSaga)]);
  } catch (e) {
    // @TODO
  }
}
