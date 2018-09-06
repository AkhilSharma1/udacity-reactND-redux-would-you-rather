import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import LockIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { setAuthedUser } from "../actions/authedUser";
import TextField from "@material-ui/core/TextField";
import { handleAddQuestion } from "../actions/questions";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8
  },
  paper: {
    height: "auto",
    width: 500,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  },
  header: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing.unit,
    marginTop: -8
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});
class NewPoll extends Component {
  state = {
    optionOneText: "",
    optionTwoText: ""
  };
  handleChange = e => {
    const text = e.target.value;
    const id = e.target.id;

    if (id === "option1") {
      this.setState(() => ({
        optionOneText: text
      }));
    } else {
      this.setState(() => ({
        optionTwoText: text
      }));
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, authedUser } = this.props;
    const { optionOneText, optionTwoText } = this.state;

    this.props.dispatch(
      handleAddQuestion(authedUser, optionOneText, optionTwoText)
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <form onSubmit={this.handleSubmit}>
            <Paper className={classes.paper}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                spacing={16}
              >
                <Grid item>
                  <Typography variant="headline" className={classes.header}>
                    Create New Question
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subheading">
                    Complete the question:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="title">Would you rather ...</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="option1"
                    label="Option 1"
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="Enter option 1 here"
                    fullWidth
                    margin="normal"
                    value={this.state.optionOneText}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item container justify="center">
                  <Typography variant="title">OR</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="option2"
                    label="Option 2"
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder="Enter option 2 here"
                    fullWidth
                    margin="dense"
                    value={this.state.optionTwoText}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item container justify="center">
                  <Button
                    type="submit"
                    variant="raised"
                    color="primary"
                    className={classes.submit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(withStyles(styles)(NewPoll));
