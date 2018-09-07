import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { getLeaderboardData } from "../utils/helpers";
import Score from "./Score";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8
  },
  ul: {
    listStyleType: "none"
  }
});

class LeaderBoard extends Component {
  render() {
    const { classes, scores } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        direction="column"
        alignItems="center"
      >
        <div>
          <ul className={classes.ul}>
            {scores.sort((a, b) => b.totalNum - a.totalNum).map(score => (
              <li key={score.avatarURL}>
                <Score userDetails={JSON.stringify(score)} />
              </li>
            ))}
          </ul>
        </div>
      </Grid>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    scores: getLeaderboardData(users)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(LeaderBoard));