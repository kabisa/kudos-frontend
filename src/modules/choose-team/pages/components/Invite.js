import { h } from "preact";
import { Button, Card, Image } from "semantic-ui-react";

export const Invite = () => (
  <Card style={{ margin: "auto" }}>
    <Card.Content>
      <Image
        floated="right"
        size="mini"
        src="https://s3.amazonaws.com/uifaces/faces/twitter/dreizle/128.jpg"
        circular
      />
      <Card.Header>Steve Sanders</Card.Header>
      <Card.Meta>Friends of Elliot</Card.Meta>
      <Card.Description>
        Steve wants to add you to the group kabisa.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="green">
          Approve
        </Button>
        <Button basic color="red">
          Decline
        </Button>
      </div>
    </Card.Content>
  </Card>
);

export default Invite;
