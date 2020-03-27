import React from 'react';
import {
  Dimmer, Loader, Feed, Icon, Header, Comment,
} from 'semantic-ui-react';

import { Comment as CommentItem } from './components';

import s from './CommentPage.module.scss';
import { Toolbar } from '../../components/navigation';

const moment = require('moment-twitter');

const Loading = () => (
  <div className={s.root}>
    <Toolbar text=" Comments" />
    <div className={s.page}>
      <Dimmer active inverted className={s.dimmer}>
        <Loader inverted />
      </Dimmer>
    </div>
  </div>
);

export interface CommentProps {
  transactions: any;
  comment: any;
}

function CommentPage(props: CommentProps): React.ReactElement {
  const transaction = props.transactions.find((item: any) => item.id === props.comment);

  if (!transaction) {
    return <Loading />;
  }
  const timestamp = moment(transaction.created_on);

  return (
    <div className={s.root}>
      <Toolbar text="Comments" />
      <div className={s.left_page}>
        <Feed>
          <Feed.Event>
            <Feed.Label image="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
            <Feed.Content>
              <Feed.Summary>
                {' '}
                posted on his page
                <Feed.Date>{timestamp.twitter()} ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra text>{transaction.message}</Feed.Extra>
              <Feed.Meta>
                <Feed.Like>
                  <Icon name="like" />
                  {transaction.likes} Likes
                </Feed.Like>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        </Feed>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>

          <Comment>
            <Comment.Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
            <Comment.Content>
              <Comment.Author as="a">Elliot Fu</Comment.Author>
              <Comment.Metadata>
                <div>Yesterday at 12:30AM</div>
              </Comment.Metadata>
              <Comment.Text>
                <p>This has been very useful for my research. Thanks as well!</p>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>

            <Comment.Group>
              <CommentItem />
            </Comment.Group>
          </Comment>
          <CommentItem />
        </Comment.Group>
      </div>
    </div>
  );
}

export default CommentPage;