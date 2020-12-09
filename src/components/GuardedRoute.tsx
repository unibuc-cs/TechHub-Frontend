import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedRoute: React.FC<any> = ({
  component: Component,
  auth,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      auth === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default GuardedRoute;
