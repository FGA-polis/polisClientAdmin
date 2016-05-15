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
import { connect } from "react-redux";
import Radium from "radium";
import _ from "lodash";
import Flex from "./flex";
import Awesome from "react-fontawesome";
import {Link} from "react-router";
import PolisLogo from "./polis-logo";

@connect()
@Radium
class Header extends React.Component {
  styles () {
    return {
      topBar: {
        width: "100%",
        // height: 70,
        fontSize: 18,
        fontWeight: 400,
        color: "white",
        backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "rgba(0,0,0,.3)",
        zIndex: 10,
      }
    }
  }
  render() {
    return (
      <Flex
        justifyContent={"space-between"}
        styleOverrides={this.styles().topBar}>
        <PolisLogo containerStyle={{marginLeft: 20}}/>
          <Link style={{
              textDecoration: "none", color: "white", marginRight: 20
            }} to={"signin"}>Sign In</Link>
      </Flex>
    );
  }
}

export default Header;
