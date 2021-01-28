import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./pages/Authenication/SignIn";
import SignUp from "./pages/Authenication/SignUp";
import Homescreen from "./pages/Homescreen";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/homescreen" component={Homescreen} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
