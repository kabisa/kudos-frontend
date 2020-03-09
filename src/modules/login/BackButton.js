import React from "react";
import { Message, Responsive } from "semantic-ui-react";
import s from "./LoginPage.module.scss";

const BackButton = () => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Message className={s.back}>
      <div onClick={() => window.history.back()}>Back</div>
    </Message>
  </Responsive>
);

export default BackButton;
