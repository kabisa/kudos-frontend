import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom"
import settings from "../../config/settings";
import { getGraphqlError, ERROR_NAME_BLANK } from "../../support";
import { Navigation, Toolbar } from "../../components/navigation";
import { PATH_FEED } from "../../routes";
import { authAllowNoTeam } from "../../support";

import s from "../user/UserPage.module.scss";

export const MUTATION_CREATE_TEAM = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      team {
        id
      }
    }
  }
`;

class CreateTeamPage extends Component {
  constructor(props) {
    super(props);

    this.cleanErrors = {
      error: null,
      error_name: null,
    };

    this.state = {
      name: "",
      ...this.cleanErrors,
    };

    this.initialState = this.state;

    authAllowNoTeam();

    this.createTeam = this.createTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
  }

  checkErrors() {
    const { name } = this.state;
    this.setState(this.cleanErrors);

    if (!name) {
      this.setState({ error: ERROR_NAME_BLANK, error_current: true });
      return false;
    }
    return true;
  }

  createTeam(mutate) {
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

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render(props, state) {
    return (
      <div id="root">
        <Toolbar text="Create team" />
        <div className="main-form">
          <div className={s.page}>
            <Mutation
              mutation={MUTATION_CREATE_TEAM}
              onCompleted={({ createTeam }) => {
                this.setState(this.initialState);
                localStorage.setItem(
                  settings.TEAM_ID_TOKEN,
                  createTeam.team.id
                );
                toast.info("Team created successfully!");
                return <Redirect to={PATH_FEED} />;
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
                  <Form style={{ maxWidth: "420px", margin: "auto" }}>
                    <Form.Input
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

export default CreateTeamPage;
