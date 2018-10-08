import React from 'react';
import { Card } from 'semantic-ui-react';

import { TransactionProp } from '../../../../../proptypes';
import CommentButton from './CommentButton/CommentButton';
import { LikeButton } from './LikeButton';
import Header from './Header/Header';

const Transaction = ({ transaction }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '4px',
      paddingTop: '4px',
      textAlign: 'initial',
      margin: 'auto',
      maxWidth: '420px'
    }}
  >
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Card.Header>
          <Header
            name={transaction.author.name}
            receivers={transaction.receivers}
            authorUrl={transaction.author.avatar_url}
            createdOn={transaction.created_on}
            kudos={transaction.kudos}
          />
        </Card.Header>
        <Card.Description style={{ marginTop: '1em' }}>{transaction.message}</Card.Description>
      </Card.Content>
      <Card.Content extra style={{ padding: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <LikeButton
            transactionId={transaction.id}
            liked={transaction.liked}
            likes={transaction.likes}
          />
          <CommentButton text={transaction.comments} />
        </div>
      </Card.Content>
    </Card>
  </div>
);

Transaction.propTypes = {
  transaction: TransactionProp.isRequired
};

export default Transaction;
