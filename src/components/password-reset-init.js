import InputField from "material-ui/lib/text-field";
import React from "react";
import { connect } from "react-redux";
import { doPasswordResetInit } from "../actions";
import Radium from "radium";
import Flex from "./framework/flex";
import Button from "./framework/generic-button";
import Awesome from "react-fontawesome";
import StaticContentContainer from "./framework/static-content-container";

const styles = {
  heading: {
    fontSize: 36,
    display: "block",
    margin: 0,
  },
  card: {
    position: "relative",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,.3)",
    padding: 30,
    borderRadius: 3,
    color: "white"
  },
  button: {
    backgroundColor: "cornflowerblue",
  },
  input: {
    display: "block",
    margin: "20px 0px",
    color: "rgb(100,100,100)",
    fontSize: 14,
    padding: 7,
    borderRadius: 3,
    border: "1px solid rgba(240,240,240,1)",
  },
}

@connect()
@Radium
class PasswordResetInit extends React.Component {

  handleClick(e) {

    e.preventDefault();

    const attrs = {
      email: this.refs.email.value,
    };

    this.props.dispatch(doPasswordResetInit(attrs));
  }

  render() {
    return (
      <StaticContentContainer>
        <Flex>
          <div style={styles.card}>
              <p style={styles.heading}> Password Reset</p>
            <form>
              <input
                style={styles.input}
                ref="email"
                placeholder="email"
                type="text"/>
              <Button style={styles.button} onClick={this.handleClick.bind(this)}>
                Send password reset email
              </Button>
            </form>
          </div>
        </Flex>
      </StaticContentContainer>
    );
  }
}

export default PasswordResetInit;
