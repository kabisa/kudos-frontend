import { h, Component } from "preact";
import { Button, Image } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { PATH_RESET_PASSWORD } from "../../routes";
import { Navigation } from "../../components/navigation";
import { authAllowNoTeam, logout } from "../../support";

import s from "./UserPage.scss";

export const GET_USER = gql`
  query getUser {
    viewer {
      self {
        name
        avatar
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
                <div>
                  <h2 className={s.name}>
                    {data.viewer ? data.viewer.self.name : "Loading..."}
                  </h2>
                  <Image
                    src={data.viewer ? data.viewer.self.avatar : null}
                    size="tiny"
                    avatar
                    style={{ marginTop: "2em", marginBottom: "1em" }}
                  />
                  <span style={{ display: "block", marginBottom: "2em" }}>
                    To change your avatar go to{" "}
                    <a
                      href="https://nl.gravatar.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      gravatar.com
                    </a>
                    .
                  </span>
                </div>
              )}
            </Query>
          </div>
          <div style={{ display: "contents" }}>
            <a href={PATH_RESET_PASSWORD}>
              <Button color="blue" className={s.button}>
                Change password
              </Button>
            </a>
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
