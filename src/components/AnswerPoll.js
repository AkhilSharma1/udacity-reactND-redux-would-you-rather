import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { handleAddAnsweredQuestion } from "../actions/questions";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    display: "grid",
    width: 500,
    gridTemplateColumns: "30% 1fr",
    gridTemplateRows: "1fr 4fr",
    gridGap: "1rem",
    gridTemplateAreas: `
    "header header"
    "avatar form"    
    `
  },

  header: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing.unit,
    gridArea: "header"
  },
  form: {
    gridArea: "form"
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
  submitBox: {
    margin: theme.spacing.unit
  }
});
class AnswerPoll extends Component {
  state = {
    selected:'optionOne'
  }
  handleChange = event => {
    this.setState({ selected: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, authedUser, questionId } = this.props;
    const { selected } = this.state;

    dispatch(handleAddAnsweredQuestion(authedUser,questionId, selected));
  };

  render() {
    const {
      optionOne,
      optionTwo,
      askerName,
      avatarURL,
      classes
    } = this.props;
    return (
      <Paper className={classes.root}>
        <div className={classes.header}>
          <Typography variant="subheading">{askerName} asks:</Typography>
        </div>
        <div className={classes.avatarBox}>
          <Avatar alt={askerName} src={avatarURL} className={classes.avatar} />
        </div>
        <form className={classes.form}>
          <Typography variant="headline" className={classes.title}>
            Would You Rather ...
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Option"
              name="option"
              value={this.state.selected}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="optionOne"
                control={<Radio />}
                label={optionOne}
              />
              <FormControlLabel
                value="optionTwo"
                control={<Radio />}
                label={optionTwo}
              />
            </RadioGroup>
          </FormControl>
          <div className={classes.submitBox}>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { questionId }) {
  const question = questions[questionId];
  return {
    authedUser,
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text,
    askerName: users[question.author].name,
    avatarURL: users[question.author].avatarURL
  };
}

export default connect(mapStateToProps)(withStyles(styles)(AnswerPoll));
