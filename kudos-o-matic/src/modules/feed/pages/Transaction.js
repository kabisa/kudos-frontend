import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Button } from 'semantic-ui-react';

const Transaction = props => (
  <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '8px' }}>
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Card.Header>Author</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description>{props.transaction.message}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size="mini" basic color="green">
            <Icon name="heart outline" />
            Like
          </Button>
          <Button size="mini" basic>
            <Icon name="comment outline" />
            Comments
          </Button>
          <Button size="mini" basic>
            <Icon name="user outline" />
            Share
          </Button>
        </div>
      </Card.Content>
    </Card>
  </div>
);

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired
};

export default Transaction;
