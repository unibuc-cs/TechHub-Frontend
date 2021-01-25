import React from "react";
import styled from "styled-components";
import { PurchasedDiscount, UserDetails } from "../../store/store";
import DiscountCard from "../Discounts/DiscountCard";

const Container = styled.div`
  width: 50%;
  height: 49vh;
  padding: 8px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 1em;
    background-color: white;
  }

  ::-webkit-scrollbar-track {
    background-color: white;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #231f20;
  }
`;

const DiscountsList: React.FC<{
  purchasedDiscounts: PurchasedDiscount[];
  currentUserDetails: UserDetails;
}> = ({ purchasedDiscounts, currentUserDetails }) => {
  return (
    <Container>
      {purchasedDiscounts.map((pd: PurchasedDiscount) => (
        <DiscountCard
          key={pd.id}
          discount={pd.discount}
          currentEmail={currentUserDetails.email}
          userType={currentUserDetails.type}
          currentPoints={currentUserDetails.currentPoints}
          purchasedDate={pd.datePurchased}
          userVipStatus={currentUserDetails.vipStatus}
        />
      ))}
    </Container>
  );
};

export default DiscountsList;
