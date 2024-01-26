import { gql } from "@apollo/client";
import { FRAGMENT_POST } from "../fragments/postInFeed.graphql";

export const GET_POSTS = gql`
  query postsConnection($team_id: ID!, $end: String) {
    teamById(id: $team_id) {
      id
      posts(first: 10, after: $end, orderBy: "created_at desc") {
        edges {
          cursor
          node {
            ...PostInFeed
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${FRAGMENT_POST}
`;
