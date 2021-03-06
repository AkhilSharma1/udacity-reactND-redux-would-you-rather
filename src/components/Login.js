import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { setAuthedUser } from "../actions/authedUser";

const styles = theme => ({
 
  paper: {
    height: "auto",
    width: 500,
  },
  header: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing.unit
  },

  logo: {
    height: 120,
    width: 120,
    margin: theme.spacing.unit
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 180
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3

  }
});
class Login extends Component {
  state = {
    userId: Object.keys(this.props.users)[0]
  };

  handleChange = e => {
    this.setState({
      userId: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(
      setAuthedUser(this.state.userId)
    );
     this.props.history.push(`/`)
  };

  render() {
    const { users, classes } = this.props;

    return (
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Paper className={classes.paper}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.header}
              >
                <Grid item>
                  <Typography variant="title">
                    Welcome to the Would You Rather App!
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subheading">
                    Please sign in to continue
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <img
                  src="/favicon.ico"
                  alt="Would You Rather logo"
                  className={classes.logo}
                />
              </Grid>
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="user-required">User</InputLabel>
                  <Select
                    value={this.state.userId}
                    onChange={this.handleChange}
                    inputProps={{
                      id: "user-required"
                    }}
                  >
          
                    {Object.keys(users).map(userId => (
                      <MenuItem value={userId} key={userId}>
                        {users[userId].name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: users
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Login));
