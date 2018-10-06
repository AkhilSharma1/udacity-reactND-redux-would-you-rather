import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PollOverview from "./PollOverview";
import { Redirect } from 'react-router-dom';
import { isAnsweredQuestion } from '../utils/helpers';

const styles = theme => ({
  paper: {
    display: "flex",
    flexDirection: "column"
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
    if(!authedUser)
      return (<Redirect to='/login'/>)

    return (
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
                    ? !isAnsweredQuestion(quesId, users[authedUser])
                    : isAnsweredQuestion(quesId, users[authedUser])
              )
              .map(quesId => (
                <li key={quesId}>
                  <PollOverview questionId={quesId} />
                </li>
              ))}
          </ul>
        </Paper>
    );
  }
}


function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Home));
