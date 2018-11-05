import { h } from "preact";
import { Icon, Responsive } from "semantic-ui-react";
import PropTypes from "prop-types";

import s from "./Toolbar.scss";

const Toolbar = ({ to, text }) => {
  const backLink = to ? (
    <a href={to} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </a>
  ) : (
    <div onClick={() => history.back()} className={s.back_link}>
      <Icon name="arrow left" size="large" className={s.icon} />
    </div>
  );

  return (
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <div className={s.top_navigation}>
        {backLink}
        <span className={s.toolbar_text}>{text}</span>
      </div>
    </Responsive>
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
