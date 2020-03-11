import {gql} from "apollo-boost";

export const DELETE_KUDOMETER = gql`
  mutation DeleteKudometer($id: ID!) {
    deleteKudosMeter(kudosMeterId: $id) {
      kudosMeterId
    }
  }
`;

export interface DeleteKudometerParameters {
    id: string;
}


export const DELETE_GOAL = gql`
  mutation DeleteGoal($id: ID!) {
    deleteGoal(goalId: $id) {
      goalId
    }
  }
`;

export interface DeleteGoalParameters {
    id: string
}

export const CREATE_KUDOMETER = gql`
  mutation CreateKudometer($name: String!, $team_id: ID!) {
    createKudosMeter(name: $name, teamId: $team_id) {
      kudosMeter {
        id
      }
    }
  }
`;

export interface CreateKudometerParameters {
    name: string;
    team_id: string;
}

export const CREATE_GOAL = gql`
  mutation CreateGoal($name: String!, $kudometer: ID!, $amount: Int!) {
    createGoal(name: $name, amount: $amount, kudosMeterId: $kudometer) {
      goal {
        id
      }
    }
  }
`;

export interface CreateGoalParameters {
    name: string;
    kudometer: string;
    amount: number;
}

export const GET_KUDOMETERS = gql`
  query Kudometers($team_id: ID!) {
    teamById(id: $team_id) {
      kudosMeters {
        id
        name
        goals {
          id
          amount
          name
        }
      }
    }
  }
`;

export interface GetKudoMetersResult {
    teamById: {
        kudosMeters: Kudometer[]
    }
}

export interface Goal {
    id: string;
    amount: number;
    name: string;
}

export interface Kudometer {
    id: string;
    name: string;
    goals: Goal[]
}

export const UPDATE_GOAL = gql`
  mutation UpdateGoal($name: String!, $amount: Int!, $goalId: ID!) {
    updateGoal(name: $name, amount: $amount, goalId: $goalId) {
      goal {
        id
      }
    }
  }
`;

export interface UpdateGoalParameters {
    name: string;
    amount: number;
    goalId: string;
}

