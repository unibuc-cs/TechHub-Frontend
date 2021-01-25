/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Menu from "../components/Homescreen/Menu";
import styled from "styled-components";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import HomescreenContent from "../components/Homescreen/HomescreenContent";
import PostsList from "./PostsList";
import Leaderboard from "./Leaderboard";
import Discounts from "./Discounts";
import OwnedDiscounts from "./OwnedDiscounts";

import {
  accessTokenSelector,
  currentEmailSelector,
} from "../store/user/user.selector";
import { getUserDetailsByEmail } from "../store/userDetails/userDetails.actions";
import { getPurchasedDiscountsByUser } from "../store/purchasedDiscounts/purchasedDiscounts.actions";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsSelector } from "../store/userDetails/userDetails.selector";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 1em;
    background-color: white;
  }

  ::-webkit-scrollbar-track {
    background-color: white;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #231f20;
  }
`;
const MenuContainer = styled.div``;

const Homescreen = () => {
  let { path } = useRouteMatch();
  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);
  const currentEmail = useSelector(currentEmailSelector);
  const userDetails = useSelector(userDetailsSelector);

  useEffect(() => {
    dispatch(getUserDetailsByEmail(accessToken, currentEmail));
    dispatch(getPurchasedDiscountsByUser(accessToken, currentEmail));
  }, []);

  return (
    <Container>
      <MenuContainer>
        <Menu userDetails={userDetails} />
      </MenuContainer>
      <Switch>
        <Route exact path={`${path}/leaderboard`}>
          <Leaderboard />
        </Route>
        <Route exact path={`${path}/discounts`}>
          <Discounts />
        </Route>
        <Route exact path={`${path}/owned-discounts`}>
          <OwnedDiscounts />
        </Route>
        <Route exact path={`${path}/vip`}>
          <HomescreenContent type="categories" isVip={true} />
        </Route>
        <Route exact path={`${path}/vip/:category`}>
          <HomescreenContent type="threads" isVip={true} />
        </Route>
        <Route exact path={path}>
          <HomescreenContent type="categories" isVip={false} />
        </Route>
        <Route exact path={`${path}/:category`}>
          <HomescreenContent type="threads" isVip={false} />
        </Route>
        <Route exact path={`${path}/vip`}>
          <HomescreenContent type="categories" isVip={true} />
        </Route>
        <Route exact path={`${path}/thread/:threadId`}>
          <PostsList />
        </Route>
      </Switch>
    </Container>
  );
};

export default Homescreen;
