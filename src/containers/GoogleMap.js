import React from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { API_KEY, ZOOM } from "../constants/googleMap";
import { selectMarker } from "../actions";

class GoogleMap extends React.Component {
  renderMarkers = (map, maps) => {
    const { markers } = this.props;
    markers.map(marker => {
      const google_map_marker = new maps.Marker({
        position: {
          lat: marker.coordinate.latitude,
          lng: marker.coordinate.longitude
        },
        title: marker.title,
        map,
        animation: maps.Animation.DROP
      });
      google_map_marker.addListener("click", () => {
        this.props.selectMarker(marker._id);
      });
      return google_map_marker;
    });
  };
  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={this.props.defaultCenter}
        center={this.props.center}
        defaultZoom={ZOOM}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
      />
    );
  }
}

GoogleMap.propTypes = {
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      coordinate: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
      }),
      createdAt: PropTypes.instanceOf(Date).isRequired
    })
  ).isRequired,
  defaultCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectMarker: PropTypes.func.isRequired
};

const mapStateToProps = ({ googlemap }) => ({
  center: googlemap.center,
  defaultCenter: googlemap.defaultCenter,
  markers: googlemap.markers
});

export default connect(
  mapStateToProps,
  { selectMarker }
)(GoogleMap);
