import React from "react";
import { connect } from "react-redux";
import Radium from "radium";
import _ from "lodash";
import Awesome from "react-fontawesome";
import {Link} from "react-router";
import MaterialTitlePanel from "./material-title-panel-sidebar";
import SidebarItem from "./sidebar-item";

const styles = {
  sidebar: {
    width: 256,
    height: "100%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px 16px 16px",
    color: "#757575",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575"
  },
  content: {
    height: "100%",
    backgroundColor: "white"
  }
};

@Radium
class SidebarContentConversation extends React.Component {

  handleClick() {
    if (this.props.onSidebarItemClicked) {
      this.props.onSidebarItemClicked();
    }
  }

  render() {
    return (
      <MaterialTitlePanel
        showHamburger={false}
        title={"Pol.is/"+this.props.conversation_id}
        style={this.props.style ? {...styles.sidebar, ...this.props.style} : styles.sidebar}>
        <div style={styles.content} onClick={this.handleClick.bind(this)}>
          <SidebarItem
            to="/"
            selected={false}
            icon="chevron-left"
            text="All Conversations"/>
          <SidebarItem
            to={"/m/"+this.props.conversation_id}
            selected={this.props.routes[2] && !this.props.routes[2].path}
            icon="gears"
            text="Configure"/>
          <SidebarItem
            to={"/m/"+this.props.conversation_id+"/live"}
            selected={this.props.routes[2] && this.props.routes[2].path === "live"}
            icon="heartbeat"
            text="See it"/>
          <SidebarItem
            to={"/m/"+this.props.conversation_id+"/share"}
            selected={this.props.routes[2] && this.props.routes[2].path === "share"}
            icon="code"
            text="Share & Embed"/>
          <SidebarItem
            to={"/m/"+this.props.conversation_id+"/comments"}
            selected={this.props.routes[2] && this.props.routes[2].path === "comments"}
            icon="comments"
            text="Comments"/>
          <SidebarItem
            to={"/m/"+this.props.conversation_id+"/participants"}
            selected={this.props.routes[2] && this.props.routes[2].path === "participants"}
            icon="users"
            text="Participants"/>
          <SidebarItem
            to={"/m/"+this.props.conversation_id+"/summary"}
            selected={this.props.routes[2] && this.props.routes[2].path === "summary"}
            icon="list-alt"
            text="Summary"/>
          <SidebarItem
            to={"/m/"+this.props.conversation_id+"/stats"}
            selected={this.props.routes[2] && this.props.routes[2].path === "stats"}
            icon="area-chart"
            text="Stats"/>
          <SidebarItem
            to={"/m/"+this.props.conversation_id+"/export"}
            selected={this.props.routes[2] && this.props.routes[2].path === "export"}
            icon="cloud-download"
            text="Data Export"/>
          <div style={styles.divider} />
          <a style={styles.sidebarLink} target="blank" href="http://docs.pol.is">
            <Awesome name="align-left"/><span style={{marginLeft: 10}}>Docs</span>
          </a>
          <a style={styles.sidebarLink} target="blank" href="https://twitter.com/UsePolis">
            <Awesome style={{color: "#4099FF"}} name="twitter"/><span style={{marginLeft: 10}}>@UsePolis</span>
          </a>
          <Link
            style={styles.sidebarLink}
            to={"/signout"}>
            <Awesome name="sign-out"/>
            <span style={{marginLeft: 10}}>Sign Out</span>
          </Link>
        </div>
      </MaterialTitlePanel>
    );
  }
}

export default SidebarContentConversation;

// <p>
//   <Link to="/">
//     <Awesome name="chevron-left" style={{fontSize: 24, cursor: "pointer"}}/>
//     <Awesome name="home" style={{fontSize: 24, cursor: "pointer"}}/>
//   </Link>
// </p>
// <h3 style={{marginRight: 10}}>
//   Conversation Admin
// </h3>
// <a
//   href={"https://pol.is/"+this.props.conversation_id}
//   target="_blank">
//   {"pol.is/"+this.props.conversation_id}
// </a>
