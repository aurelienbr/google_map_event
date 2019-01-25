import React from "react";
import { Message, Button, Input, TextArea, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  STATUS_LOADING,
  STATUS_FAILURE,
  STATUS_SUCCESS
} from "../constants/statusConstants";
import Autocomplete from "react-google-autocomplete";
import Modal from "react-modal";

class AddMarkers extends React.Component {
  state = {
    title: "",
    description: "",
    coordinate: {
      latitude: 0,
      longitude: 0
    },
    formatted_address: "",
    name: "",
    error: {
      title: "",
      description: "",
      location: ""
    }
  };
  handleOnPlaceSelected = place => {
    this.setState(prevState => ({
      coordinate: {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      },
      formatted_address: place.formatted_address,
      name: place.name,
      error: {
        ...prevState.error,
        location: ""
      }
    }));
  };
  handleOnTitleChange = e => {
    this.setState({
      title: e.target.value,
      error: {
        ...this.state.error,
        title: ""
      }
    });
  };
  handleOnDescriptionChange = e => {
    this.setState({
      description: e.target.value,
      error: {
        ...this.state.error,
        description: ""
      }
    });
  };
  validate = (title, description, name) => {
    let validate = true;
    if (title === "") {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          title: "The title of the event must not be empty"
        }
      }));
      validate = false;
    }
    if (description === "") {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          description: "The description must not be empty"
        }
      }));
      validate = false;
    }
    if (name === "") {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          location: "The location must not be empty"
        }
      }));
    }
    return validate;
  };
  handleAddMarker = () => {
    const {
      title,
      description,
      coordinate,
      formatted_address,
      name
    } = this.state;
    const isValidate = this.validate(title, description, name);
    if (isValidate) {
      const marker = {
        title,
        description,
        coordinate,
        formatted_address,
        name
      };
      this.props.addMarker(marker);
    }
  };
  render() {
    return (
      <Modal onRequestClose={this.props.closeModal} isOpen={this.props.isOpen}>
        <Form style={styles.container}>
          <Input
            onChange={this.handleOnTitleChange}
            placeholder="Title"
            style={styles.input}
          />
          {this.state.error.title !== "" && (
            <Message negative>{this.state.error.title}</Message>
          )}
          <TextArea
            onChange={this.handleOnDescriptionChange}
            placeholder="Tell us more"
            style={styles.input}
          />
          {this.state.error.description !== "" && (
            <Message negative>{this.state.error.description}</Message>
          )}
          <Autocomplete
            style={styles.input}
            className="ui input"
            onPlaceSelected={this.handleOnPlaceSelected}
            types={["address"]}
            componentRestrictions={{ country: "fr" }}
          />
          {this.state.error.location !== "" && (
            <Message negative>{this.state.error.location}</Message>
          )}
          {this.props.status === STATUS_SUCCESS && (
            <Message positive>Your marker as successful been added!</Message>
          )}
          {this.props.status === STATUS_FAILURE && (
            <Message negative>An error occured!</Message>
          )}
          <Button
            disabled={this.props.status === STATUS_LOADING}
            loading={this.props.status === STATUS_LOADING}
            style={styles.input}
            onClick={this.handleAddMarker}
          >
            Add your event!
          </Button>
        </Form>
      </Modal>
    );
  }
}

AddMarkers.propTypes = {
  status: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  addMarker: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

// <Message negative>{this.state.error.location}</Message>

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    marginTop: 20
  }
};

const mapStateToProps = ({ addmarker }) => ({
  status: addmarker.status
});

export default connect(mapStateToProps)(AddMarkers);
