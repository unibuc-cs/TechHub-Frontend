import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./pages/Authenication/SignIn";
import SignUp from "./pages/Authenication/SignUp";

import { accessTokenSelector } from "./store/user/user.selector";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const accessToken = useSelector(accessTokenSelector);

  useEffect(() => {
    if (accessToken !== "") {
      setIsAuth(true);
    }
  }, [accessToken]);

  return (
    <>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
