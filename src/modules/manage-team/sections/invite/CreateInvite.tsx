import { Component } from "react";
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
import s from "./Invite.module.css";
import { Storage } from "../../../../support/storage";
import MessageBox from "../../../../ui/MessageBox";
import { Button, Label } from "@kabisa/ui-components";

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
  refetch?: () => void;
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
          this.props.refetch?.();
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
            <form>
              <Label>
                Email addresses
                <textarea
                  data-testid="email-input"
                  name="emails"
                  placeholder="info@example.com..."
                  value={this.state.emails}
                  onChange={(e) => this.setState({ emails: e.target.value })}
                  className={s.textarea}
                />
              </Label>

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
                variant="primary"
                disabled={loading}
                onClick={() => this.sendInvites(createInvite)}
              >
                Invite
              </Button>
              {displayError && (
                <MessageBox
                  variant="error"
                  title="Unable to send invites"
                  message={displayError}
                />
              )}
            </form>
          );
        }}
      </Mutation>
    );
  }
}
