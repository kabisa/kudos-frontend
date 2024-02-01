import s from "./ChooseTeam.module.scss";
import { selectTeam } from "../utils";
import { PATH_FEED } from "../../../routes";
import { useHistory } from "react-router-dom";
import Button from "../../../ui/Button";

export interface Props {
  id: string;
  name: string;
  userRole: string;
}

function TeamRow(props: Props) {
  const history = useHistory();

  return (
    <div className={s.teamItem}>
      <p className={s.text}>{props.name}</p>
      <div>
        <Button
          variant="primary"
          onClick={() => {
            selectTeam(props.id, props.userRole);
            history.push(PATH_FEED);
          }}
          text="Choose"
        />
      </div>
    </div>
  );
}

export default TeamRow;
