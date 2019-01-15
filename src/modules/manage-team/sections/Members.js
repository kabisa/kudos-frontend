import { h, Component } from "preact";
import { Header, Icon, Divider } from "semantic-ui-react";

export class MemberSection extends Component {
  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="settings" />
          <Header.Content>
            Members
            <Header.Subheader>Manage team members</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        {/* <Query ></Query> */}
      </div>
    );
  }
}
export default MemberSection;
