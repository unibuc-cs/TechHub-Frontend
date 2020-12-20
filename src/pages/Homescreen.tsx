import React from "react";
import Menu from "../components/Homescreen/Menu";
import styled from "styled-components";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import HomescreenContent from "../components/Homescreen/HomescreenContent";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #edf5e1;
`;
const MenuContainer = styled.div``;

const Homescreen = () => {
  let { path } = useRouteMatch();

  return (
    <Container>
      <MenuContainer>
        <Menu />
      </MenuContainer>
      <Switch>
        <Route exact path={path}>
          <HomescreenContent />
        </Route>
      </Switch>
    </Container>
  );
};

export default Homescreen;
