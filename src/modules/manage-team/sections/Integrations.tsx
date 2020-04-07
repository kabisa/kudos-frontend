import React from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react';

export function IntegrationSections() {
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

export default IntegrationSections;
