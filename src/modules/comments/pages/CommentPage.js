import { h, Component } from "preact";
import PropTypes from "prop-types";
import { connect } from "preact-redux";
import { route } from "preact-router";
import { Dimmer, Loader, Feed, Icon, Comment, Header } from "semantic-ui-react";
import moment from "moment-twitter";

import { Toolbar } from "../../../components/navigation";
import { PATH_LOGIN } from "../../../routes";
import { getTransaction } from "../../feed/actions";

import s from "./CommentPage.scss";

export class CommentPage extends Component {
  constructor(props) {
    super(props);

    // Check login
    if (!props.isLoggedIn) {
      route(PATH_LOGIN, true);
    }

    if (!props.transactions.find(item => item.id == props.comment)) {
      props.getTransaction(props.comment);
    }
  }

  render() {
    const transaction = this.props.transactions.find(
      item => item.id == this.props.comment
    );

    if (!transaction) {
      return (
        <div className={s.root}>
          <Toolbar text=" Comments" />
          <div className={s.page}>
            <Dimmer active inverted className={s.dimmer}>
              <Loader inverted />
            </Dimmer>
          </div>
        </div>
      );
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
                  <a>Joe Henderson</a> posted on his page
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

            <Comment>
              <Comment.Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>
                    This has been very useful for my research. Thanks as well!
                  </p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                <Comment>
                  <Comment.Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
                  <Comment.Content>
                    <Comment.Author as="a">Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <div>Just now</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      Elliot you are always so right :)
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>

            <Comment>
              <Comment.Avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Joe Henderson</Comment.Author>
                <Comment.Metadata>
                  <div>5 days ago</div>
                </Comment.Metadata>
                <Comment.Text>
                  Dude, this is awesome. Thanks so much
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </div>
      </div>
    );
  }
}

CommentPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  transaction: PropTypes.array,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.token !== null,
  transactions: state.feed.transactions,
});
const mapDispatchToProps = {
  getTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentPage);
