import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { handleInitialData } from "./actions/shared";
import LoadingBar from "react-redux-loading";
import Login from "./components/Login";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, loading } = this.props;

    return (
      <Router>
        <Fragment>
          <CssBaseline />
          <LoadingBar />
          {loading === true ? null:(authedUser === null ? <Login /> : <div>Dashboard</div>)}
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    loading: users===null
  };
}

export default connect(mapStateToProps)(App);
