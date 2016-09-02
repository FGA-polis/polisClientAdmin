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
import { handleSeedCommentTweetSubmit, seedCommentTweetChanged } from "../../actions";
import Radium from "radium";
import _ from "lodash";
import Button from "../framework/generic-button";
import strings from "../../strings/strings";

const styles = {
  card: {
    margin: "10px 20px 10px 20px",
    backgroundColor: "rgb(253,253,253)",
    borderRadius: 3,
    padding: 10,
    WebkitBoxShadow: "3px 3px 6px -1px rgba(220,220,220,1)",
    BoxShadow: "3px 3px 6px -1px rgba(220,220,220,1)"
  },
}

@connect(state => state.seed_comments_tweet)
@Radium
class ModerateCommentsSeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorDialogue: false,
      showSuccessDialogue: false
    };
  }
  handleSubmitSeed () {
    var val = this.refs.seed_form_tweet.value;
    var match = val && val.match(/[a-zA-Z0-9]+$/);
    var tweet_id = "";
    if (match && match.length) {
      tweet_id = match[0];
    }

    const o = {
      twitter_tweet_id: tweet_id,
      conversation_id: this.props.params.conversation_id,
      vote: -1, // the tweeter of the tweet will auto-agree. An account will be created for them if needed.
      is_seed: true
    }
    this.props.dispatch(handleSeedCommentTweetSubmit(o))
  }
  handleTextareaChange(e) {
    this.props.dispatch(seedCommentTweetChanged(e.target.value));
  }
  handleKey(e) {
    if (e.charCode == 13) {
      e.preventDefault();
      this.handleSubmitSeed();
    }
  }
  getButtonText() {
    let text = "Submit";

    if (this.props.success) {
      text = "Success!";
    }

    if (this.props.loading) {
      text = "Saving...";
    }

    return text;
  }
  render() {
    if (this.props.error) {
      console.dir();
    }
    return (
      <div style={styles.card}>
        <p style={{
          marginTop: 5,
          fontSize: 16
        }}> Paste in a Tweet URL. It will be imported for participants to vote on. </p>
        <div onKeyPress={this.handleKey.bind(this)}>
          <textarea
            value={this.props.seedTweetText}
            onChange={this.handleTextareaChange.bind(this)}
            rows="1"
            maxLength="200"
            style={{
              width: "100%",
              maxWidth: 400,
              resize: "none",
              border: "1px solid lightgrey",
              marginBottom: 15,
              borderRadius: 3,
              fontSize: 16,
              padding: 10
            }}
            ref="seed_form_tweet"/>
        </div>
        <div>
          <Button
            style={{
              backgroundColor: "#03a9f4",
              color: "white",
            }}
            onClick={this.handleSubmitSeed.bind(this)}>
            {this.getButtonText()}
          </Button>
        </div>
        {this.props.error ? <div>{strings(this.props.error)}</div> : ""}
      </div>
    );
  }
}

export default ModerateCommentsSeed;

/*
  todo
    handle all validation niceties
    seed tweet
*/
