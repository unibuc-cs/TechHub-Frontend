/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper/Paper";
import moment from "moment";
import { accessTokenSelector } from "../store/user/user.selector";
import { userDetailsSelector } from "../store/userDetails/userDetails.selector";
import {
  getActiveRaffle,
  registerToRaffle,
} from "../store/raffle/raffle.actions";
import {
  activeRaffleSelector,
  raffleLoadingSelector,
} from "../store/raffle/raffle.selectors";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button/Button";
import Spinner from "../components/UI/Spinner/Spinner";

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
  font-family: "Montserrat", sans-serif;
`;

const InformationContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  padding-left: 128px;
`;

const InformationText = styled.p`
  margin-top: 0;
  font-size: 2em;
  font-family: "Montserrat", sans-serif;
`;

const RaffleDetailsContainer = styled.div`
  padding: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DetailsBodyContainer = styled.div`
  width: 60%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const DetailsBodyText = styled.p`
  font-size: 1.7em;
  font-family: "Montserrat", sans-serif;
  margin-top: 0;
`;

const Raffle = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);
  const currentUserDetails = useSelector(userDetailsSelector);
  const activeRaffle = useSelector(activeRaffleSelector);
  const raffleLoading = useSelector(raffleLoadingSelector);

  const onRaffleRegisterHandler = () => {
    dispatch(registerToRaffle(accessToken, currentUserDetails.email));
  };

  useEffect(() => {
    dispatch(getActiveRaffle());
  }, []);

  const activeRaffleCreatedDate = moment.unix(activeRaffle.createTime.seconds);
  const activeRaffleDrawTime = moment.unix(activeRaffle.drawTime.seconds);

  let registerButtonColor = null;
  if (currentUserDetails.currentPoints < 100) {
    registerButtonColor = "salmon";
  } else {
    registerButtonColor = "#228B22";
  }

  let message = null;
  if (accessToken === "") {
    message = "You must login to participate.";
  } else {
    if (activeRaffle.entries.includes(currentUserDetails.email)) {
      message = "You are registered in this raffle.";
    } else {
      if (currentUserDetails.type !== "REGULAR_USER") {
        message = "Only regular users can participate.";
      }
    }
  }

  return (
    <Container>
      <Title>Welcome to the raffle!</Title>
      <InformationContainer>
        <InformationText>
          <b>How does it work?</b>
        </InformationText>
      </InformationContainer>
      <InformationContainer style={{ marginTop: "-32px" }}>
        <InformationText>
          You can spend a portion of your points to register and get a shot at
          winning the big prize!
        </InformationText>
      </InformationContainer>
      {!raffleLoading ? (
        <Paper elevation={3} style={{ width: "83.5%", marginTop: "-8px" }}>
          <RaffleDetailsContainer>
            <InformationText>
              <b>Active Raffle Details</b>
            </InformationText>
            <DetailsBodyContainer>
              <DetailsBodyText>
                <b>Creation date: </b>
                {moment(activeRaffleCreatedDate).format(
                  "dddd, MMMM Do YYYY, h:mm a"
                )}
              </DetailsBodyText>
              <DetailsBodyText>
                <b>Draw date: </b>
                {moment(activeRaffleDrawTime).format(
                  "dddd, MMMM Do YYYY, h:mm a"
                )}
              </DetailsBodyText>
              <DetailsBodyText>
                <b>Prize value: </b>
                {activeRaffle.prize} points
              </DetailsBodyText>
              <DetailsBodyText>
                <b>Users registered: </b> {activeRaffle.entries.length}
              </DetailsBodyText>
            </DetailsBodyContainer>
            {currentUserDetails.type === "REGULAR_USER" &&
            !activeRaffle.entries.includes(currentUserDetails.email) ? (
              <Button
                variant="contained"
                style={{ backgroundColor: registerButtonColor, color: "white" }}
                onClick={onRaffleRegisterHandler}
                disabled={currentUserDetails.currentPoints < 100}
              >
                {currentUserDetails.currentPoints < 100
                  ? "Not enough points(100)"
                  : "Register for 100 points"}
              </Button>
            ) : (
              <DetailsBodyText>
                <b>{message}</b>
              </DetailsBodyText>
            )}
          </RaffleDetailsContainer>
        </Paper>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default Raffle;
