import React from "react";
import { Button, Image, Segment } from "semantic-ui-react";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";

import { withRouter } from "react-router-dom";
import { History } from "history";
import { toast } from "react-toastify";
import { Navigation } from "../../components/navigation";
import { Auth } from "../../support";
import s from "./UserPage.module.scss";
import settings from "../../config/settings";
import { Storage } from "../../support/storage";
import { PATH_RESET_PASSWORD } from "../../routes";
import {
  SlackConnectedSegment,
  SlackDisconnectedSegment,
} from "./SlackSection";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const queryString = require("query-string");

export const DISCONNECT_SLACK = gql`
  mutation disconnectSlack {
    disconnectSlack {
      user {
        id
      }
    }
  }
`;

export interface DisconnectSlackResult {
  data: {
    disconnectSlack: {
      user: {
        id: string;
      };
    };
  };
}

export const GET_USER = gql`
  query getUser {
    viewer {
      name
      avatar
      slackId
    }
  }
`;

export interface GetUserResult {
  viewer: {
    name: string;
    avatar: string;
    slackId: string;
    slackRegistrationToken: string;
  };
}

export interface Props {
  history: History;
}

export interface State {
  // Future state vars go here
}

export class UserPage extends React.Component<Props, State> {
  slackConnectUrl = `${settings.API_BASE_URL}/auth/slack/user/${Storage.getItem(
    settings.USER_ID_TOKEN,
  )}`;

  slackIconPath = `${process.env.PUBLIC_URL}/assets/slack_logo.png`;

  constructor(props: Props) {
    super(props);

    const parsed = queryString.parse(this.props.history.location.search);
    const { auth } = parsed;

    if (auth === "ok") {
      toast.success("Your account has been connected to Slack!");
    }
  }

  render() {
    return (
      <div>
        <div className={`page text-center ${s.container}`}>
          <Segment>
            <div className={s.content}>
              <Query<GetUserResult> query={GET_USER}>
                {({ loading, data }) => {
                  if (loading)
                    return <span data-testid="loading">Loading...</span>;
                  if (!data || !data.viewer)
                    return <span>Something went wrong</span>;

                  return (
                    <div>
                      <h2 className={s.name}>{data.viewer.name}</h2>
                      <Image
                        src={data && data.viewer ? data.viewer.avatar : null}
                        size="tiny"
                        avatar
                        className={s.image}
                      />
                      <span className={s.image_caption}>
                        To change your avatar go to{" "}
                        <a
                          href="https://nl.gravatar.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          gravatar.com
                        </a>
                      </span>
                      {data && data.viewer.slackId ? (
                        <SlackConnectedSegment />
                      ) : (
                        <SlackDisconnectedSegment
                          slackIconPath={this.slackIconPath}
                          slackConnectUrl={this.slackConnectUrl}
                        />
                      )}
                    </div>
                  );
                }}
              </Query>
              <Button
                data-testid="reset-password-btn"
                color="blue"
                className={s.button}
                onClick={() => this.props.history.push(PATH_RESET_PASSWORD)}
              >
                Change password
              </Button>
              <Button
                color="red"
                onClick={() => Auth.logout()}
                className={s.button}
              >
                Log out
              </Button>
            </div>
          </Segment>
        </div>

        <Navigation />
      </div>
    );
  }
}

// @ts-ignore
export default withRouter(UserPage);
