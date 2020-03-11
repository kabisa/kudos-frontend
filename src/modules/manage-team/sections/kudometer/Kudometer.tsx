import React, {ChangeEvent, Component} from "react";
import {Button, Divider, Form, Header, Icon, Message, Table,} from "semantic-ui-react";
import {toast} from "react-toastify";
import {Mutation, Query} from "react-apollo";
import settings from "../../../../config/settings";
import {getGraphqlError} from "../../../../support";
import {
    CREATE_KUDOMETER,
    CreateKudometerParameters,
    DELETE_KUDOMETER,
    DeleteKudometerParameters,
    GET_KUDOMETERS,
    GetKudoMetersResult,
    Kudometer
} from "./KudometerQuerries";
import {Goals} from "./goals";


export interface Props {
    // Future props go here
}

export interface State {
    name: string;
    selected?: Kudometer;
    error: string;
}

export class KudometerSection extends Component <Props, State> {
    initialState: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            name: "",
            selected: undefined,
            error: ""
        };

        this.initialState = this.state;

        this.handleChange = this.handleChange.bind(this);
        this.createKudometer = this.createKudometer.bind(this);
    }

    handleChange(e: ChangeEvent, {name, value}: any) {
        // @ts-ignore
        this.setState({[name]: value});
    }

    handleViewGoalButtonClick(kudometer: Kudometer) {
        if (this.state.selected?.id === kudometer.id) {
            this.setState({selected: undefined});
            return;
        }

        this.setState({
            selected: kudometer,
        })

    }

    createKudometer(mutate: any) {
        this.setState({error: ""});
        mutate({
            variables: {
                name: this.state.name,
                team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
            },
        });
    }

    render() {
        return (
            <div>
                <Header as="h2">
                    <Icon name="flag outline"/>
                    <Header.Content>
                        Kudometers
                        <Header.Subheader>Manage kudometers</Header.Subheader>
                    </Header.Content>
                </Header>
                <Divider/>
                <Mutation<CreateKudometerParameters>
                    mutation={CREATE_KUDOMETER}
                    onCompleted={() => {
                        this.setState(this.initialState);
                        toast.info("Kudometer created successfully!");
                    }}
                    refetchQueries={[
                        {
                            query: GET_KUDOMETERS,
                            variables: {
                                team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
                            },
                        },
                    ]}
                >
                    {(createKudometer, {error, loading}) => {
                        let displayError;
                        if (error) {
                            displayError = getGraphqlError(error);
                        }
                        if (this.state.error) {
                            displayError = this.state.error;
                        }
                        return (
                            <Form onSubmit={() => this.createKudometer(createKudometer)}>
                                <Form.Input
                                    fluid
                                    required
                                    label="Name"
                                    name="name"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                                <Button
                                    color="blue"
                                    loading={loading}
                                    disabled={loading}
                                    type="submit"
                                >
                                    Create kudometer
                                </Button>
                                {displayError && (
                                    <Message negative>
                                        <Message.Header>Unable to create kudometer.</Message.Header>
                                        <p>{displayError}</p>
                                    </Message>
                                )}
                            </Form>
                        );
                    }}
                </Mutation>
                <Divider/>
                <Query<GetKudoMetersResult>
                    query={GET_KUDOMETERS}
                    variables={{team_id: localStorage.getItem(settings.TEAM_ID_TOKEN)}}
                >
                    {({loading, error, data}) => {
                        if (loading || !data) return <p> "Loading..." </p>;
                        if (error) return <p> `Error! ${error.message}` </p>;

                        const kudometer = this.state.selected
                            ? data.teamById.kudosMeters.find(
                                kudometer => kudometer.id === this.state.selected?.id
                            )
                            : null;
                        const goals = kudometer ? kudometer.goals : [];

                        return (
                            <div>
                                <Table celled>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Name</Table.HeaderCell>
                                            <Table.HeaderCell>Actions</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {data.teamById.kudosMeters.map(item => {
                                            return (
                                                <Table.Row key={item.id}>
                                                    <Table.Cell>{item.name}</Table.Cell>
                                                    <Table.Cell>
                                                        <Button
                                                            color="blue"
                                                            size="tiny"
                                                            onClick={() => this.handleViewGoalButtonClick(item)}
                                                        >
                                                            View goals
                                                        </Button>
                                                        <Mutation<DeleteKudometerParameters>
                                                            mutation={DELETE_KUDOMETER}
                                                            onCompleted={() => {
                                                                toast.info("Kudometer removed successfully!");
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
                                                            {(deleteKudometer, {loading}) => {
                                                                return (
                                                                    <Button
                                                                        color="red"
                                                                        icon="trash"
                                                                        size="tiny"
                                                                        loading={loading}
                                                                        onClick={() => {
                                                                            if (
                                                                                window.confirm(
                                                                                    "REMOVING A KUDOMETER WILL REMOVE ALL RELATED POSTS! Are you sure you want to remove this kudometer?"
                                                                                )
                                                                            ) {
                                                                                deleteKudometer({
                                                                                    variables: {id: item.id},
                                                                                });
                                                                                if (
                                                                                    this.state.selected &&
                                                                                    this.state.selected.id === item.id
                                                                                ) {
                                                                                    this.setState({selected: undefined});
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                );
                                                            }}
                                                        </Mutation>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>
                                </Table>

                                {this.state.selected && (
                                    <Goals kudometer={this.state.selected} goals={goals}/>
                                )}
                            </div>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default KudometerSection;
