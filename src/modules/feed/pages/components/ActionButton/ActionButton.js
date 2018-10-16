import { h } from "preact";
import { Button, Responsive } from "semantic-ui-react";

import { PATH_ADD_TRANSACTION } from "../../../../../routes";

export default () => (
  <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
    <a href={`${PATH_ADD_TRANSACTION}?transition=slideup`}>
      <Button circular icon="plus" className="add-button" primary size="huge" />
    </a>
  </Responsive>
);
