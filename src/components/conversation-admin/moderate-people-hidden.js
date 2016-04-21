import React from "react";
import { connect } from "react-redux";
import { changeParticipantStatusToFeatured } from '../../actions'
import Radium from "radium";
import _ from "lodash";
import Participant from "./participant";
import Spinner from "../framework/spinner";
import Flex from '../framework/flex';

const styles = {
  card: {
    margin: 20,
    backgroundColor: "rgb(253,253,253)",
    borderRadius: 3,
    padding: 10,
    WebkitBoxShadow: "3px 3px 6px -1px rgba(220,220,220,1)",
    BoxShadow: "3px 3px 6px -1px rgba(220,220,220,1)"
  },
  body: {
    fontWeight: 300,
  }
}

@connect(state => state.mod_ptpt_hidden)
@Radium
class ParticipantModerationHidden extends React.Component {
  onFeatureClicked(participant) {
    this.props.dispatch(changeParticipantStatusToFeatured(participant))
  }
  createParticipantMarkup() {
    return _.sortByOrder(this.props.hidden_participants, (p) => {
      return p.twitter ? p.twitter.followers_count : 0;
    }, ["desc"]).map((participant, i) => {
      return (
        <Participant
          participant={participant}
          featureButton
          featureClickHandler={this.onFeatureClicked.bind(this)}
          name={
            participant.facebook ?
            participant.facebook.fb_name :
            participant.twitter.name
          }
          key={i}/>
      )
    })
  }
  renderSpinner() {
    return (
      <Flex>
        <Spinner/>
        <span style={{
            marginLeft: 10,
            position: "relative",
            top: -2
          }}> Loading participants... </span>
      </Flex>
    )
  }
  render() {
    return (
      <div >
        <div style={styles.card}>
          <p style={styles.body}>
            {`These participants are not shown in the visualization, but their votes are still counted.
            They will still be shown to other participants who are their Facebook friends.`}
          </p>
        </div>
        {
          this.props.hidden_participants !== null ? this.createParticipantMarkup() : this.renderSpinner()
        }
      </div>
    );
  }
}

export default ParticipantModerationHidden;
