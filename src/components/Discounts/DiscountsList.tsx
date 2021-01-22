import React from "react";
import styled from "styled-components";
import { Discount } from "../../store/store";
import DiscountCard from "./DiscountCard";

const Container = styled.div`
  width: 50%;
  height: 49vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 1em;
    background-color: #edf5e1;
  }

  ::-webkit-scrollbar-track {
    background-color: #edf5e1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #231f20;
  }
`;

const DiscountsList: React.FC<{
  discounts: Discount[];
  currentEmail: string;
  userType: string;
  onDeleteDiscount: (id: string) => void;
  onUnlockDiscount: (pointsSpent: number, discountId: string) => void;
  currentPoints: number;
  userVipStatus: boolean;
}> = ({
  discounts,
  currentEmail,
  userType,
  onDeleteDiscount,
  onUnlockDiscount,
  currentPoints,
  userVipStatus,
}) => {
  return (
    <Container>
      {discounts.map((discount: Discount) => (
        <DiscountCard
          key={discount.id}
          discount={discount}
          currentEmail={currentEmail}
          userType={userType}
          onDeleteDiscount={onDeleteDiscount}
          onUnlockDiscount={onUnlockDiscount}
          currentPoints={currentPoints}
          userVipStatus={userVipStatus}
        />
      ))}
    </Container>
  );
};

export default DiscountsList;
