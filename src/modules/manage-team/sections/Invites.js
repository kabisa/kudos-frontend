import { h, Component } from "preact";
import { Header, Icon, Divider } from "semantic-ui-react";

export class InviteSection extends Component {
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
      </div>
    );
  }
}
export default InviteSection;
