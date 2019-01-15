import { h, Component } from "preact";
import { Header, Icon, Divider } from "semantic-ui-react";

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
      </div>
    );
  }
}
export default GuidelineSection;
