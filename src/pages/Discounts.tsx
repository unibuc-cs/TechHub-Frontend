/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { userDetailsSelector } from "../store/userDetails/userDetails.selector";
import {
  getAllDiscounts,
  addDiscount,
  deleteDiscount,
  searchDiscounts,
} from "../store/discounts/discounts.actions";
import { addPurchasedDiscount } from "../store/purchasedDiscounts/purchasedDiscounts.actions";
import {
  discountsSelector,
  discountsLoadingSelector,
} from "../store/discounts/discounts.selectors";
import { accessTokenSelector } from "../store/user/user.selector";
import { purchasedDiscountsSelector } from "../store/purchasedDiscounts/purchasedDiscounts.selectors";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import AddDiscountDialog from "../components/UI/AddDiscountDialog";
import DiscountsList from "../components/Discounts/DiscountsList";
import { Discount, PurchasedDiscount } from "../store/store";
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

const AddDiscountButtonContainer = styled.div`
  padding: 8px 0;
`;

const CurrentPointsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Text = styled.p`
  font-size: 1.2em;
  font-family: "Montserrat", sans-serif;
`;

const SearchBarContainer = styled.div`
  padding: 8px 0;
  width: 50%;
`;

const Discounts = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);
  const userDetails = useSelector(userDetailsSelector);
  const discounts = useSelector(discountsSelector);
  const discountsLoading = useSelector(discountsLoadingSelector);
  const purchasedDiscounts = useSelector(purchasedDiscountsSelector);

  const [
    addDiscountDialogIsVisible,
    setAddDiscountDialogIsVisible,
  ] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const [displayedDiscounts, setDisplayedDiscounts] = useState<Discount[]>([]);

  const onSearchInputChangedHandler = (e: any) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllDiscounts());
  }, []);

  useEffect(() => {
    if (userDetails.type === "REGULAR_USER") {
      const unownedDiscounts = discounts.filter(
        (discount: Discount) =>
          purchasedDiscounts.findIndex(
            (purchasedDiscount: PurchasedDiscount) =>
              purchasedDiscount.discount.id === discount.id
          ) === -1
      );
      setDisplayedDiscounts(unownedDiscounts);
    }
  }, [discounts, purchasedDiscounts]);

  useEffect(() => {
    if (searchInput === "") {
      dispatch(getAllDiscounts());
    } else {
      setTimeout(
        () => dispatch(searchDiscounts(accessToken, searchInput)),
        1000
      );
    }
  }, [searchInput]);

  const onAddDiscount = (
    title: string,
    description: string,
    pictures: string[],
    pointsCost: number,
    vipStatus: boolean
  ) => {
    dispatch(
      addDiscount(
        accessToken,
        userDetails.email,
        title,
        description,
        pictures,
        pointsCost,
        vipStatus
      )
    );
  };

  const onDeleteDiscount = (id: string) => {
    dispatch(deleteDiscount(accessToken, id));
  };

  const onUnlockDiscount = (pointsSpent: number, discountId: string) => {
    dispatch(
      addPurchasedDiscount(
        accessToken,
        userDetails.email,
        pointsSpent,
        discountId,
        new Date().toString()
      )
    );
  };

  let discountsContent = null;
  if (!discountsLoading) {
    if (discounts.length > 0) {
      discountsContent = (
        <DiscountsList
          discounts={
            userDetails.type === "REGULAR_USER" ? displayedDiscounts : discounts
          }
          currentEmail={userDetails.email}
          userType={userDetails.type}
          onDeleteDiscount={onDeleteDiscount}
          onUnlockDiscount={onUnlockDiscount}
          currentPoints={userDetails.currentPoints}
          userVipStatus={userDetails.vipStatus}
        />
      );
    } else {
      discountsContent = (
        <h1 style={{ fontFamily: "Montserrat" }}>No discounts available</h1>
      );
    }
  } else {
    discountsContent = <Spinner />;
  }

  let topPageContent = null;
  if (userDetails.type === "REGULAR_USER") {
    topPageContent = (
      <Paper
        elevation={3}
        style={{ width: "15%", backgroundColor: "#228B22", color: "white" }}
      >
        <CurrentPointsContainer>
          <Text>
            <b>Your points</b>
          </Text>
          <Text>{userDetails.currentPoints}</Text>
        </CurrentPointsContainer>
      </Paper>
    );
  } else if (userDetails.type === "MERCHANT") {
    topPageContent = (
      <AddDiscountButtonContainer>
        <Button
          variant="contained"
          style={{ backgroundColor: "#228B22", color: "white" }}
          onClick={() => setAddDiscountDialogIsVisible(true)}
        >
          Add Discount
        </Button>
      </AddDiscountButtonContainer>
    );
  }

  let searchBar = null;
  if (accessToken !== "") {
    searchBar = (
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
    );
  }

  return (
    <Container>
      <Title>Discounts</Title>
      {topPageContent}
      {searchBar}
      {discountsContent}
      <AddDiscountDialog
        open={addDiscountDialogIsVisible}
        onClose={() => setAddDiscountDialogIsVisible(false)}
        onAddDiscount={onAddDiscount}
      />
    </Container>
  );
};

export default Discounts;
