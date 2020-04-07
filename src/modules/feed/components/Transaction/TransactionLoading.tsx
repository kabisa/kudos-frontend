import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

const TransactionLoading = () => (
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
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Card.Header>
        <Card.Description style={{ marginTop: '1em' }}>
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
