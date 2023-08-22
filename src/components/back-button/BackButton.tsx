import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import s from "./BackButton.module.scss";
import { TabletAndAbove } from "../../support/breakpoints";

function BackButton() {
  const history = useHistory();

  return (
    <TabletAndAbove>
      <Button
        fluid
        size="large"
        className={s.back}
        onClick={() => history.goBack()}
      >
        Back
      </Button>
    </TabletAndAbove>
  );
}

export default BackButton;
