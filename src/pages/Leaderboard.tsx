/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { accessTokenSelector } from "../store/user/user.selector";
import { topUsersSelector } from "../store/leaderboard/leaderboard.selector";
import { getLeaderboardUsers } from "../store/leaderboard/leaderboard.actions";
import LeaderboardTable from "../components/Leaderboard/LeaderboardTable";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 2.7em;
`;

const TitleContainer = styled.div`
  width: 47%;
  display: flex;
  justify-content: flex-start;
  padding: 0 8px;
`;

const Leaderboard = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(accessTokenSelector);
  const topUsers = useSelector(topUsersSelector);

  useEffect(() => {
    dispatch(getLeaderboardUsers(accessToken, 10));
  }, []);

  return (
    <Container>
      <TitleContainer>
        <Title>Leaderboard</Title>
      </TitleContainer>
      {topUsers.length > 0 ? (
        <LeaderboardTable data={topUsers} />
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};

export default Leaderboard;