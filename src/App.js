import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Home from "./components/Home";
import PollOverview from "./components/PollOverview";
import { setAuthedUser } from "./actions/authedUser";
import NewPoll from "./components/NewPoll";
import LeaderBoard from "./components/LeaderBoard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(setAuthedUser("sarahedo"));

    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, loading } = this.props;

    return (
      <Router>
        <Fragment>
          <CssBaseline />
          {/* <Nav /> */}
          <LoadingBar />
          {loading === true ? null : (
            //  (authedUser === null ? <Login /> : <Home/>)
            // <Home />
            // <Login/>
            // <NewPoll/>
            <LeaderBoard/>
          )}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    authedUser,
    loading: questions === null
  };
}

export default connect(mapStateToProps)(App);
