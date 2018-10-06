import React, { Component } from "react";
import { withRouter, Link} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const styles = theme => ({
  appBar:{
    display:'flex',
    flexDirection:'row',
  },
  userDetail: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems:'center',
    marginRight: 64,
  },
  avatar: {
     marginLeft: 10,
     marginRight: 10,

  },
  tabs: {
    flexGrow:1,
  },
  nav: {
    marginTop: theme.spacing.unit * 3
  }
});

class Nav extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleLogout = e => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null))
    this.props.history.push(`/login`) 
  }

  render() {
    const { classes, users, authedUser } = this.props;
    const { value } = this.state;

    let user = authedUser === null ? null : users[authedUser];

    return (
      <AppBar className = {classes.appBar}>
       <Tabs
            value={value}
            onChange={this.handleChange}
            className={classes.tabs}
          >
            <Tab label="Home" component={Link} to="/" />
            <Tab label="New Question" component={Link} to="/add" />
            <Tab label="Leader Board" component={Link} to="/leaderboard"/>
          </Tabs> 
          {user !== null && (
            <div className={classes.userDetail}>
              <Typography variant="subheading" className={classes.greeting} color = 'inherit'>
                Hello, {user.name}
              </Typography>
              <Avatar
                alt={user.name}
                src={user.avatarURL}
                className={classes.avatar}
              />
              <Button onClick = {this.handleLogout} color = 'inherit'>Logout</Button>
            </div>
          )}    

        </AppBar>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Nav)));
