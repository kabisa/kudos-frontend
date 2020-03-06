import React from "react";

const Comment = () => (
  <Comment>
    <Comment.Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
    <Comment.Content>
      <Comment.Author as="a">Matt</Comment.Author>
      <Comment.Metadata>
        <div>Today at 5:42PM</div>
      </Comment.Metadata>
      <Comment.Text>How artistic!</Comment.Text>
      <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  </Comment>
);

export default Comment;
