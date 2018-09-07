import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  paper: {
    display: "flex",
    width: 400,
    marginBottom: theme.spacing.unit * 2,
  },
  avatar: {
    margin: 10,
    width: 96,
    height: 96
  },
  vertical: {
    width: 0
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderColor: theme.palette.grey[400],
    borderWidth: 1,
    margin: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  name: {
    marginBottom: theme.spacing.unit
  },
  totalScore: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing.unit,
    borderStyle: "solid",
    borderColor: theme.palette.grey[400],
    borderWidth: 1,
    alignItems: "stretch"
  },
  scoreTitle: {
    flexGrow: 1,
    borderBottomStyle: "solid",
    borderColor: theme.palette.grey[400],
    borderWidth: 1,
    backgroundColor: theme.palette.grey[100],
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  scoreDetail: {
    flexGrow: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  avatarScore: {
    width: 48,
    height: 48,
    backgroundColor: green[500]
  }
});

class Score extends Component {
  render() {
    const { classes, userDetails } = this.props;
    const { name, avatarURL, answersNum, questionsNum, totalNum } = JSON.parse(
      userDetails
    );
    return (
      <Paper className={classes.paper}>
        <Avatar alt={name} src={avatarURL} className={classes.avatar} />
        {/* <hr className={classes.vertical} /> */}
        <div className={classes.detail}>
          <Typography
            variant="headline"
            color="inherit"
            className={classes.name}
          >
            {name}
          </Typography>
          <Typography variant="subheading" color="inherit">
            Answered questions: {answersNum}
          </Typography>
          <Typography variant="subheading" color="inherit" >
            Created questions: {questionsNum}
          </Typography>
        </div>
        <div className={classes.totalScore}>
          <div className={classes.scoreTitle}>
            <Typography variant="subheading" color="inherit">
              Score
            </Typography>
          </div>
          <div className={classes.scoreDetail}>
            {" "}
            <Avatar className={classes.avatarScore}>{totalNum}</Avatar>
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Score);
