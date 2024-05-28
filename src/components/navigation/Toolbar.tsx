import { Link, useHistory } from "react-router-dom";
import s from "./Toolbar.module.css";
import { TabletAndBelow } from "../../support/breakpoints";
import { Icon } from "@kabisa/ui-components";

export interface Props {
  to?: string;
  text: string;
}

export default function Toolbar(props: Props) {
  const history = useHistory();

  const backLink = props.to ? (
    <Link to={props.to} className={s.back_link}>
      <Icon name="arrow_left" className={s.icon} />
    </Link>
  ) : (
    <button className={s.button} onClick={() => history.goBack()}>
      <Icon name="arrow_left" className={s.icon} />
    </button>
  );

  return (
    <TabletAndBelow>
      <div className={s.top_navigation}>
        {backLink}
        <span className={s.toolbar_text}>{props.text}</span>
      </div>
    </TabletAndBelow>
  );
}
