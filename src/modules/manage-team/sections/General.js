import { h, Component } from "preact";
import { Header, Icon, Divider } from "semantic-ui-react";

export class GeneralSection extends Component {
  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="settings" />
          <Header.Content>
            General
            <Header.Subheader>Manage your team settings</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
      </div>
    );
  }
}
export default GeneralSection;
