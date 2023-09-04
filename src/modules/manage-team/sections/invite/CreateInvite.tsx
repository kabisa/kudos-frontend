import React, { Component, FormEvent } from "react";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import { gql } from "@apollo/client";
import {
  ERROR_EMAIL_BLANK,
  ERROR_EMAIL_PARSE,
  getGraphqlError,
  getMultipleEmails,
} from "../../../../support";
import settings from "../../../../config/settings";
import s from "../../../settings/Settings.module.scss";
import { QUERY_GET_INVITES } from "./InvitesSection";
import { Storage } from "../../../../support/storage";
import { Label } from "semantic-ui-react";
import { Button } from "@sandercamp/ui-components";

export const MUTATION_CREATE_INVITE = gql`
  mutation CreateInvite($emails: [EmailAddress!]!, $team_id: ID!) {
    createTeamInvite(emails: $emails, teamId: $team_id) {
      teamInvites {
        id
      }
    }
  }
`;

export interface CreateInviteParameters {
  emails: string[];
  team_id: string;
}

export interface Props {
  // future props fo here
}

export interface State {
  emails: string;
  error: string;
}

export class CreateInvite extends Component<Props, State> {
  initialState: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      emails: "",
      error: "",
    };
    this.initialState = this.state;

    this.sendInvites = this.sendInvites.bind(this);
  }

  sendInvites(mutate: any) {
    this.setState({ error: "" });
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
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      },
    });
  }

  render() {
    return (
      <Mutation<CreateInviteParameters>
        mutation={MUTATION_CREATE_INVITE}
        onCompleted={() => {
          this.setState(this.initialState);
          toast.info("Invites sent successfully!");
        }}
        refetchQueries={[
          {
            query: QUERY_GET_INVITES,
            variables: {
              team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
            },
          },
        ]}
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
            <form>
              <Label htlmFor="emails">Email addresses</Label>
              <textarea
                data-testid="email-input"
                name="emails"
                placeholder="info@example.com..."
                value={this.state.emails}
                onChange={(e) => this.setState({ emails: e.target.value })}
              />
              <p className={s.grey}>
                Enter the email addresses of the users you would like to invite.
                They should be separated by a comma or semicolon. The following
                formats can be used:
              </p>
              <ul className={s.grey}>
                <li>john@example.com</li>
                <li>John Doe &lt;john@example.com&gt;</li>
                <li>&quot;John Doe&quot; &lt;john@example.com&gt;</li>
              </ul>
              <Button
                className={s.button}
                variant="primary"
                disabled={loading}
                onClick={() => this.sendInvites(createInvite)}
              >
                Invite
              </Button>
              {displayError && (
                <div className="errorMessage">
                  <h2>Unable to send invites</h2>
                  <p>{displayError}</p>
                </div>
              )}
            </form>
          );
        }}
      </Mutation>
    );
  }
}
