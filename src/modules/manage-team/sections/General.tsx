import { ChangeEvent, Component } from "react";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { Query, Mutation } from "@apollo/client/react/components";
import settings from "../../../config/settings";
import { Storage } from "../../../support/storage";
import { Button, Icon, Input, Label } from "@kabisa/ui-components";
import s from "./General.module.css";

export const GET_TEAM_NAME = gql`
  query GetTeamName($id: ID!) {
    teamById(id: $id) {
      name
    }
  }
`;

export const UPDATE_TEAM = gql`
  mutation UpdateTeam($name: String!, $team_id: ID!) {
    updateTeam(name: $name, teamId: $team_id) {
      team {
        id
      }
    }
  }
`;

export interface GetTeamNameResult {
  teamById: {
    name: string;
  };
}

export interface UpdateTeamParameters {
  name: string;
  team_id: number;
}

export interface UpdateTeamResult {
  team: {
    id: string;
  };
}

export interface Props {}

export interface State {
  name: string;
}

export default class GeneralSection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
    };

    this.updateTeam = this.updateTeam.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: ChangeEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
  }

  updateTeam(mutate: any) {
    mutate({
      variables: {
        name: this.state.name,
        team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
      },
      refetchQueries: [
        {
          query: GET_TEAM_NAME,
          variables: {
            id: Storage.getItem(settings.TEAM_ID_TOKEN),
          },
        },
      ],
    });
  }

  render() {
    return (
      <div className="form-container">
        <h2>
          <Icon name="settings" />
          General
        </h2>
        <Query<GetTeamNameResult>
          query={GET_TEAM_NAME}
          variables={{
            id: Storage.getItem(settings.TEAM_ID_TOKEN),
          }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error! {error.message}</p>;

            return (
              <Mutation<UpdateTeamResult, UpdateTeamParameters>
                mutation={UPDATE_TEAM}
                onCompleted={() => {
                  toast.info("Team successfully updated!");
                  this.setState({ name: "" });
                  refetch();
                }}
              >
                {(mutate, { loading }) => (
                  <>
                    <h1>{data && data.teamById ? data.teamById.name : "-"}</h1>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        this.updateTeam(mutate);
                      }}
                    >
                      <Label>
                        New team name
                        <Input
                          data-testid="name-input"
                          placeholder="Team name"
                          name="name"
                          required
                          value={this.state.name}
                          onChange={(e) =>
                            this.setState({ name: e.target.value })
                          }
                        />
                      </Label>

                      <Button
                        data-testid="submit-button"
                        variant="primary"
                        disabled={loading}
                        type="submit"
                        className={s.button}
                      >
                        Update
                      </Button>
                    </form>
                  </>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }
}
