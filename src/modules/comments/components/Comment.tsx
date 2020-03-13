import React from 'react';
import { Comment as SemComment } from 'semantic-ui-react';

function Comment(): React.ReactElement {
  return (
    <SemComment>
      <SemComment.Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
      <SemComment.Content>
        <SemComment.Author as="a">Matt</SemComment.Author>
        <SemComment.Metadata>
          <div>Today at 5:42PM</div>
        </SemComment.Metadata>
        <SemComment.Text>How artistic!</SemComment.Text>
        <SemComment.Actions>
          <SemComment.Action>Reply</SemComment.Action>
        </SemComment.Actions>
      </SemComment.Content>
    </SemComment>
  );
}

export default Comment;
