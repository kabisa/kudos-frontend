import { h } from "preact";
import { Icon, Responsive } from "semantic-ui-react";
import PropTypes from "prop-types";

const Toolbar = ({ to, text }) => {
  const backLink = to ? (
    <a
      href={to}
      style={{
        width: "70px",
        height: "100%",
        display: "flex",
        color: "black",
      }}
    >
      <Icon name="arrow left" size="large" style={{ margin: "auto" }} />
    </a>
  ) : (
    <div
      onClick={() => history.back()}
      style={{
        width: "70px",
        height: "100%",
        display: "flex",
        color: "black",
      }}
    >
      <Icon name="arrow left" size="large" style={{ margin: "auto" }} />
    </div>
  );

  return (
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <div className="top-navigation">
        {backLink}
        <span style={{ lineHeight: "68px" }}>{text}</span>
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
