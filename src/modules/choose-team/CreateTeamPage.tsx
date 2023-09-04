import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import settings from "../../config/settings";
import { ERROR_NAME_BLANK, getGraphqlError } from "../../support";
import { Navigation } from "../../components/navigation";
import { PATH_FEED } from "../../routes";
import { Storage } from "../../support/storage";
import s from "./CreateTeamPage.module.scss";
import { FormWrapper } from "../../components";
import { Button, Input } from "@sandercamp/ui-components";
import Segment from "../../components/atoms/Segment";

export const MUTATION_CREATE_TEAM = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      team {
        id
      }
    }
  }
`;

export interface CreateTeamParameters {
  name: string;
}

export interface CreateTeamResult {
  createTeam: {
    team: {
      id: string;
    };
  };
}

const CreateTeamPage = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [createTeam, { loading }] = useMutation<
    CreateTeamResult,
    CreateTeamParameters
  >(MUTATION_CREATE_TEAM, {
    onError: (error) => setError(getGraphqlError(error)),
    onCompleted: ({ createTeam }) => {
      Storage.setItem(settings.TEAM_ID_TOKEN, createTeam.team.id);
      toast.info("Team created successfully!");
      history.push(PATH_FEED);
    },
  });

  const hasErrors = () => {
    setError("");
    if (!name) {
      setError(ERROR_NAME_BLANK);
      return true;
    }
    return false;
  };

  const handleCreateTeam = () => {
    if (hasErrors()) {
      return;
    }
    createTeam({
      variables: {
        name,
      },
    });
  };

  const content = (
    <div>
      <form className={s.form}>
        <Input
          data-testid="name-input"
          name="name"
          placeholder="Team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          data-testid="create-team-button"
          variant="primary"
          disabled={loading}
          onClick={handleCreateTeam}
        >
          Create team
        </Button>
        {error && (
          <div>
            <span>Unable to create team</span>
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );

  return (
    <div>
      <FormWrapper toolbar="Create team" header="create team">
        <Segment>{content}</Segment>
      </FormWrapper>
      <Navigation />
    </div>
  );
};

export default CreateTeamPage;
