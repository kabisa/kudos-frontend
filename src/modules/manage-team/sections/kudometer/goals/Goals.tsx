import React, { Component } from "react";
import { Kudometer } from "../KudometerQueries";
import { EditGoal } from "./EditGoal";
import { GoalRow } from "./GoalRow";

export interface Props {
  kudometer: Kudometer;
}

export interface State {}

export class Goals extends Component<Props, State> {
  editGoalRef: React.RefObject<EditGoal>;

  constructor(props: Props) {
    super(props);

    this.editGoalRef = React.createRef();
    this.editGoal = this.editGoal.bind(this);
  }

  editGoal(id: string, kudos: number, description: string) {
    if (this.editGoalRef.current) {
      this.editGoalRef.current.setEditState(id, String(kudos), description);
    }
  }

  render() {
    return (
      <div>
        <h1>Goals for Kudometer {this.props.kudometer.name}</h1>

        <EditGoal
          data-testid="goal-edit"
          kudometerId={this.props.kudometer.id}
          ref={this.editGoalRef}
        />

        <table>
          <tr>
            <th>Name</th>
            <th>Kudos</th>
            <th>Actions</th>
          </tr>
          {this.props.kudometer.goals.map((goal) => (
            <GoalRow
              data-testid="goal-row"
              key={goal.id}
              goal={goal}
              editGoal={this.editGoal}
            />
          ))}
        </table>
      </div>
    );
  }
}
