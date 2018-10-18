import { h, Component } from "preact";
import PropTypes from "prop-types";
import { connect } from "preact-redux";

import { PATH_STATISTICS } from "../../../../../routes";
import { getGoalProgress } from "../../../actions";

export class GoalProgress extends Component {
  componentDidMount() {
    this.props.getGoalProgress();
  }

  render() {
    const { goalPercentage, goalPercentageSuccess } = this.props;

    if (!goalPercentageSuccess) {
      return (
        <a
          className="kudo-progress"
          href={`${PATH_STATISTICS}?transition=none`}
        >
          <div className="kudo-progress-bar-loading" />
        </a>
      );
    }

    return (
      <a className="kudo-progress" href={`${PATH_STATISTICS}?transition=none`}>
        <div
          className="kudo-progress-bar"
          style={{ width: `${goalPercentage}%` }}
        />
        <div
          className="kudo-progress-bar-negative"
          style={{ width: `${100 - goalPercentage}%` }}
        />
      </a>
    );
  }
}

GoalProgress.propTypes = {
  getGoalProgress: PropTypes.func.isRequired,

  goalPercentage: PropTypes.number,
  goalPercentageSuccess: PropTypes.bool.isRequired,
};

GoalProgress.defaultProps = {
  goalPercentage: 0,
};

const mapStateToProps = state => ({
  goalPercentage: state.feed.goalPercentage,
  goalPercentageSuccess: state.feed.getGoalPercentageSuccess,
});

const mapDispatchToProps = {
  getGoalProgress,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalProgress);
