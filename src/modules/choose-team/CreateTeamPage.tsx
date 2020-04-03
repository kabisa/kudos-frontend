import React, { ChangeEvent, Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import settings from '../../config/settings';
import { ERROR_NAME_BLANK } from '../../support';
import { Navigation, Toolbar } from '../../components/navigation';
import { PATH_FEED } from '../../routes';
import { Storage } from '../../support/storage';
import s from '../user/UserPage.module.scss';

export const MUTATION_CREATE_TEAM = gql`
    mutation CreateTeam($name: String!) {
        createTeam(name: $name) {
            team {
                id
            }
        }
    }
`;

export interface CreateTeamParameters {
  name: string;
}

export interface CreateTeamResult {
  createTeam: {
    team: {
      id: string;
    };
  };
}

export interface Props {
  history: History;
}

export interface State {
  name: string;
  error: string;
}

class CreateTeamPage extends Component<Props, State> {
  initialState: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      error: '',
    };

    this.initialState = this.state;

    this.createTeam = this.createTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }

  hasErrors() {
    const { name } = this.state;
    this.setState({ error: '' });

    if (!name) {
      this.setState({ error: ERROR_NAME_BLANK });
      return true;
    }
    return false;
  }

  createTeam(mutate: any) {
    const { name } = this.state;

    if (this.hasErrors()) {
      return;
    }

    mutate({
      variables: {
        name,
      },
    });
  }

  handleChange(e: ChangeEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div id="root">
        <Toolbar text="Create team" />
        <div className="main-form">
          <div className={s.page}>
            <Mutation<CreateTeamResult, CreateTeamParameters>
              mutation={MUTATION_CREATE_TEAM}
              onError={(error) => this.setState({ error: error.message })}
              onCompleted={({ createTeam }) => {
                this.setState(this.initialState);
                Storage.setItem(settings.TEAM_ID_TOKEN, createTeam.team.id);
                toast.info('Team created successfully!');
                this.props.history.push(PATH_FEED);
              }}
            >
              {(createTeam, { error, loading }) => (
                <Form error={!!error} style={{ maxWidth: '420px', margin: 'auto' }}>
                  <Form.Input
                    data-testid="name-input"
                    label="Team name"
                    fluid
                    icon="tag"
                    name="name"
                    iconPosition="left"
                    placeholder="Team name"
                    error={this.state.error}
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <Button
                    data-testid="create-team-button"
                    className={s.button}
                    color="blue"
                    loading={loading}
                    disabled={loading}
                    onClick={() => this.createTeam(createTeam)}
                  >
                    Create team
                  </Button>
                  {this.state.error && (
                    <Message negative>
                      <Message.Header>Unable to create team</Message.Header>
                      <p data-testid="error-message">{this.state.error}</p>
                    </Message>
                  )}
                </Form>
              )}
            </Mutation>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(CreateTeamPage);
