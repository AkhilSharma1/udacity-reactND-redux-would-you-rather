import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({

  grid: {
    marginTop: theme.spacing.unit * 8,
    display: "grid",
    width: 500,
    gridTemplateColumns: "30% 1fr",
    gridTemplateRows: "1fr 4fr",
    gridGap: "1rem",
    gridTemplateAreas: `
      "header header"
      "avatar result"    
      `
  },
    header: {
    backgroundColor: theme.palette.grey[100],
    gridArea: "header",
    display: "flex",
    alignItems: "center",
    paddingLeft:theme.spacing.unit*2 
  },
  avatarBox: {
    margin: 10,
    gridArea: "avatar",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    //TODO: make this percent-wise
    width: "120px",
    height: "120px"
  },
  results: {
    padding: 10,
    gridArea: "result",

  },
  resultBar: {
    marginTop:'20px',
    marginBottom:'20px',
  }
});

function ResultBarComponent({
  text,
  voted,
  total,
 classes,
 userAnswer
}) {
  return (
    <div className={classes.resultBar}>
      <div>
        {text}
        <LinearProgress variant="determinate" value={(voted * 100) / total} />
        {voted} out of {total} votes
        {userAnswer===true && <div> YOUR ANSWER!</div> } 
      </div>
    
    </div>
  );
}

class PollResult extends Component {
  render() {
    const { classes, question, askerName, avatarURL,chosenOption } = this.props;
    const optionOneText = question.optionOne.text;
    const optionTwoText = question.optionTwo.text;
    const votesOptionOne = question.optionOne.votes.length;
    const votesOptionTwo = question.optionTwo.votes.length;
    const totalVotes = votesOptionOne + votesOptionTwo;

    return (
      <Paper className={classes.grid}>
        <div className={classes.header}>
          <Typography variant="subheading">Asked by {askerName}</Typography>
        </div>
        <div className={classes.avatarBox}>
          <Avatar alt={askerName} src={avatarURL} className={classes.avatar} />
        </div>
        <div className={classes.results}>
          <Typography variant="headline">Results</Typography>
          <ResultBarComponent
            text={optionOneText}
            voted={votesOptionOne}
            total={totalVotes}
            classes = {classes}
            userAnswer = {chosenOption === "optionOne"? true:false}
          />
          <ResultBarComponent
            text={optionTwoText}
            voted={votesOptionTwo}
            total={totalVotes}
            classes = {classes}
            userAnswer = {chosenOption === "optionTwo"? true:false}

          />
        </div>
      </Paper>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { questionId }) {
  const question = questions[questionId];
  return {
    authedUser,
    question,
    askerName: users[question.author].name,
    avatarURL: users[question.author].avatarURL,
    chosenOption: users[authedUser].answers[questionId]
  };
}
export default connect(mapStateToProps)(withStyles(styles)(PollResult));
