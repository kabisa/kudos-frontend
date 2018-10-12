import { h } from "preact";
import { Icon } from "semantic-ui-react";

const IconButton = ({ ...props }) => {
  // const iconAsset = require(`src/assets/icons/${icon}.svg`).default;
  return (
    <div>
      <Icon name="arrow left" color="black" />
    </div>
  );
};

export default IconButton;
