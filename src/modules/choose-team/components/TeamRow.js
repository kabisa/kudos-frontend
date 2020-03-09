import React from "react";
import { Button, GridRow, GridColumn } from "semantic-ui-react";
import {PropTypes} from "prop-types"
import s from "./ChooseTeam.module.scss";
import { selectTeam } from "../utils";
import { PATH_FEED } from "../../../routes";

const TeamRow = ({ history, id, name, role }) => (
  <GridRow textAlign='center'>
    <GridColumn>
      <p className={s.text}>{name}</p>
    </GridColumn>
    <GridColumn>
      <Button
        color="green"
        size="small"
        onClick={() =>  {
          selectTeam(id, role);
          history.push(PATH_FEED);
        }}
      >
        Choose
      </Button>
    </GridColumn>
  </GridRow>
);

TeamRow.propTypes = {
  history: PropTypes.any,
  id: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
};

export default TeamRow;