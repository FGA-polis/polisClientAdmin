import React from "react";
import Radium from "radium";
import _ from "lodash";
import Flex from '../framework/Flex';
import { connect } from "react-redux";
import {
  populateCommentsStore,
  populateMathStore,
  populateParticipantsStore
} from "../../actions";
import Comment from "./summary-comment";
import SummaryStats from "./summary-stats";
import Consensus from "./summary-consensus";
import Groups from "./summary-groups";

@connect((state) => {
  return {
    comments: state.comments,
    math: state.math,
    participants: state.participants
  };
})
@Radium
class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static propTypes = {
    /* react */
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    routes: React.PropTypes.array,
    /* component api */
    style: React.PropTypes.object,
    math: React.PropTypes.object,
    comments: React.PropTypes.object
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"
  }
  componentWillMount() {
    this.props.dispatch(populateCommentsStore(this.props.params.conversation_id));
    this.props.dispatch(populateMathStore(this.props.params.conversation_id));
    this.props.dispatch(populateParticipantsStore(this.props.params.conversation_id));
  }
  getStyles() {
    return {
      card: {
        margin: "10px 20px 10px 20px",
        backgroundColor: "rgb(253,253,253)",
        borderRadius: 3,
        padding: 10,
        WebkitBoxShadow: "3px 3px 6px -1px rgba(220,220,220,1)",
        BoxShadow: "3px 3px 6px -1px rgba(220,220,220,1)"
      },
      innerContent: {
        maxWidth: 600,
        lineHeight: 1.6
      }
    };
  }
  render() {
    const styles = this.getStyles();
    const comments = this.props.comments.comments;
    const math = this.props.math.math;
    return (
      <Flex styleOverrides={styles.card}>
        <Flex styleOverrides={styles.innerContent}>
          {this.props.math.loading || this.props.comments.loading ? "Loading summary... " : ""}
          {this.props.math.error || this.props.comments.error ? "Error loading summary" : ""}
          {
            !this.props.math.loading && !this.props.comments.loading ?
              <span>
                <SummaryStats {...this.props}/>
                <Consensus {...this.props}/>
                <Groups {...this.props}/>
              </span> :
            ""
          }
        </Flex>
      </Flex>
    );
  }
}

export default Summary;
