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
} from "../../store/threads/threads.actions";
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

const HomescreenContent: React.FC<{ type: string }> = ({ type }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(accessTokenSelector);
  const categories = useSelector(categoriesSelector);
  const threads = useSelector(threadsSelector);
  const currentEmail = useSelector(currentEmailSelector);
  const location = useLocation();

  const [addThreadDialogIsOpen, setAddThreadDialogIsOpen] = useState<boolean>(
    false
  );

  useEffect(() => {
    if (accessToken) {
      if (type === "categories") {
        dispatch(getCategories(accessToken));
      } else {
        dispatch(
          getThreadsByCategory(accessToken, (location.state as any).category)
        );
      }
    }
  }, [accessToken, type, threads.length]);

  const onAddThreadHandler = (newThread: ThreadInformation) => {
    dispatch(addThread(accessToken, newThread));
  };

  return (
    <Container>
      <TitleContainer>
        <Title>
          {type === "categories"
            ? "Categories"
            : `${(location.state as any).category}`}
        </Title>
      </TitleContainer>
      <ContentContainer>
        <SearchBarContainer>
          <FormControl fullWidth variant="outlined">
            <InputLabel color="secondary">Search</InputLabel>
            <OutlinedInput
              color="secondary"
              onChange={() => {}}
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
        />
      ) : null}
    </Container>
  );
};

export default HomescreenContent;
