import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./pages/Authenication/SignIn";
import SignUp from "./pages/Authenication/SignUp";
import Homescreen from "./pages/Homescreen";
import GuardedRoute from "./components/GuardedRoute";

import { accessTokenSelector } from "./store/user/user.selector";

const App = () => {
  const accessToken = useSelector(accessTokenSelector);

  return (
    <>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <GuardedRoute
          path="/homescreen"
          component={Homescreen}
          auth={accessToken !== ""}
        />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
