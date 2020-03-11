import React from "react";
import {Button, GridColumn, GridRow} from "semantic-ui-react";
import {History} from "history"
import s from "./ChooseTeam.module.scss";
import {selectTeam} from "../utils";
import {PATH_FEED} from "../../../routes";

export interface Props {
    history: History;
    id: string;
    name: string;
    role: string
}

const TeamRow: React.FC<Props> = ({history, id, name, role}) => (
    <GridRow textAlign='center'>
        <GridColumn>
            <p className={s.text}>{name}</p>
        </GridColumn>
        <GridColumn>
            <Button
                color="green"
                size="small"
                onClick={() => {
                    selectTeam(id, role);
                    history.push(PATH_FEED);
                }}
            >
                Choose
            </Button>
        </GridColumn>
    </GridRow>
);

export default TeamRow;