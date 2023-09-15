import { Component } from "react";
import { Button } from "@sandercamp/ui-components";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { History } from "history";
import { toast } from "react-toastify";

import { Auth } from "../../support";
import settings from "../../config/settings";
import { Storage } from "../../support/storage";
import { PATH_RESET_PASSWORD } from "../../routes";
import {
  SlackConnectedSegment,
  SlackDisconnectedSegment,
} from "./SlackSection";

import s from "./UserPage.module.css";
import Segment from "../../components/atoms/Segment";
import Page from "../../components/templates/Page";

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

export class UserPage extends Component<Props, State> {
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
      <Page>
        <Segment>
          <div className={s.content}>
            <Query<GetUserResult> query={GET_USER}>
              {({ loading, data }) => {
                if (loading)
                  return <span data-testid="loading">Loading...</span>;
                if (!data || !data.viewer)
                  return <span>Something went wrong</span>;

                return (
                  <>
                    <h2 className={s.name}>{data.viewer.name}</h2>
                    <img
                      src={data && data.viewer ? data.viewer.avatar : undefined}
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
                      <SlackConnectedSegment
                        slackIconPath={this.slackIconPath}
                      />
                    ) : (
                      <SlackDisconnectedSegment
                        slackIconPath={this.slackIconPath}
                        slackConnectUrl={this.slackConnectUrl}
                      />
                    )}
                  </>
                );
              }}
            </Query>
            <div>
              <Button
                className={s.button}
                onClick={() => this.props.history.push(PATH_RESET_PASSWORD)}
              >
                Change password
              </Button>
              <Button
                variant="secondary"
                onClick={() => Auth.logout()}
                className={s.button}
              >
                Log out
              </Button>
            </div>
          </div>
        </Segment>
      </Page>
    );
  }
}

// @ts-ignore
export default withRouter(UserPage);
