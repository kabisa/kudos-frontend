import { h, Component } from "preact";
import { Header, Icon, Divider } from "semantic-ui-react";

export class KudometerSection extends Component {
  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="settings" />
          <Header.Content>
            Kudometer
            <Header.Subheader>Manage goals</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
      </div>
    );
  }
}
export default KudometerSection;
