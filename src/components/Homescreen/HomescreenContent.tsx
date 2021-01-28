/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import HomescreenItemsList from "./HomescreenItemsList";
import { categoriesSelector } from "../../store/categories/categories.selector";
import {
  accessTokenSelector,
  currentEmailSelector,
} from "../../store/user/user.selector";
import { getCategories } from "../../store/categories/categories.actions";
import {
  addThread,
  getThreadsByCategory,
  searchThreads,
  getVipThreadsByCategory,
  addVipThread,
  searchVipThreads,
} from "../../store/threads/threads.actions";
import { userDetailsSelector } from "../../store/userDetails/userDetails.selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  threadsSelector,
  threadsLoadingSelector,
} from "../../store/threads/threads.selector";
import { closeNotification } from "../../store/raffle/raffle.actions";
import {
  activeRaffleSelector,
  previousRaffleSelector,
  notificationIsClosedSelector,
} from "../../store/raffle/raffle.selectors";
import Button from "@material-ui/core/Button";
import AddThreadDialog from "../UI/AddThreadDialog";
import { ThreadInformation } from "../../store/store";
import Spinner from "../UI/Spinner/Spinner";
import moment from "moment";

const animated = keyframes`
0% {
  transform:scale(1);
}
50% {
  transform:scale(1.1);
}
100% {
  transform:scale(1);
}
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  padding: 8px 0;
`;

const RaffleContainer = styled.div`
  width: 99%;
  margin: 8px;
  background-color: #231f20;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const RaffleText = styled.p`
  font-size: 1.7em;
  font-family: "Montserrat", sans-serif;
  color: white;
`;

const RaffleRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RaffleButtonContainer = styled.div`
  animation: ${animated} 1.5s linear infinite;
`;

const NotificationHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 30px;
`;

const TitleContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-start;
  padding: 0 8px;
`;

const ContentContainer = styled.div`
  width: 60%;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 2.7em;
  font-family: "Montserrat", sans-serif;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomescreenContent: React.FC<{ type: string; isVip: boolean }> = ({
  type,
  isVip,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const accessToken = useSelector(accessTokenSelector);
  const categories = useSelector(categoriesSelector);
  const threads = useSelector(threadsSelector);
  const threadsLoading = useSelector(threadsLoadingSelector);
  const currentEmail = useSelector(currentEmailSelector);
  const currentUserDetails = useSelector(userDetailsSelector);
  const activeRaffle = useSelector(activeRaffleSelector);
  const previousRaffle = useSelector(previousRaffleSelector);
  const notificationIsClosed = useSelector(notificationIsClosedSelector);

  const location = useLocation();
  const drawDate = moment.unix(activeRaffle.drawTime.seconds);

  const [addThreadDialogIsOpen, setAddThreadDialogIsOpen] = useState<boolean>(
    false
  );
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    if (type === "categories") {
      dispatch(getCategories());
    } else {
      if (isVip) {
        dispatch(
          getVipThreadsByCategory(accessToken, (location.state as any).category)
        );
      } else {
        dispatch(getThreadsByCategory((location.state as any).category));
      }
    }
  }, [type, isVip]);

  useEffect(() => {
    if (type === "threads") {
      if (searchInput === "") {
        if (isVip) {
          getVipThreadsByCategory(
            accessToken,
            (location.state as any).category
          );
        } else {
          dispatch(getThreadsByCategory((location.state as any).category));
        }
      } else {
        if (isVip) {
          setTimeout(
            () =>
              dispatch(
                searchVipThreads(
                  accessToken,
                  searchInput,
                  (location.state as any).category
                )
              ),
            1000
          );
        } else {
          setTimeout(
            () =>
              dispatch(
                searchThreads(searchInput, (location.state as any).category)
              ),
            1000
          );
        }
      }
    }
  }, [searchInput]);

  const onAddThreadHandler = (newThread: ThreadInformation) => {
    if (isVip) {
      dispatch(addVipThread(accessToken, newThread));
    } else {
      dispatch(addThread(accessToken, newThread));
    }
  };

  const onSearchInputChangedHandler = (e: any) => {
    setSearchInput(e.target.value);
  };

  const onNotificationClosedHandler = () => {
    dispatch(closeNotification());
  };

  let title = null;

  if (type === "categories") {
    if (isVip) {
      title = "Categories (VIP)";
    } else {
      title = "Categories";
    }
  } else {
    if (isVip) {
      title = `${(location.state as any).category} (VIP)`;
    } else {
      title = `${(location.state as any).category}`;
    }
  }

  let content = null;
  if (type === "threads") {
    if (!threadsLoading) {
      if (threads.length > 0) {
        content = <HomescreenItemsList items={threads} type={type} />;
      } else {
        content = (
          <MessageContainer>
            <h1 style={{ fontFamily: "Montserrat" }}>
              There are no threads yet.
            </h1>
          </MessageContainer>
        );
      }
    } else {
      content = <Spinner />;
    }
  } else {
    content = <HomescreenItemsList items={categories} type={type} />;
  }

  return (
    <Container>
      {currentUserDetails.type === "REGULAR_USER" &&
      !activeRaffle.entries.includes(currentUserDetails.email) &&
      !notificationIsClosed ? (
        <RaffleContainer>
          <NotificationHeader>
            <IconButton onClick={onNotificationClosedHandler}>
              <CloseIcon style={{ color: "white" }} />
            </IconButton>
          </NotificationHeader>
          <RaffleRow>
            <RaffleText>
              Join the raffle and win points! Ends in{" "}
              {moment(drawDate).toNow(true)}.
            </RaffleText>
            <RaffleButtonContainer>
              <Button
                size="small"
                variant="contained"
                style={{
                  backgroundColor: "#228B22",
                  fontFamily: "Montserrat",
                  marginLeft: "8px",
                }}
                startIcon={<ConfirmationNumberIcon />}
                onClick={() => history.push("/homescreen/raffle")}
              >
                Register now
              </Button>
            </RaffleButtonContainer>
          </RaffleRow>
          <RaffleText style={{ marginTop: 0 }}>
            Previous winner: <b>{`${previousRaffle.winnerUsername}`}</b>
          </RaffleText>
        </RaffleContainer>
      ) : null}
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <ContentContainer>
        {type === "threads" ? (
          <SearchBarContainer>
            <FormControl fullWidth variant="outlined">
              <InputLabel color="secondary">Search</InputLabel>
              <OutlinedInput
                color="secondary"
                onChange={onSearchInputChangedHandler}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                labelWidth={60}
                placeholder="Search..."
              />
            </FormControl>
          </SearchBarContainer>
        ) : null}
        {type === "threads" && accessToken !== "" ? (
          <ButtonContainer>
            <Button
              variant="contained"
              style={{ backgroundColor: "#228B22", color: "white" }}
              onClick={() => setAddThreadDialogIsOpen(true)}
            >
              Add Thread
            </Button>
          </ButtonContainer>
        ) : null}
        {content}
      </ContentContainer>
      {type === "threads" ? (
        <AddThreadDialog
          open={addThreadDialogIsOpen}
          onClose={() => setAddThreadDialogIsOpen(false)}
          category={(location.state as any).category}
          currentEmail={currentEmail}
          onAddThread={onAddThreadHandler}
          accessToken={accessToken}
          currentUserDetails={currentUserDetails}
        />
      ) : null}
    </Container>
  );
};

export default HomescreenContent;
