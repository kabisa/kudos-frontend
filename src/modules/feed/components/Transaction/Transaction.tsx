import React from 'react';
import { Card } from 'semantic-ui-react';
import LikeButton from './LikeButton';
import { Header } from './Header';
import settings from '../../../../config/settings';
import { FragmentPostResult } from '../../queries';

const userId = localStorage.getItem(settings.USER_ID_TOKEN);

export interface TransactionProps {
  transaction: FragmentPostResult;
}

function Transaction(props: TransactionProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '4px',
        paddingTop: '4px',
        textAlign: 'initial',
        margin: 'auto',
        maxWidth: '420px',
      }}
    >
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>
            <Header transaction={props.transaction} />
          </Card.Header>
          <Card.Description style={{ marginTop: '1em' }}>
            <div data-testid="post-message">
              <strong>{props.transaction.sender.name}</strong> gave{' '}
              <strong>{props.transaction.amount}₭ </strong>
              to <strong>{props.transaction.receivers.map((item) => item.name).join(', ')}</strong> for{' '}
              {props.transaction.message}
            </div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra style={{ padding: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <LikeButton
              transactionId={props.transaction.id}
              liked={props.transaction.votes.some((vote) => vote.voter.id === userId)}
              likes={props.transaction.votes.length}
              post={props.transaction}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

export default Transaction;
