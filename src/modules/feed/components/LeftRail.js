import { h } from "preact";
import { Segment } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import s from "./Rail.scss";

const GET_INFO = gql`
  query GetInfo {
    viewer {
      self {
        name
        email
      }
    }
  }
`;

export default () => (
  <Segment className={s.rail}>
    <Query query={GET_INFO}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return <h3>Hello {data.viewer.self.name}</h3>;
      }}
    </Query>
  </Segment>
);
