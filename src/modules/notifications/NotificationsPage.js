import { h, Component } from "preact";
import { Feed, Icon } from "semantic-ui-react";

import { Navigation } from "../../components/navigation";
import { auth } from "../../support";

import s from "./NotificationsPage.scss";

export class NotificationsPage extends Component {
  constructor(props) {
    super(props);
    auth();
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

export default NotificationsPage;
