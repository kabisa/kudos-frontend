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
      data-testid="kudo-transaction"
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
            <Header data-testid="post-header" transaction={props.transaction} />
          </Card.Header>
          <Card.Description style={{ marginTop: '1em' }}>
            <div data-test="post-message">
              <strong data-testid="sender-name">{props.transaction.sender.name} </strong> gave{' '}
              <strong data-testid="kudo-amount">{props.transaction.amount}₭ </strong>
              to{' '}
              <strong data-testid="post-receivers">
                {props.transaction.receivers.map((item) => item.name).join(', ')}
              </strong>
              {' '}for{' '}<span data-testid="post-message">{props.transaction.message}</span>
            </div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra style={{ padding: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <LikeButton
              data-testid="like-button"
              liked={props.transaction.votes.some((vote) => vote.voter.id === userId)}
              post={props.transaction}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

export default Transaction;
