import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { isAnsweredQuestion } from "../utils/helpers";
import authedUser from "../reducers/authedUser";
import PollResult from "./PollResult";
import AnswerPoll from "./AnswerPoll";

class PollDetail extends Component {
  render() {
    const { isAnsweredQuestion, questionId } = this.props;

    if (isAnsweredQuestion) {
      return <PollResult questionId={questionId} />;
    }
    return <AnswerPoll questionId={questionId} />;
  }
}

function mapStateToProps({ authedUser, users }, { match }) {
  return {
    questionId: match.params.question_id,
    isAnsweredQuestion: isAnsweredQuestion(
      match.params.question_id,
      users[authedUser]
    )
  };
}
export default connect(mapStateToProps)(withStyles()(PollDetail));
