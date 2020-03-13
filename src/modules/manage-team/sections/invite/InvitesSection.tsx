/* eslint-disable no-shadow */
import React, { Component, FormEvent } from 'react';
import {
  Button, Divider, Form, Header, Icon, Message, Table,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { toast } from 'react-toastify';
import settings from '../../../../config/settings';

import {
  ERROR_EMAIL_BLANK, ERROR_EMAIL_PARSE, getGraphqlError, getMultipleEmails,
} from '../../../../support';
import { Invite } from './Invite';

export const MUTATION_CREATE_INVITE = gql`
    mutation CreateInvite($emails: [EmailAddress!]!, $team_id: ID!) {
        createTeamInvite(emails: $emails, teamId: $team_id) {
            teamInvites {
                id
            }
        }
    }
`;

export const MUTATION_DELETE_INVITE = gql`
    mutation DeleteTeamInvite($id: ID!) {
        deleteTeamInvite(teamInviteId: $id) {
            teamInviteId
        }
    }
`;

export const QUERY_GET_INVITES = gql`
    query getInvites($team_id: ID!) {
        teamById(id: $team_id) {
            teamInvites {
                acceptedAt
                declinedAt
                email
                id
                sentAt
            }
        }
    }
`;

export interface CreateInviteParameters {
  emails: string[];
  team_id: number;
}

export interface DeleteInviteParameters {
  id: number;
}

export interface GetInvitesResult {
  teamById: {
    teamInvites: InviteModel[];
  };
}

export interface InviteModel {
  acceptedAt: string;
  declinedAt: string;
  email: string;
  id: number;
  sentAt: string;
}

export interface Props {}

export interface State {
  emails: string;
  error: string;
}

export class InviteSection extends Component<Props, State> {
  initialState: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      emails: '',
      error: '',
    };
    this.initialState = this.state;

    this.handleChange = this.handleChange.bind(this);
    this.sendInvites = this.sendInvites.bind(this);
  }

  handleChange(e: FormEvent, { value }: any) {
    this.setState({ emails: value });
  }

  sendInvites(mutate: any) {
    this.setState({ error: '' });
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
      <div>
        <Header as="h2">
          <Icon name="paper plane" />
          <Header.Content>
            Invites
            <Header.Subheader>Manage invites</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Mutation<CreateInviteParameters>
          mutation={MUTATION_CREATE_INVITE}
          onCompleted={() => {
            this.setState(this.initialState);
            toast.info('Invites sent successfully!');
          }}
          refetchQueries={[
            {
              query: QUERY_GET_INVITES,
              variables: {
                team_id: localStorage.getItem(settings.TEAM_ID_TOKEN),
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
              <Form onSubmit={() => this.sendInvites(createInvite)}>
                <p style={{ color: 'grey' }}>
                  Enter the email addresses of the users you would like to invite. They should be
                  separated by a comma or semicolon. The following formats can be used:
                </p>
                <ul style={{ color: 'grey' }}>
                  <li>john@example.com</li>
                  <li>John Doe &lt;john@example.com&gt;</li>
                  <li>&quot;John Doe&quot; &lt;john@example.com&gt;</li>
                </ul>
                <Form.TextArea
                  required
                  name="emails"
                  label="Email addresses"
                  placeholder="info@example.com..."
                  value={this.state.emails}
                  onChange={this.handleChange}
                />
                <Button color="blue" loading={loading} disabled={loading} type="submit">
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
        <Divider />
        <Query<GetInvitesResult>
          query={QUERY_GET_INVITES}
          variables={{ team_id: localStorage.getItem(settings.TEAM_ID_TOKEN) }}
        >
          {({ loading, error, data }) => {
            if (loading || !data) return <p>Loading...</p>;
            if (error) return <p>Error! {error.message}</p>;

            return (
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Send at</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {data.teamById.teamInvites.map((item) => <Invite key={item.id} invite={item} />)}
                </Table.Body>
              </Table>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default InviteSection;
