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

export interface FragmentPostResult {
  id: string;
  amount: number;
  message: string;
  images?: Image[];
  createdAt: string;
  receivers: Sender[];
  sender: Sender;
  votes: Vote[];
}

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

export interface GetPostsResult {
  teamById: {
    id: number;
    posts: {
      edges: {
        cursor: number;
        node: FragmentPostResult;
      }[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: number;
      };
    };
  };
}

export const GET_USERS = gql`
  query getUsers($team_id: ID!) {
    teamById(id: $team_id) {
      id
      users {
        id
        name
        virtualUser
      }
    }
  }
`;

export interface GetUsersResult {
  teamById: {
    id: number;
    users: User[];
  };
}

export const GET_GOAL_PERCENTAGE = gql`
  query getGoalPercentage($team_id: ID!) {
    teamById(id: $team_id) {
      id
      activeKudosMeter {
        amount
      }
      activeGoals {
        id
        amount
        name
        achievedOn
      }
    }
  }
`;

export interface GetGoalPercentageResult {
  teamById: {
    id: number;
    activeKudosMeter: {
      amount: number;
    };
    activeGoals: ActiveGoal[];
  };
}

export interface Sender {
  id: string;
  avatar: string;
  name: string;
}

export interface Image {
  imageUrl: string;
  imageThumbnailUrl: string;
}

export interface Vote {
  voter: {
    id: string;
    name: string;
  };
}

export interface User {
  id: string;
  name: string;
  virtualUser: boolean;
}

export interface ActiveGoal {
  id: string;
  amount: number;
  name: string;
  achievedOn: string;
}
