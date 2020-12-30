import React from "react";
import Menu from "../components/Homescreen/Menu";
import styled from "styled-components";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import HomescreenContent from "../components/Homescreen/HomescreenContent";
import PostsList from "./PostsList";
import Leaderboard from "./Leaderboard";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #edf5e1;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 1em;
    background-color: #edf5e1;
  }

  ::-webkit-scrollbar-track {
    background-color: #edf5e1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #231f20;
  }
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
        <Route exact path={`${path}/leaderboard`}>
          <Leaderboard />
        </Route>
        <Route exact path={path}>
          <HomescreenContent type="categories" />
        </Route>
        <Route exact path={`${path}/:category`}>
          <HomescreenContent type="threads" />
        </Route>
        <Route exact path={`${path}/thread/:threadId`}>
          <PostsList />
        </Route>
      </Switch>
    </Container>
  );
};

export default Homescreen;
