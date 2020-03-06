import React from "react";
import { Button, Responsive } from "semantic-ui-react";

import { PATH_ADD_TRANSACTION } from "../../../../routes";

export default () => (
  <div>
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <a href={`${PATH_ADD_TRANSACTION}?transition=slideup`}>
        <Button
          circular
          icon="plus"
          className="add-button"
          primary
          size="huge"
        />
      </a>
    </Responsive>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <a href={`${PATH_ADD_TRANSACTION}?transition=slideup`}>
        <Button
          circular
          icon="plus"
          className="add-button add-button-desktop"
          primary
          size="massive"
        />
      </a>
    </Responsive>
  </div>
);
