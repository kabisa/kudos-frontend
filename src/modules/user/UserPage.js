import { h, Component } from "preact";
import { Button } from "semantic-ui-react";
import { route } from "preact-router";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Navigation } from "../../components/navigation";
import { PATH_LOGIN } from "../../routes";
import client from "../../apollo";
import { auth } from "../../support";

import s from "./UserPage.scss";

export const GET_USER = gql`
  query getUser {
    viewer {
      self {
        name
      }
    }
  }
`;

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
    window.location.reload();
  }

  render() {
    return (
      <div>
        <div
          className="page flex"
          style={{ padding: "2em", justifyContent: "space-between" }}
        >
          <div>
            <Query query={GET_USER}>
              {({ data }) => (
                <div>
                  <h2 className={s.name}>
                    {data.viewer ? data.viewer.self.name : "Loading..."}
                  </h2>
                </div>
              )}
            </Query>
          </div>
          <div>
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
