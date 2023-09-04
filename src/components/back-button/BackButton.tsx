import React from "react";
import { Button } from "@sandercamp/ui-components";
import { useHistory } from "react-router-dom";
import { TabletAndAbove } from "../../support/breakpoints";

const BackButton = () =>  {
  const history = useHistory();

  return (
    <TabletAndAbove>
      <Button
        variant="secondary"
        onClick={() => history.goBack()}
      >
        Back
      </Button>
    </TabletAndAbove>
  );
}

export default BackButton;
