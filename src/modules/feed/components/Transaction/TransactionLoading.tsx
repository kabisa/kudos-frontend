import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';
import s from './TransactionLoading.module.scss';

const TransactionLoading = () => (
  <div className={s.container}>
    <Card className={s.card}>
      <Card.Content>
        <Card.Header>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Card.Header>
        <Card.Description className={s.card_description}>
          <Placeholder>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        </Card.Description>
      </Card.Content>
    </Card>
  </div>
);

export default TransactionLoading;
