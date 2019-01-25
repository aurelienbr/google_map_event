import React from "react";
import { List, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import TextEllipsis from "react-text-ellipsis";

const ListMarker = ({
  marker,
  markerSelected,
  minutesHours,
  deleteMarker,
  handleOnClickList
}) => (
  <List.Item
    className={`pointer ${markerSelected === marker._id && "markerSelected"}`}
    key={marker._id}
    onClick={e => handleOnClickList(marker.coordinate)}
    style={styles.listContainer}
  >
    <List.Content>
      <List.Header as="a">{marker.title}</List.Header>
      <List.Description style={styles.listDescription}>
        <TextEllipsis
          lines={3}
          tag={"p"}
          ellipsisChars={"..."}
          style={styles.description}
          debounceTimeoutOnResize={200}
          useJsOnly={true}
        >
          {marker.description}
        </TextEllipsis>
        <p style={styles.date}>
          {marker.createdAt.toLocaleDateString()} à {minutesHours}
        </p>
        <Icon
          onClick={e => deleteMarker(marker._id, e)}
          className="pointer"
          name="delete"
          size="large"
        />
      </List.Description>
    </List.Content>
  </List.Item>
);

ListMarker.propTypes = {
  marker: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coordinate: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }),
    createdAt: PropTypes.instanceOf(Date).isRequired
  }),
  markerSelected: PropTypes.number.isRequired,
  minutesHours: PropTypes.string.isRequired,
  deleteMarker: PropTypes.func.isRequired,
  handleOnClickList: PropTypes.func.isRequired
};

const styles = {
  listContainer: {
    margin: 10,
    overflow: "hidden"
  },
  listDescription: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0
  },
  description: {
    width: "80%",
    paddingRight: 10,
    textAlign: "justify",
    marginTop: 10
  }
};

export default ListMarker;
