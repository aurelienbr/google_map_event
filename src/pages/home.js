import React, { Component } from "react";
import { Container, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchMarkers, addMarker } from "../actions";

import Header from "../containers/Header";
import GoogleMap from "../containers/GoogleMap";
import ListMarkers from "../containers/ListMarkers";
import AddMarkers from "../containers/AddMarkers";

class Home extends Component {
  state = {
    isModalOpen: false
  };
  componentDidMount() {
    this.props.fetchMarkers();
  }
  handleAddMarkerModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  handleAddMarkerButton = marker => {
    this.props.addMarker(marker);
  };
  render() {
    return (
      <Container style={styles.container}>
        <Header />
        <Divider />
        <Container style={styles.containerMain}>
          <Container style={styles.columnMap}>
            <GoogleMap />
          </Container>
          <Container style={styles.columnList}>
            <ListMarkers />
          </Container>
        </Container>
        <AddMarkers
          closeModal={this.closeModal}
          isOpen={this.state.isModalOpen}
          addMarker={this.handleAddMarkerButton}
        />
        <Button
          style={styles.addEventButton}
          onClick={this.handleAddMarkerModal}
        >
          Add an event
        </Button>
      </Container>
    );
  }
}

Home.propTypes = {
  fetchMarkers: PropTypes.func.isRequired,
  addMarker: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired
};

const styles = {
  container: {
    width: "90%",
    height: 600,
    display: "flex",
    flexDirection: "column"
  },
  addEventButton: {
    alignSelf: "center",
    marginTop: 20,
    width: "100%"
  },
  containerMain: {
    display: "flex",
    height: "100%"
  },
  columnMap: {
    flex: 1,
    height: "100%"
  },
  columnList: {
    flex: 1,
    height: "100%",
    overflow: "scroll",
    overflowX: "hidden"
  }
};

const mapStateToProps = ({ googlemap }) => ({
  status: googlemap.status
});

export default connect(
  mapStateToProps,
  { fetchMarkers, addMarker }
)(Home);
