import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { PATH_CHOOSE_TEAM, PATH_LOGIN } from "../routes";
import { Auth } from "../support";

type Props = {
  allowNoTeam?: boolean;
  component: React.ComponentType<RouteComponentProps>;
} & RouteProps;

const AuthenticatedRoute: React.FC<Props> = ({
  allowNoTeam,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!Auth.isLoggedIn()) {
        return <Redirect to={PATH_LOGIN} />;
      }

      if (Auth.hasTeam() || allowNoTeam) {
        return <Component {...props} />;
      }

      return <Redirect to={PATH_CHOOSE_TEAM} />;
    }}
  />
);
export default AuthenticatedRoute;
