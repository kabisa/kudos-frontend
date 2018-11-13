import { h, Component } from "preact";
import { Query } from "react-apollo";

import settings from "../../config/settings";
import { Navigation } from "../../components/navigation";
import { auth } from "../../support";
import { DonutChart } from "./components";
import { GET_GOALS } from "./queries";

import s from "./style.scss";

export class StatisticsPage extends Component {
  constructor(props) {
    super(props);
    auth();
  }

  render() {
    return (
      <div>
        <div className={s.root}>
          <Query
            query={GET_GOALS}
            variables={{
              team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return `Error! ${error.message}`;

              const goals = data.teamById.activeGoals;
              const currentKudos = data.teamById.activeKudosMeter.amount;
              const nextGoal = goals.find(goal => goal.amount > currentKudos);

              let percentage = 100;
              if (nextGoal) {
                percentage =
                  ((currentKudos - nextGoal.amount) / nextGoal.amount) * 100 +
                  100;
                if (percentage < 0) percentage = 0;
                if (percentage > 100) percentage = 100;
              }

              return (
                <div>
                  <h1>Current: {currentKudos}₭</h1>

                  <h2>Next goal: {nextGoal ? nextGoal.name : "-"}</h2>
                  <DonutChart value={percentage} />
                  <p style={{ marginTop: "12px", color: "grey" }}>
                    {currentKudos}/{nextGoal.amount}₭
                  </p>

                  <h2 style={{ marginTop: "1.5em" }}>All goals</h2>
                  <table className={s.goals}>
                    <tr>
                      <th>Name</th> <th>Amount</th> <th>Achieved on</th>
                    </tr>
                    {goals.map(goal => (
                      <tr key={goal.id}>
                        <td>{goal.name}</td>
                        <td>{goal.amount}</td>
                        <td>{goal.achieved_on ? goal.achieved_on : "-"}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              );
            }}
          </Query>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default StatisticsPage;
