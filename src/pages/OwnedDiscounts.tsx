import React from "react";
import { useSelector } from "react-redux";
import { purchasedDiscountsSelector } from "../store/purchasedDiscounts/purchasedDiscounts.selectors";
import { userDetailsSelector } from "../store/userDetails/userDetails.selector";
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
