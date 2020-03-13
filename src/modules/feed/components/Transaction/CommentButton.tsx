import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export interface Props {
  transactionId: string;
  text: string;
}

function CommentButton(props: Props): React.ReactElement {
  return (
    <Button size="mini" basic className="button-action">
      <Icon name="comment outline" />
      {props.text}
    </Button>
  );
}

export default CommentButton;
