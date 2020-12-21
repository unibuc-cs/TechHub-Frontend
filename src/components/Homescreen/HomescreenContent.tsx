/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect } from "react";
import styled from "styled-components";
import HomescreenItemsList from "./HomescreenItemsList";
import { categoriesSelector } from "../../store/categories/categories.selector";
import { accessTokenSelector } from "../../store/user/user.selector";
import { getCategories } from "../../store/categories/categories.actions";
import { getThreadsByCategory } from "../../store/threads/threads.actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { threadsSelector } from "../../store/threads/threads.selector";

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
  width: 100%;
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

const HomescreenContent: React.FC<{ type: string }> = ({ type }) => {
  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);
  const categories = useSelector(categoriesSelector);
  const threads = useSelector(threadsSelector);

  const location = useLocation();

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
  }, [accessToken, type]);

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
        {categories.length > 0 ? (
          <HomescreenItemsList
            items={type === "categories" ? categories : threads}
            type={type}
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </ContentContainer>
    </Container>
  );
};

export default HomescreenContent;
