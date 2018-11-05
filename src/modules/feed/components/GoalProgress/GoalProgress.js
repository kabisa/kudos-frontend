import { h, Component } from "preact";

import { PATH_STATISTICS } from "../../../../routes";

export class GoalProgress extends Component {
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

export default GoalProgress;
