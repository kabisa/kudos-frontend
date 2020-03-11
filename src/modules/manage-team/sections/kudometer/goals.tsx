import React, {ChangeEvent, Component} from "react";
import {Button, Divider, Form, Message, Table} from "semantic-ui-react";
import {Mutation} from "react-apollo";
import {
    CREATE_GOAL,
    CreateGoalParameters,
    DELETE_GOAL,
    DeleteGoalParameters,
    GET_KUDOMETERS, Goal,
    Kudometer,
    UPDATE_GOAL
} from "./KudometerQuerries";
import {toast} from "react-toastify";
import settings from "../../../../config/settings";
import {getGraphqlError} from "../../../../support";


export interface Props {
    kudometer: Kudometer;
    goals: Goal[];
}

export interface State {
    goalKudos: string;
    goalName: string;
    error: string;
    editingGoal: boolean;
    editGoalName: string;
    editGoalKudos: string;
    editGoalId: string;

}

export class Goals extends Component <Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            goalKudos: "",
            goalName: "",
            error: "",
            editingGoal: false,
            editGoalName: "",
            editGoalKudos: "",
            editGoalId: "",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: ChangeEvent, { name, value }: any) {
        // @ts-ignore
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <Divider/>
                <h1>Goals for Kudometer {this.props.kudometer.name}</h1>

                <Mutation<CreateGoalParameters>
                    mutation={
                        this.state.editingGoal ? UPDATE_GOAL : CREATE_GOAL
                    }
                    onCompleted={() => {
                        toast.info(
                            this.state.editingGoal
                                ? "Goal updated successfully!"
                                : "Goal created successfully!"
                        );
                        this.setState({
                            goalName: "",
                            goalKudos: "",
                            editingGoal: false,
                        });
                    }}
                    refetchQueries={[
                        {
                            query: GET_KUDOMETERS,
                            variables: {
                                team_id: localStorage.getItem(
                                    settings.TEAM_ID_TOKEN
                                ),
                            },
                        },
                    ]}
                >
                    {(mutate, {error, loading}) => {
                        let displayError;
                        if (error) {
                            displayError = getGraphqlError(error);
                        }
                        if (this.state.error) {
                            displayError = this.state.error;
                        }

                        return (
                            <Form
                                onSubmit={() =>
                                    this.state.editingGoal
                                        ? mutate({
                                            variables: {
                                                name: this.state.editGoalName,
                                                amount: parseInt(
                                                    this.state.editGoalKudos
                                                ),
                                                goalId: this.state.editGoalId,
                                            },
                                        })
                                        : mutate({
                                            variables: {
                                                name: this.state.goalName,
                                                amount: parseInt(this.state.goalKudos),
                                                kudometer: this.props.kudometer.id,
                                            },
                                        })
                                }
                            >
                                <Form.Group widths="equal">
                                    <Form.Input
                                        fluid
                                        required
                                        label="Name"
                                        name={
                                            this.state.editingGoal
                                                ? "editGoalName"
                                                : "goalName"
                                        }
                                        placeholder="Name"
                                        value={
                                            this.state.editingGoal
                                                ? this.state.editGoalName
                                                : this.state.goalName
                                        }
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input
                                        fluid
                                        required
                                        label="Kudos"
                                        name={
                                            this.state.editingGoal
                                                ? "editGoalKudos"
                                                : "goalKudos"
                                        }
                                        type="number"
                                        min="100"
                                        placeholder="Kudos"
                                        value={
                                            this.state.editingGoal
                                                ? this.state.editGoalKudos
                                                : this.state.goalKudos
                                        }
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Button
                                    color="blue"
                                    loading={loading}
                                    disabled={loading}
                                    type="submit"
                                >
                                    {this.state.editingGoal
                                        ? "Update goal"
                                        : "Create goal"}
                                </Button>
                                {this.state.editingGoal && (
                                    <Button
                                        color="orange"
                                        onClick={() =>
                                            this.setState({editingGoal: false})
                                        }
                                    >
                                        Cancel
                                    </Button>
                                )}
                                {displayError && (
                                    <Message negative>
                                        <Message.Header>
                                            Unable to create goal.
                                        </Message.Header>
                                        <p>{displayError}</p>
                                    </Message>
                                )}
                            </Form>
                        );
                    }}
                </Mutation>

                <Table celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Kudos</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.goals.map(goal => (
                            <Table.Row key={goal.id}>
                                <Table.Cell>{goal.name}</Table.Cell>
                                <Table.Cell>{goal.amount}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        color="yellow"
                                        icon="pencil"
                                        size="tiny"
                                        onClick={() =>
                                            this.setState({
                                                editingGoal: true,
                                                editGoalName: goal.name,
                                                editGoalKudos: String(goal.amount),
                                                editGoalId: goal.id,
                                            })
                                        }
                                    />
                                    <Mutation<DeleteGoalParameters>
                                        mutation={DELETE_GOAL}
                                        onCompleted={() => {
                                            toast.info("Goal removed successfully!");
                                        }}
                                        refetchQueries={[
                                            {
                                                query: GET_KUDOMETERS,
                                                variables: {
                                                    team_id: localStorage.getItem(
                                                        settings.TEAM_ID_TOKEN
                                                    ),
                                                },
                                            },
                                        ]}
                                    >
                                        {(deleteGoal, {loading}) => {
                                            return (
                                                <Button
                                                    color="red"
                                                    icon="trash"
                                                    size="tiny"
                                                    loading={loading}
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                "Are you sure you want to remove this kudometer?"
                                                            )
                                                        ) {
                                                            deleteGoal({
                                                                variables: {id: goal.id},
                                                            });
                                                        }
                                                    }}
                                                />
                                            );
                                        }}
                                    </Mutation>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

        )
    }
}
