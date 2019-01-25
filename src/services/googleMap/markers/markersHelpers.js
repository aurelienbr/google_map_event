export function handleMarkerError(error) {
  let errorMessage: string = "";
  try {
    if (error.code === 401)
      errorMessage = "app.form.login.error.badcredentials";
    if (error.message === "Network Error")
      errorMessage = "app.form.login.error.internet";
  } catch (e) {
    throw new Error(error);
  }
  throw new Error(error);
}

export function handleAddMarker(marker) {
  const newMarker = { ...marker, createdAt: new Date(marker.createdAt) };
  return newMarker;
}

export function handleAllMarkersFind(markers) {
  const newMarkers = markers.data.map(({ createdAt, ...others }) => ({
    createdAt: new Date(createdAt),
    ...others
  }));
  return newMarkers;
}
