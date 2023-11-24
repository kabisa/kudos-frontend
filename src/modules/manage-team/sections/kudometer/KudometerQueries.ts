import { gql } from "@apollo/client";

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
  id: string;
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

export interface CreateKudometerResult {
  data: {
    createKudosMeter: {
      kudosMeter: {
        id: string;
      };
    };
  };
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
      id
      kudosMeters {
        id
        name
        isActive
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
    id: number;
    kudosMeters: Kudometer[];
  };
}

export interface Goal {
  id: string;
  amount: number;
  name: string;
}

export interface Kudometer {
  id: string;
  name: string;
  goals: Goal[];
  isActive?: boolean;
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

export const SET_ACTIVE_KUDOS_METER = gql`
  mutation SetActiveKudosMeter($kudos_meter_id: ID!, $team_id: ID!) {
    setActiveKudosMeter(kudosMeterId: $kudos_meter_id, teamId: $team_id) {
      kudosMeter {
        id
      }
    }
  }
`;

export interface SetActiveKudosMeterParameters {
  team_id: string;
  kudos_meter_id: string;
}

export interface SetActiveKudosMeterResult {
  data: {
    setActiveKudosMeter: {
      kudosMeter: {
        id: string;
      };
    };
  };
}

export const UPDATE_KUDOMETER = gql`
  mutation UpdateKudosMeter($name: String!, $kudos_meter_id: ID!) {
    updateKudosMeter(name: $name, kudosMeterId: $kudos_meter_id) {
      kudosMeter {
        id
      }
    }
  }
`;

export interface UpdateKudoMeterParameters {
  name: string;
  kudos_meter_id: string;
}

export interface UpdateKudoMeterResult {
  data: {
    updateKudosMeter: {
      kudosMeter: {
        id: string;
      };
    };
  };
}
