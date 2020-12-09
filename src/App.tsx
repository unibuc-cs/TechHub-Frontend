import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./pages/Authenication/SignIn";

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
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
