import { h, Component } from "preact";
import PropTypes from "prop-types";
import { connect } from "preact-redux";
import { route } from "preact-router";
import { Feed, Icon } from "semantic-ui-react";

import { Navigation } from "../../../components/navigation";
import { PATH_LOGIN } from "../../../routes";

import s from "./NotificationsPage.scss";

export class NotificationsPage extends Component {
  constructor(props) {
    super(props);

    // Check login
    if (!props.isLoggedIn) {
      route(PATH_LOGIN, true);
    }
  }

  render() {
    return (
      <div>
        <div className={s.page}>
          <Feed>
            <Feed.Event>
              <Feed.Label>
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>Elliot Fu</Feed.User> added you as a friend
                  <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like" />4 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label>
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>Elliot Fu</Feed.User> added you as a friend
                  <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like" />4 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label>
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary className={s.normal_font}>
                  <Feed.User>Elliot Fu</Feed.User> added you as a friend
                  <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like" />4 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label>
                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/exentrich/128.jpg" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary className={s.normal_font}>
                  <Feed.User>Elliot Fu</Feed.User> added you as a friend
                  <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like" />4 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </div>
        <Navigation />
      </div>
    );
  }
}

NotificationsPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.token !== null,
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage);
