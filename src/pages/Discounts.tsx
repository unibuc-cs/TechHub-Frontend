/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

import { userDetailsSelector } from "../store/userDetails/userDetails.selector";
import {
  getAllDiscounts,
  addDiscount,
  deleteDiscount,
} from "../store/discounts/discounts.actions";
import { discountsSelector } from "../store/discounts/discounts.selectors";
import { accessTokenSelector } from "../store/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import AddDiscountDialog from "../components/UI/AddDiscountDialog";
import DiscountsList from "../components/Discounts/DiscountsList";

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
`;

const Discounts = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);
  const userDetails = useSelector(userDetailsSelector);
  const discounts = useSelector(discountsSelector);

  const [
    addDiscountDialogIsVisible,
    setAddDiscountDialogIsVisible,
  ] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllDiscounts(accessToken));
  }, []);

  const onAddDiscount = (
    title: string,
    description: string,
    pictures: string[],
    pointsCost: number
  ) => {
    dispatch(
      addDiscount(
        accessToken,
        userDetails.email,
        title,
        description,
        pictures,
        pointsCost
      )
    );
  };

  const onDeleteDiscount = (id: string) => {
    dispatch(deleteDiscount(accessToken, id));
  };

  return (
    <Container>
      <Title>Discounts</Title>
      {userDetails.type === "MERCHANT" ? (
        <AddDiscountButtonContainer>
          <Button
            variant="contained"
            style={{ backgroundColor: "#228B22", color: "white" }}
            onClick={() => setAddDiscountDialogIsVisible(true)}
          >
            Add Discount
          </Button>
        </AddDiscountButtonContainer>
      ) : (
        <Paper elevation={3} style={{ width: "15%" }}>
          <CurrentPointsContainer>
            <Text>
              <b>Your points</b>
            </Text>
            <Text>{userDetails.currentPoints}</Text>
          </CurrentPointsContainer>
        </Paper>
      )}
      {discounts.length > 0 ? (
        <DiscountsList
          discounts={discounts}
          currentEmail={userDetails.email}
          userType={userDetails.type}
          onDeleteDiscount={onDeleteDiscount}
        />
      ) : (
        <h1>No discounts available</h1>
      )}
      <AddDiscountDialog
        open={addDiscountDialogIsVisible}
        onClose={() => setAddDiscountDialogIsVisible(false)}
        onAddDiscount={onAddDiscount}
      />
    </Container>
  );
};

export default Discounts;