import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PollOverview from "./PollOverview";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing.unit * 8,
    alignItems: "stretch"
    // height:'100%',
    // width:'100%',
  },
  paper: {
    display: "flex",
    flexDirection: "column"
    // height:'100%'
  },
  tab: {
    paddingRight: 40,
    paddingLeft: 40
  },
  ul: {
    listStyleType: "none",
    paddingRight: 40
  }
});

class Home extends Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, authedUser, questions, users } = this.props;

    return (
      <div className={classes.container}>
        <Paper square className={classes.paper}>
          <Tabs
            className={classes.tab}
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
          >
            <Tab label="Unanswered Questions" />
            <Tab label="Answered Questions" />
          </Tabs>
          <ul className={classes.ul}>
            {Object.keys(questions)
              .filter(
                quesId =>
                  this.state.value === 0
                    ? !isAnsweredQuestion(quesId, users[authedUser].answers)
                    : isAnsweredQuestion(quesId, users[authedUser].answers)
              )
              .map(quesId => (
                <li key={quesId}>
                  <PollOverview questionId={quesId} />
                </li>
              ))}
          </ul>
        </Paper>
      </div>
    );
  }
}

function isAnsweredQuestion(questionId, answeredQuestionsObj) {
  return Object.keys(answeredQuestionsObj).includes(questionId);
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Home));
