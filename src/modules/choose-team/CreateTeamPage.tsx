import React, { ChangeEvent, Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import settings from '../../config/settings';
import { ERROR_NAME_BLANK, getGraphqlError } from '../../support';
import { Navigation, Toolbar } from '../../components/navigation';
import { PATH_FEED } from '../../routes';

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
  error_name: string;
}

class CreateTeamPage extends Component<Props, State> {
  cleanErrors: {
    error: string;
    error_name: string;
  };

  initialState: State;

  constructor(props: Props) {
    super(props);

    this.cleanErrors = {
      error: '',
      error_name: '',
    };

    this.state = {
      name: '',
      ...this.cleanErrors,
    };

    this.initialState = this.state;

    this.createTeam = this.createTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
  }

  checkErrors() {
    const { name } = this.state;
    this.setState(this.cleanErrors);

    if (!name) {
      this.setState({ error: ERROR_NAME_BLANK });
      return false;
    }
    return true;
  }

  createTeam(mutate: any) {
    const { name } = this.state;

    if (!this.checkErrors()) {
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
              onCompleted={({ createTeam }) => {
                this.setState(this.initialState);
                localStorage.setItem(settings.TEAM_ID_TOKEN, createTeam.team.id);
                toast.info('Team created successfully!');
                this.props.history.push(PATH_FEED);
              }}
            >
              {(createTeam, { error, loading }) => {
                let displayError;
                if (error) {
                  displayError = getGraphqlError(error);
                }
                if (this.state.error) {
                  displayError = this.state.error;
                }
                return (
                  <Form style={{ maxWidth: '420px', margin: 'auto' }}>
                    <Form.Input
                      data-testid="create-team-input"
                      label="Team name"
                      fluid
                      icon="tag"
                      name="name"
                      iconPosition="left"
                      placeholder="Team name"
                      error={this.state.error_name}
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
                    {displayError && (
                    <Message negative>
                      <Message.Header>Unable to create team</Message.Header>
                      <p>{displayError}</p>
                    </Message>
                    )}
                  </Form>
                );
              }}
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
