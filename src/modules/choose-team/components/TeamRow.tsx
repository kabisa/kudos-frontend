import React from "react";
import { Button, GridColumn, GridRow } from "semantic-ui-react";
import s from "./ChooseTeam.module.scss";
import { selectTeam } from "../utils";
import { PATH_FEED } from "../../../routes";
import { useHistory } from "react-router-dom";

export interface Props {
  id: string;
  name: string;
  userRole: string;
}

function TeamRow(props: Props) {
  const history = useHistory();

  return (
    <GridRow textAlign="center">
      <GridColumn>
        <p className={s.text}>{props.name}</p>
      </GridColumn>
      <GridColumn>
        <Button
          color="teal"
          size="small"
          onClick={() => {
            selectTeam(props.id, props.userRole);
            history.push(PATH_FEED);
          }}
        >
          Choose
        </Button>
      </GridColumn>
    </GridRow>
  );
}

export default TeamRow;
