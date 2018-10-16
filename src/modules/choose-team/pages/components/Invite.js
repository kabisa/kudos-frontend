import { h } from "preact";
import { Button, Card, Image } from "semantic-ui-react";

export const Invite = () => (
  // <Card style={{ margin: "auto" }}>
  //   <Card.Content>
  //     <Image
  //       floated="right"
  //       size="mini"
  //       src="https://s3.amazonaws.com/uifaces/faces/twitter/dreizle/128.jpg"
  //       circular
  //     />
  //     <Card.Header>Steve Sanders</Card.Header>
  //     <Card.Meta>Friends of Elliot</Card.Meta>
  //     <Card.Description>
  //       Steve wants to add you to the group kabisa.
  //     </Card.Description>
  //   </Card.Content>
  //   <Card.Content extra>
  //     <div className="ui two buttons">
  //       <Button basic color="green">
  //         Approve
  //       </Button>
  //       <Button basic color="red">
  //         Decline
  //       </Button>
  //     </div>
  //   </Card.Content>
  // </Card>
  <div style={{ width: "290px", margin: "auto", paddingBottom: "1em" }}>
    <p style={{ display: "inline", lineHeight: "28px" }}>Kabisa</p>
    <Button color="green" size="small" style={{ float: "right" }}>
      Accept
    </Button>
    <Button color="orange" size="small" style={{ float: "right" }}>
      Decline
    </Button>
  </div>
);

export default Invite;
