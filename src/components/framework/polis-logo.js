/*
 * Copyright 2012-present, Polis Technology Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights for non-commercial use can be found in the PATENTS file
 * in the same directory.
 */

import React from "react";
import Radium from "radium";
import _ from "lodash";
import Flex from "./flex";

const styles = {
  link: {
    textDecoration: "none",
    cursor: "pointer",
    color: "white",
    fontSize: 24,
    margin: "15px 0px"
  }
};

@Radium
class PolisLogo extends React.Component {

  render() {
    return (
      <Flex
        styleOverrides={this.props.containerStyle}
        align="center" >
        <div style={{
          width: 12,
          height: 12,
          marginRight: 6,
          position: "relative", top: 3,
          borderRadius: 20,
          backgroundColor: "rgba(255,255,255,1)"}}>
        </div>
        <div style={{
          width: 16,
          height: 16,
          marginRight: 6,
          position: "relative", top: 3,
          borderRadius: 20,
          backgroundColor: "rgba(255,255,255,1)"}}>
        </div>
        <div style={{
          width: 8,
          height: 8,
          marginRight: 6,
          position: "relative", top: 3,
          borderRadius: 20,
          backgroundColor: "rgba(255,255,255,1)"}}>
        </div>
        <a style={styles.link} href="http://pol.is">
            pol.is
        </a>
      </Flex>
    );
  }
}

export default PolisLogo;
