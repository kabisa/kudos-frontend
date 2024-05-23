import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import settings from "../../config/settings";
import { ERROR_NAME_BLANK, getGraphqlError } from "../../support";
import { PATH_FEED } from "../../routes";
import { Storage } from "../../support/storage";
import { Button, Input, Label } from "@kabisa/ui-components";
import Segment from "../../components/atoms/Segment";
import Page from "../../components/templates/Page";
import MessageBox from "../../ui/MessageBox";

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
    <form className="form-container">
      <h1>Create new team</h1>
      <Label>
        Name
        <Input
          data-testid="name-input"
          name="name"
          placeholder="Team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Label>

      <Button
        data-testid="create-team-button"
        variant="primary"
        disabled={loading}
        onClick={handleCreateTeam}
      >
        Create team
      </Button>
      {error && (
        <MessageBox
          variant="error"
          title="Unable to create team"
          message={error}
        />
      )}
    </form>
  );

  return (
    <Page>
      <Segment>{content}</Segment>
    </Page>
  );
};

export default CreateTeamPage;
