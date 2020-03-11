import React from "react";
import {Button, Responsive} from "semantic-ui-react";
import {History} from "history"
import {withRouter} from "react-router-dom"
import s from "./LoginPage.module.scss"
export interface Props {
    history: History
}

const BackButton: React.FC<Props> = ({history}) => (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Button fluid size={"large"} className={s.back} onClick={() => history.goBack()}>Back</Button>
    </Responsive>
);

export default withRouter(BackButton);
