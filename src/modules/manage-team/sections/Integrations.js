import React, { Component } from "react";
import { Header, Icon, Divider } from "semantic-ui-react";

export class IntegrationSections extends Component {
  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="settings" />
          <Header.Content>
            Integrations
            <Header.Subheader>Manage integrations</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
      </div>
    );
  }
}
export default IntegrationSections;
