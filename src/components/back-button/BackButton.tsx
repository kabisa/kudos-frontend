import { Button } from "@sandercamp/ui-components";
import { useHistory } from "react-router-dom";
import { Desktop } from "../../support/breakpoints";
import s from "./BackButton.module.css";

const BackButton = () => {
  const history = useHistory();

  return (
    <Desktop>
      <Button
        variant="secondary"
        className={s.button}
        onClick={() => history.goBack()}
      >
        Back
      </Button>
    </Desktop>
  );
};

export default BackButton;
