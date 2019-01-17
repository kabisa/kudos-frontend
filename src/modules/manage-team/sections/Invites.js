import { h, Component } from "preact";
import {
  Header,
  Icon,
  Divider,
  Button,
  Form,
  Message,
  Table,
} from "semantic-ui-react";
import * as moment from "moment";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import settings from "src/config/settings";

import {
  getGraphqlError,
  getMultipleEmails,
  ERROR_EMAIL_PARSE,
  ERROR_EMAIL_BLANK,
} from "../../../support";

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

export class InviteSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emails: "",
      error: null,
    };
    this.initialState = this.state;

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
      <div>
        <Header as="h2">
          <Icon name="settings" />
          <Header.Content>
            Invites
            <Header.Subheader>Manage invites</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Mutation
          mutation={MUTATION_CREATE_INVITE}
          onCompleted={() => {
            this.setState(this.initialState);
            toast.info("Invites sent successfully!");
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
                <p style={{ color: "grey" }}>
                  Enter the email addresses of the users you would like to
                  invite. They should be separated by a comma or semicolon. The
                  following formats can be used:
                </p>
                <ul style={{ color: "grey" }}>
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
                <Button
                  color="blue"
                  loading={loading}
                  disabled={loading}
                  type="submit"
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
        <Divider />
        <Query
          query={QUERY_GET_INVITES}
          variables={{ team_id: localStorage.getItem(settings.TEAM_ID_TOKEN) }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

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
                  {data.teamById.teamInvites.map(item => {
                    let rowClassName = "";
                    if (item.declinedAt) {
                      rowClassName = "negative";
                    } else if (item.acceptedAt) {
                      rowClassName = "positive";
                    }
                    return (
                      <Table.Row key={item.id} className={rowClassName}>
                        <Table.Cell>
                          {moment(item.sentAt).format("YYYY-MM-DD")}
                        </Table.Cell>
                        <Table.Cell>{item.email}</Table.Cell>
                        <Table.Cell>
                          {item.acceptedAt && "Accepted"}
                          {item.declinedAt && "Declined"}
                          {!item.declinedAt && !item.acceptedAt && "Pending"}
                        </Table.Cell>
                        <Table.Cell>
                          <Mutation
                            mutation={MUTATION_DELETE_INVITE}
                            onCompleted={() => {
                              toast.info("Invite removed successfully!");
                            }}
                            refetchQueries={[
                              {
                                query: QUERY_GET_INVITES,
                                variables: {
                                  team_id: localStorage.getItem(
                                    settings.TEAM_ID_TOKEN
                                  ),
                                },
                              },
                            ]}
                          >
                            {(deleteInvite, { loading }) => {
                              return (
                                <Button
                                  color="red"
                                  icon="trash"
                                  size="tiny"
                                  loading={loading}
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Are you sure you want to remove this invite?"
                                      )
                                    ) {
                                      deleteInvite({
                                        variables: { id: item.id },
                                      });
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
            );
          }}
        </Query>
      </div>
    );
  }
}
export default InviteSection;
