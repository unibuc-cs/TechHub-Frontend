/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
import { useLocation } from "react-router-dom";
import { threadsSelector } from "../../store/threads/threads.selector";
import Button from "@material-ui/core/Button";
import AddThreadDialog from "../UI/AddThreadDialog";
import { ThreadInformation } from "../../store/store";

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

  const accessToken = useSelector(accessTokenSelector);
  const categories = useSelector(categoriesSelector);
  const threads = useSelector(threadsSelector);
  const currentEmail = useSelector(currentEmailSelector);
  const currentUserDetails = useSelector(userDetailsSelector);
  const location = useLocation();

  const [addThreadDialogIsOpen, setAddThreadDialogIsOpen] = useState<boolean>(
    false
  );
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    if (type === "categories") {
      dispatch(getCategories(accessToken));
    } else {
      if (isVip) {
        dispatch(
          getVipThreadsByCategory(accessToken, (location.state as any).category)
        );
      } else {
        dispatch(
          getThreadsByCategory(accessToken, (location.state as any).category)
        );
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
          dispatch(
            getThreadsByCategory(accessToken, (location.state as any).category)
          );
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
                searchThreads(
                  accessToken,
                  searchInput,
                  (location.state as any).category
                )
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

  return (
    <Container>
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
        {type === "threads" ? (
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
        {threads.length > 0 || type !== "threads" ? null : (
          <MessageContainer>
            <h1>There are no threads yet.</h1>
          </MessageContainer>
        )}
        {categories.length > 0 ? (
          <HomescreenItemsList
            items={type === "categories" ? categories : threads}
            type={type}
          />
        ) : (
          <h1>Loading...</h1>
        )}
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
