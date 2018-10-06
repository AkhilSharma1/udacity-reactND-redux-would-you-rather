import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";

const styles = theme => ({
 
  paper: {
    width: 400,
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.unit * 2,
    alignItems: "center"
  },
  header: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing.unit,
    width: "100%"
  },
  title: {
    fontWeight: "bold",
    marginLeft: theme.spacing.unit * 2
  },
  detail: {
    display: "flex",
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center"
  },
  avatar: {
    width: 96,
    height: 96,
    marginLeft: theme.spacing.unit * 2
  },
  poll: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  button: {
    margin: theme.spacing.unit,
    width: "80%"
  }
});
class PollOverview extends Component {
  handleSubmit = (e,id) => {
    e.preventDefault();
    //TODO: go to poll details page.
    this.props.history.push(`/questions/${id}`) 
  };
  render() {
    const { classes, question, user } = this.props;

    return (
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Typography variant="subheading" className={classes.title}>
              {user.name} asks:
            </Typography>
          </div>
          <div className={classes.detail}>
            <Avatar
              alt={user.name}
              src={user.avatarURL}
              className={classes.avatar}
            />
            <div className={classes.poll}>
              <Typography variant="subheading" className={classes.title}>
                Would you rather
              </Typography>
              <Typography variant="body2">
                ...
                {question.optionOne.text}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className={classes.button}
                onClick={(e)=>this.handleSubmit(e,question.id)}
              >
                View Poll
              </Button>
            </div>
          </div>
        </Paper>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { questionId }) {
  const question = questions[questionId];
  const user = users[question.author];

  return {
    question,
    user
  };
}

export default  withRouter(connect(mapStateToProps)(withStyles(styles)(PollOverview)));
