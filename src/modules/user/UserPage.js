import { h, Component } from "preact";
import { Button, Image } from "semantic-ui-react";
import { route } from "preact-router";

import { Navigation } from "../../components/navigation";
import { PATH_LOGIN, PATH_RESET_PASSWORD } from "../../routes";
import s from "./UserPage.scss";
import client from "../../apollo";
import { auth } from "../../support";

export class UserPage extends Component {
  constructor(props) {
    super(props);
    auth();

    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.clear();
    client.resetStore();
    route(PATH_LOGIN, true);
  }

  render() {
    const { avatarUrl, name, location } = this.props;
    return (
      <div>
        <div
          className="page flex"
          style={{ padding: "2em", justifyContent: "space-between" }}
        >
          <div>
            <Image src={avatarUrl} circular className={s.image} />
            <h2 className={s.name}>{name}</h2>
            <span className={s.sub_text}>{location}</span>
          </div>
          <div>
            <a
              href={`${PATH_RESET_PASSWORD}?transition=slideup`}
              className={s.button_wrapper}
            >
              <Button color="orange" className={s.button}>
                Reset password
              </Button>
            </a>
            <Button color="red" onClick={this.logout} className={s.button}>
              Log out
            </Button>
          </div>
        </div>

        <Navigation />
      </div>
    );
  }
}

export default UserPage;
