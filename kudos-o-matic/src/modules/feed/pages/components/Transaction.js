import React from 'react';
import { Card } from 'semantic-ui-react';

import { TransactionProp } from '../../../../proptypes';
import ActionButton from './ActionButton';
import Header from './Header';

const Transaction = ({ transaction }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', paddingBottom: '8px', textAlign: 'initial' }}
  >
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Card.Header>
          <Header
            url={transaction.author.avatar_url}
            name={transaction.author.name}
            createdOn={transaction.created_on}
          />
        </Card.Header>
        <Card.Description>{transaction.message}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ActionButton icon="heart outline" text={transaction.likes} color="green" />
          <ActionButton icon="comment outline" text={transaction.comments} />
          <ActionButton icon="share" text="Share" />
        </div>
      </Card.Content>
    </Card>
  </div>
);

Transaction.propTypes = {
  transaction: TransactionProp.isRequired
};

export default Transaction;
