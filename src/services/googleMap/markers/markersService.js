// @flow
import { markers as MarkersService } from "../../api";
import {
  handleMarkerError,
  handleAllMarkersFind,
  handleAddMarker
} from "./markersHelpers";

export function getAllMarkers() {
  return MarkersService.find({
    query: {
      $limit: null
    }
  })
    .then(handleAllMarkersFind)
    .catch(handleMarkerError);
}

export function addMarker(marker) {
  return MarkersService.create(marker)
    .then(handleAddMarker)
    .catch(handleMarkerError);
}

export function deleteMarker(_id) {
  return MarkersService.remove(_id).catch(handleMarkerError);
}
