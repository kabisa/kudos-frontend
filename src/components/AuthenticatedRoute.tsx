import { Redirect, Route } from "react-router-dom";
import { PATH_CHOOSE_TEAM, PATH_LOGIN } from "../routes";
import { Auth } from "../support";

export default function AuthenticatedRoute({
  allowNoTeam,
  component: Component,
  ...rest
}: any) {
  return (
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
}
