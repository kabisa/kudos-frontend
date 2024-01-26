import { gql } from "@apollo/client";

export const FRAGMENT_POST = gql`
  fragment PostInFeed on Post {
    id
    amount
    message
    images {
      imageUrl
      imageThumbnailUrl
    }
    createdAt
    receivers {
      id
      avatar
      name
    }
    sender {
      id
      name
      avatar
    }
    votes {
      voter {
        id
        name
      }
    }
  }
`;