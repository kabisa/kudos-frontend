import React from "react";
import {Segment} from "semantic-ui-react";
import {Query} from "react-apollo";
import gql from "graphql-tag";

import s from "./Rail.module.scss";

const GET_INFO = gql`
  query GetInfo {
    viewer {
      name
      email
    }
  }
`;

export interface GetInfoResult {
    viewer: {
        name: string;
        email: string;
    }
}

export default () => (
    <Segment className={s.rail} style={{top: "0"}}>
        <Query<GetInfoResult> query={GET_INFO}>
            {({loading, error, data}) => {
                if (loading || !data) return <p> "Loading..." </p>;
                if (error) return <p> `Error! ${error.message}` </p>;

                return <h3>Hello {data.viewer.name}</h3>;
            }}
        </Query>
    </Segment>
);
