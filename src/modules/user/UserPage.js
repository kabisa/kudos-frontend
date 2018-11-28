import { h, Component } from "preact";
import { Button } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Navigation } from "../../components/navigation";
import { authAllowNoTeam, logout } from "../../support";

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
    authAllowNoTeam();
  }

  render() {
    return (
      <div>
        <div
          className="page flex"
          style={{ padding: "2em", justifyContent: "space-between" }}
        >
          <div style={{ display: "grid" }}>
            <Query query={GET_USER}>
              {({ data }) => (
                <h2 className={s.name}>
                  {data.viewer ? data.viewer.self.name : "Loading..."}
                </h2>
              )}
            </Query>
          </div>
          <div>
            <Button color="red" onClick={logout} className={s.button}>
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
