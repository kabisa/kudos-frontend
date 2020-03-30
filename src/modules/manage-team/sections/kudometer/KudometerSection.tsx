/* eslint-disable no-shadow */
import React, { ChangeEvent, Component } from 'react';
import {
  Button, Divider, Form, Header, Icon, Message, Table,
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { Mutation, Query } from '@apollo/react-components';
import settings from '../../../../config/settings';
import { getGraphqlError } from '../../../../support';
import {
  CREATE_KUDOMETER,
  CreateKudometerParameters,
  GET_KUDOMETERS,
  GetKudoMetersResult,
  Kudometer,
} from './KudometerQuerries';
import { Goals } from './goals/Goals';
import { KudometerRow } from './KudometerRow';

export interface Props {
  // Future props go here
}

export interface State {
  name: string;
  selected?: Kudometer;
  error: string;
}

class KudometerSection extends Component<Props, State> {
  initialState: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      selected: undefined,
      error: '',
    };

    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.createKudometer = this.createKudometer.bind(this);
    this.handleViewGoalButtonClick = this.handleViewGoalButtonClick.bind(this);
    this.deleteKudometer = this.deleteKudometer.bind(this);
  }

  handleChange(e: ChangeEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
  }

  handleViewGoalButtonClick(kudometer: Kudometer) {
    if (this.state.selected?.id === kudometer.id) {
      this.setState({ selected: undefined });
      return;
    }

    this.setState({
      selected: kudometer,
    });
  }

  createKudometer(mutate: any) {
    this.setState({ error: '' });
    mutate({
      variables: {
        name: this.state.name,
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  deleteKudometer(id: string) {
    if (this.state.selected && this.state.selected.id === id) {
      this.setState({
        selected: undefined,
      });
    }
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="flag outline" />
          <Header.Content>
            Kudometers
            <Header.Subheader>Manage kudometers</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Mutation<CreateKudometerParameters>
          mutation={CREATE_KUDOMETER}
          onCompleted={() => {
            this.setState(this.initialState);
            toast.info('Kudometer created successfully!');
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
          {(createKudometer, { error, loading }) => {
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
                  data-testid="name-input"
                  fluid
                  required
                  label="Name"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <Button data-testid="create-button" color="blue" loading={loading} disabled={loading} type="submit">
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
        <Divider />
        <Query<GetKudoMetersResult>
          query={GET_KUDOMETERS}
          variables={{ team_id: localStorage.getItem(settings.TEAM_ID_TOKEN) }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p> Loading... </p>;
            if (error) return <p> Error! {error.message} </p>;

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
                    {(data
                        && data.teamById
                        && data.teamById.kudosMeters.length > 0) ? data.teamById.kudosMeters.map((item) => (
                          <KudometerRow
                            data-testid="kudometer-row"
                            key={item.id}
                            kudometer={item}
                            viewButtonClickHandler={this.handleViewGoalButtonClick}
                            deleteKudometerHandler={this.deleteKudometer}
                          />
                      )) : <Table.Row>No kudometers available</Table.Row>}
                  </Table.Body>
                </Table>

                {this.state.selected && <Goals kudometer={this.state.selected} />}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default KudometerSection;
