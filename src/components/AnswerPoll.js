import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    height: "auto",
    width: 500,
    alignItems: "stretch"
  },

  header: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing.unit
  },
  details: {
    display: "flex"
  },
  avatar: {
    margin: 10,
    width: 96,
    height: 96
  },
  userDetails: {
    display: "flex",
    flexDirection: "column"
  }
});
class AnswerPoll extends Component {
  handleSubmit = e => {
    e.preventDefault();
    // const { dispatch, authedUser } = this.props;
    // const { optionOneText, optionTwoText } = this.state;

    // dispatch(handleAddQuestion(authedUser, optionOneText, optionTwoText));
  };

  render() {
    const { question, askerName, avatarURL, questionId, classes } = this.props;
    return (
      <Paper className={classes.root}>
        <div className={classes.header}>
          <Typography variant="subheading">{askerName} asks:</Typography>
        </div>
        <div className={classes.details}>
          <Avatar alt={askerName} src={avatarURL} className={classes.avatar} />
          <div className={classes.userDetails}>
            <Typography variant="headline">Would You Rather ...</Typography>
            <form onSubmit={this.handleSubmit} >
            
            </form>
          </div>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { questionId }) {
  const question = questions[questionId];
  return {
    authedUser,
    question: question,
    askerName: users[question.author].name,
    avatarURL: users[question.author].avatarURL
  };
}

export default connect(mapStateToProps)(withStyles(styles)(AnswerPoll));
