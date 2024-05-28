import { Component, RefObject, createRef } from "react";
import { Kudometer } from "../KudometerQueries";
import { EditGoal } from "./EditGoal";
import { GoalRow } from "./GoalRow";

export interface Props {
  kudometer: Kudometer;
}

export interface State {}

export class Goals extends Component<Props, State> {
  editGoalRef: RefObject<EditGoal>;

  constructor(props: Props) {
    super(props);

    this.editGoalRef = createRef();
    this.editGoal = this.editGoal.bind(this);
  }

  editGoal(id: string, kudos: number, description: string) {
    if (this.editGoalRef.current) {
      this.editGoalRef.current.setEditState(id, String(kudos), description);
    }
  }

  render() {
    return (
      <div className="form-container">
        <h1 style={{ marginTop: "1rem" }}>
          Goals for {this.props.kudometer.name}
        </h1>

        <EditGoal
          data-testid="goal-edit"
          kudometerId={this.props.kudometer.id}
          ref={this.editGoalRef}
        />

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Kudos</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {this.props.kudometer.goals.map((goal) => (
              <GoalRow
                data-testid="goal-row"
                key={goal.id}
                goal={goal}
                editGoal={this.editGoal}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
