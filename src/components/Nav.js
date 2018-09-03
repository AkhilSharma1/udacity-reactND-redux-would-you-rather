import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  userDetail: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 64
  },
  avatar: {
    margin: 10
  },
  greeting: {
    padding: 16
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

  render() {
    const { classes, users, authedUser } = this.props;
    const { value } = this.state;

    let user = authedUser === null ? null : users[authedUser.id];

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={this.handleChange}
            className={classes.tabs}
          >
            <Tab label="Home"  />
            <Tab label="New Question" />
            <Tab label="Leader Board" />
            {user !== null && (
              <div className={classes.userDetail}>
                <Typography
                  variant="subheading"
                  color="inherit"
                  className={classes.greeting}
                >
                  Hello, {user.name}
                </Typography>
                <Avatar
                  alt={user.name}
                  src={user.avatarURL}
                  className={classes.avatar}
                />
                <Button color="inherit">Logout</Button>
              </div>
            )}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

// function Nav() {
//   return (
//     <nav className="nav">
//       <ul>
//         <li>
//           <NavLink to="/" exact activeClassName="active">
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/new" activeClassName="active">
//             New Tweet
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// }

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Nav));
