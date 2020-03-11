import React from "react";
import {Segment} from "semantic-ui-react";
import {Statistics} from "../../statistics";

import s from "./Rail.module.scss";

const style = {
    height: "755px",
    overflow: "auto",
    top: "0",
    marginLeft: "22px",
};

export default () => (
    <Segment
        className={s.rail}
        style={
            window.innerHeight < 858
                ? style
                : {...style, position: "fixed", top: "86px"}
        }
    >
        <Statistics/>
    </Segment>
);
