/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { purchasedDiscountsSelector } from "../store/purchasedDiscounts/purchasedDiscounts.selectors";
import { getPurchasedDiscountsByUser } from "../store/purchasedDiscounts/purchasedDiscounts.actions";
import { userDetailsSelector } from "../store/userDetails/userDetails.selector";
import { accessTokenSelector } from "../store/user/user.selector";
import OwnedDiscountsList from "../components/OwnedDiscounts/OwnedDiscountsList";
import styled from "styled-components";

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

const OwnedDiscounts = () => {
  const purchasedDiscounts = useSelector(purchasedDiscountsSelector);
  const userDetails = useSelector(userDetailsSelector);
  const accessToken = useSelector(accessTokenSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchasedDiscountsByUser(accessToken, userDetails.email));
  }, []);

  return (
    <Container>
      <Title>Your discounts</Title>
      {purchasedDiscounts.length > 0 ? (
        <OwnedDiscountsList
          currentUserDetails={userDetails}
          purchasedDiscounts={purchasedDiscounts}
        />
      ) : (
        <h1>You have no discounts</h1>
      )}
    </Container>
  );
};

export default OwnedDiscounts;
