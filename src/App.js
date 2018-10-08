import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Home from "./components/Home";
import PollOverview from "./components/PollOverview";
import NewPoll from "./components/CreatePoll";
import LeaderBoard from "./components/LeaderBoard";
import Score from "./components/Score";
import AnswerPoll from "./components/AnswerPoll";
import PollResult from "./components/PollResult";
import { withStyles } from "@material-ui/core/styles";
import PollDetail from './components/PollDetail';
import authedUser from './reducers/authedUser';

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing.unit * 16,
    alignItems: "stretch"
  }
});

class App extends Component {
  componentDidMount() {
    // this.props.dispatch(setAuthedUser("sarahedo"));
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, loading, classes } = this.props;

    return (
      <Router>
        <Fragment>
          <CssBaseline />

          <LoadingBar />
          <div className={classes.container}>
            {loading === true ? (
              <div>Loading...</div>
            ) : (
              <div>
                <Nav/>
                <Switch>
                  <PrivateRoute exact path="/" component={Home}  authedUser = {authedUser}/>
                  <Route path="/login" component={Login} />
                  <PrivateRoute path="/add" component={NewPoll} authedUser = {authedUser}/>
                  <PrivateRoute path="/leaderboard" component={LeaderBoard}  authedUser = {authedUser} />
                  <PrivateRoute path="/questions/:question_id" component={PollDetail}  authedUser = {authedUser}/>
                </Switch>
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authedUser!==null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

function mapStateToProps({ authedUser, questions }) {
  return {
    authedUser,
    loading: !questions
  };
}

export default connect(mapStateToProps)(withStyles(styles)(App));
