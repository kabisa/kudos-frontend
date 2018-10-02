import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { PATH_STATISTICS } from '../../../../routes';
import { getGoalProgress } from '../../actions';

export class GoalProgress extends Component {
  componentWillMount() {
    this.props.getGoalProgress();
  }

  render() {
    const { goalPercentage, goalPercentageSuccess } = this.props;

    if (!goalPercentageSuccess) {
      return (
        <Link className="kudo-progress" to={PATH_STATISTICS}>
          <div className="kudo-progress-bar-loading" />
        </Link>
      );
    }

    return (
      <Link className="kudo-progress" to={PATH_STATISTICS}>
        <div className="kudo-progress-bar" style={{ width: `${goalPercentage}%` }} />
        <div className="kudo-progress-bar-negative" style={{ width: `${100 - goalPercentage}%` }} />
      </Link>
    );
  }
}

GoalProgress.propTypes = {
  getGoalProgress: PropTypes.func.isRequired,

  goalPercentage: PropTypes.number,
  goalPercentageSuccess: PropTypes.bool.isRequired
};

GoalProgress.defaultProps = {
  goalPercentage: 0
};

const mapStateToProps = state => ({
  goalPercentage: state.feed.goalPercentage,
  goalPercentageSuccess: state.feed.getGoalPercentageSuccess
});

const mapDispatchToProps = {
  getGoalProgress
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalProgress);
