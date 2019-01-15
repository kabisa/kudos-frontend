import { h, Component } from "preact";
import { Header, Icon, Divider, Table } from "semantic-ui-react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import settings from "src/config/settings";

export const GET_GUIDELINES = gql`
  query Guidelines($team_id: ID!) {
    teamById(id: $team_id) {
      guidelines {
        id
        kudos
        name
      }
    }
  }
`;

export class GuidelineSection extends Component {
  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="settings" />
          <Header.Content>
            Guidelines
            <Header.Subheader>Manage guidelines</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Query
          query={GET_GUIDELINES}
          variables={{ team_id: localStorage.getItem(settings.TEAM_ID_TOKEN) }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Kudos</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {data.teamById.guidelines.map(item => {
                    return (
                      <Table.Row key={item.id}>
                        <Table.Cell>{item.kudos}</Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell />
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
export default GuidelineSection;
