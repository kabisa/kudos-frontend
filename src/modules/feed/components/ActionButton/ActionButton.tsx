import React from "react";
import { Button } from "semantic-ui-react";

import { Link } from "react-router-dom";
import { PATH_ADD_TRANSACTION } from "../../../../routes";
import { Media } from "../../../../support/breakpoints";

export default () => (
  <div>
    <Media lessThan="computer">
      <Link to={`${PATH_ADD_TRANSACTION}?transition=slideup`}>
        <Button
          circular
          icon="plus"
          className="add-button"
          primary
          size="huge"
        />
      </Link>
    </Media>
    <Media greaterThanOrEqual="computer">
      <Link to={`${PATH_ADD_TRANSACTION}?transition=slideup`}>
        <Button
          circular
          icon="plus"
          className="add-button add-button-desktop"
          primary
          size="massive"
        />
      </Link>
    </Media>
  </div>
);
