import React from "react";
import { Button } from "@sandercamp/ui-components";
import { useHistory } from "react-router-dom";
import { Desktop } from "../../support/breakpoints";

const BackButton = () => {
  const history = useHistory();

  return (
    <Desktop>
      <Button variant="secondary" onClick={() => history.goBack()}>
        Back
      </Button>
    </Desktop>
  );
};

export default BackButton;
