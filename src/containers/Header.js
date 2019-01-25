import React from "react";
import { Container, Header as HeaderComponent } from "semantic-ui-react";

class Header extends React.Component {
  render() {
    return (
      <Container textAlign="center">
        <HeaderComponent style={styles.headerTitle} as={"h1"}>
          Best event in the world
        </HeaderComponent>
      </Container>
    );
  }
}

const styles = {
  headerTitle: {
    marginTop: 20
  }
};

export default Header;
