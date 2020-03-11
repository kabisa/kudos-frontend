import React from "react";
import {Icon, SemanticICONS} from "semantic-ui-react";
import {Link, withRouter} from "react-router-dom";
import {History} from "history"

import * as routes from "../../routes";
import settings from "../../config/settings";
import s from "./Mobile.module.scss";

export interface IconComponentProps {
    path: string;
    icon: SemanticICONS;
    history: History
}


const IconComponent: React.FC<IconComponentProps> = ({path, icon, history}) => {
    const link = `${path}`;
    return (
        <Link to={link} className={s.bottom_item}>
            <Icon name={icon} size="large" className={s.bottom_icon}
                  color={history.location.pathname === path ? "blue" : "black"}/>
        </Link>
    );
};

export interface MobileProps {
    history: History;
}

const mobile: React.FC<MobileProps> = (history) => {
    const isLoggedIn = localStorage.getItem(settings.TEAM_ID_TOKEN);
    return (
        <div className={s.bottom_navigation}>
            {
                // @ts-ignore
                <IconComponent path={routes.PATH_SETTINGS} icon="settings" history={history}/>
            }
            {isLoggedIn && (
                // @ts-ignore
                <IconComponent path={routes.PATH_STATISTICS} icon="chart bar" history={history}/>
            )}
            {isLoggedIn && (
                // @ts-ignore
                <IconComponent path={routes.PATH_FEED} icon="home" history={history}/>
            )}
            {isLoggedIn && (
                // @ts-ignore
                <IconComponent path={routes.PATH_NOTIFICATIONS} icon="bell" history={history}/>
            )}
            {
                // @ts-ignore
                <IconComponent path={routes.PATH_USER} icon="user" history={history}/>
            }
        </div>
    );
};

export default withRouter(mobile);