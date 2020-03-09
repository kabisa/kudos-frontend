import React from "react";
import { Icon, Responsive } from "semantic-ui-react";
import PropTypes from "prop-types";

import s from "./Toolbar.module.scss";

const Toolbar = ({ to, text }) => {
  const backLink = to ? (
    <a href={to} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </a>
  ) : (
      // eslint-disable-next-line no-restricted-globals
    <div onClick={() => history.back()} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </div>
  );

  return (
    <div>
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <div className={s.top_navigation}>
          {backLink}
          <span className={s.toolbar_text}>{text}</span>
        </div>
      </Responsive>
    </div>
  );
};

Toolbar.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
};

Toolbar.defaultProps = {
  text: "",
};

export default Toolbar;
