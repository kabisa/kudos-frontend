import { gql } from "@apollo/client";

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

export interface GetUsersResult {
  teamById: {
    id: number;
    users: User[];
  };
}

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
