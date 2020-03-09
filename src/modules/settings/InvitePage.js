import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { toast } from "react-toastify";

import settings from "../../config/settings";
import { Navigation, Toolbar } from "../../components/navigation";
import {
  auth,
  getGraphqlError,
  getMultipleEmails,
  ERROR_EMAIL_PARSE,
  ERROR_EMAIL_BLANK,
} from "../../support";

import s from "./Settings.module.scss";

export const MUTATION_CREATE_INVITE = gql`
  mutation CreateInvite($emails: [EmailAddress!]!, $team_id: ID!) {
    createTeamInvite(emails: $emails, teamId: $team_id) {
      teamInvites {
        id
      }
    }
  }
`;

export class InvitePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emails: "",
      error: null,
    };
    this.initialState = this.state;

    auth();

    this.handleChange = this.handleChange.bind(this);
    this.sendInvites = this.sendInvites.bind(this);
  }

  handleChange(e, { value }) {
    this.setState({ emails: value });
  }

  sendInvites(mutate) {
    this.setState({ error: null });
    const { emails } = this.state;
    if (emails.length === 0) {
      this.setState({ error: ERROR_EMAIL_BLANK });
      return;
    }

    const list = getMultipleEmails(emails);

    if (!list) {
      this.setState({ error: ERROR_EMAIL_PARSE });
      return;
    }

    mutate({
      variables: {
        emails: list,
        team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  render() {
    return (
      <div id="root">
        <Toolbar text="Invite members" />
        <div className="main-form">
          <div className={s.page}>
            <Mutation
              mutation={MUTATION_CREATE_INVITE}
              onCompleted={() => {
                this.setState(this.initialState);
                toast.info("Invites sent successfully!");
              }}
            >
              {(createInvite, { error, loading }) => {
                let displayError;
                if (error) {
                  displayError = getGraphqlError(error);
                }
                if (this.state.error) {
                  displayError = this.state.error;
                }
                return (
                  <Form style={{ maxWidth: "420px", margin: "auto" }}>
                    <Form.TextArea
                      name="emails"
                      label="Email addresses"
                      placeholder="info@example.com..."
                      value={this.state.emails}
                      onChange={this.handleChange}
                    />
                    <p style={{ color: "grey" }}>
                      Enter the email addresses of the users you would like to
                      invite. They should be separated by a comma or semicolon.
                      The following formats can be used:
                    </p>
                    <ul style={{ color: "grey" }}>
                      <li>john@example.com</li>
                      <li>John Doe &lt;john@example.com&gt;</li>
                      <li>&quot;John Doe&quot; &lt;john@example.com&gt;</li>
                    </ul>
                    <Button
                      className={s.button}
                      color="blue"
                      loading={loading}
                      disabled={loading}
                      onClick={() => this.sendInvites(createInvite)}
                    >
                      Invite
                    </Button>
                    {displayError && (
                      <Message negative>
                        <Message.Header>Unable to send invites</Message.Header>
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

export default InvitePage;
