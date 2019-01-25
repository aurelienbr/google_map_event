import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Container, List, Icon, Input } from "semantic-ui-react";
import PropTypes from "prop-types";

import ListMarker from "../components/ListMarker";

import { sortMarkersByDates, deleteMarker, changeLocation } from "../actions";
import {
  IS_ORDERED_CROISSANT,
  IS_ORDERED_DECROISSANT
} from "../constants/orderDate";

class ListMarkers extends PureComponent {
  state = {
    isIconHovering: false,
    markers: [],
    _markers: [],
    isOrdered: IS_ORDERED_DECROISSANT
  };

  componentDidUpdate(prevProps) {
    if (this.props.markers !== prevProps.markers) {
      // TODO compare by reference
      this.setState({
        markers: this.sortMarkers(this.props.markers),
        _markers: this.sortMarkers(this.props.markers)
      });
    }
    if (prevProps.markerSelected !== this.props.markerSelected) {
      this.scrollToThisMarker();
    }
  }
  handleOverIcon = () => {
    this.setState({
      isIconHovering: !this.state.isIconHovering
    });
  };

  sortMarkers(markers) {
    return markers.sort((a, b) =>
      a.createdAt.getTime() > b.createdAt.getTime()
        ? this.state.isOrdered === IS_ORDERED_DECROISSANT
          ? -1
          : 1
        : a.createdAt.getTime() === b.createdAt.getTime()
        ? 0
        : this.state.isOrdered === IS_ORDERED_DECROISSANT
        ? 1
        : -1
    );
  }
  handleIconOnPress = () => {
    const { markers, isOrdered } = this.state;
    this.setState({
      markers: this.sortMarkers(markers),
      isOrdered:
        isOrdered === IS_ORDERED_CROISSANT
          ? IS_ORDERED_DECROISSANT
          : IS_ORDERED_CROISSANT
    });
  };
  handleInputChange = e => {
    const _markers = this.state._markers.filter(marker =>
      marker.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (_markers !== this.state._markers) {
      this.setState({
        markers: _markers
      });
    }
  };
  handleDeleteMarker = (_id, e) => {
    this.props.deleteMarker(_id);
  };
  handleOnClickList = coordinate => {
    const center = [coordinate.latitude, coordinate.longitude];
    this.props.changeLocation(center);
  };
  scrollToThisMarker = _id => {};
  render() {
    const { markers, isIconHovering } = this.state;
    const { markerSelected } = this.props;
    const sizeIcon = isIconHovering ? "big" : "large";
    return (
      <Container>
        <Container style={styles.headerContainer}>
          <div style={styles.containerIcon}>
            <Icon
              className="iconSorting"
              name="sort"
              onClick={this.handleIconOnPress}
              onMouseEnter={this.handleOverIcon}
              onMouseLeave={this.handleOverIcon}
              size={sizeIcon}
              style={styles.icon}
            />
          </div>
          <Input onChange={this.handleInputChange} placeholder="Search..." />
        </Container>
        <List divided verticalAlign="middle">
          {markers.map(marker => {
            const minutesHours = `${marker.createdAt.getHours()}h${marker.createdAt.getMinutes()}`;

            return (
              <ListMarker
                key={marker._id}
                markerSelected={markerSelected}
                marker={marker}
                minutesHours={minutesHours}
                deleteMarker={this.handleDeleteMarker}
                handleOnClickList={this.handleOnClickList}
              />
            );
          })}
        </List>
      </Container>
    );
  }
}

ListMarkers.propTypes = {
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
  markerSelected: PropTypes.number.isRequired,
  sortMarkersByDates: PropTypes.func.isRequired,
  deleteMarker: PropTypes.func.isRequired,
  changeLocation: PropTypes.func.isRequired
};

const styles = {
  date: {
    width: "20%",
    fontSize: 10
  },
  headerContainer: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  containerIcon: {
    height: 30,
    width: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

const mapStateToProps = ({ googlemap }) => ({
  markers: googlemap.markers,
  markerSelected: googlemap.markerSelected
});

export default connect(
  mapStateToProps,
  { sortMarkersByDates, deleteMarker, changeLocation }
)(ListMarkers);
