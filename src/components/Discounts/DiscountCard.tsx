import React, { useState } from "react";
import styled from "styled-components";
import { Discount } from "../../store/store";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button/Button";
import StarIcon from "@material-ui/icons/Star";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteDiscountConfirmDialog from "../UI/DeleteDiscountConfirmDialog";
import UnlockDiscountDialog from "../UI/UnlockDiscountDialog";
import Paper from "@material-ui/core/Paper/Paper";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftSideContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const RightSideContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ImageArrowContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 125px;
  height: 125px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: start;
  padding: 4px;
`;

const Title = styled.p`
  margin-top: 0;
  font-size: 1.6em;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: start;
`;

const Description = styled.p`
  font-size: 1em;
  margin-top: 0;
  font-family: "Montserrat", sans-serif;
`;

const LowerRightContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
`;

const DiscountOwner = styled.p`
  font-size: 1em;
  font-style: italic;
  font-family: "Montserrat", sans-serif;
`;

const DateAquired = styled.p`
  font-size: 1.1em;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
`;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DiscountCard: React.FC<{
  discount: Discount;
  currentEmail: string;
  userType: string;
  onDeleteDiscount?: (id: string) => void;
  onUnlockDiscount?: (pointsSpent: number, discountId: string) => void;
  currentPoints: number;
  purchasedDate?: string;
  userVipStatus: boolean;
}> = ({
  discount,
  currentEmail,
  userType,
  onDeleteDiscount,
  onUnlockDiscount,
  currentPoints,
  purchasedDate,
  userVipStatus,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [
    deleteDiscountDialogIsVisible,
    setDeleteDiscountDialogIsVisible,
  ] = useState<boolean>(false);
  const [
    unlockDiscountDialogIsVisible,
    setUnlockDiscountIsVisible,
  ] = useState<boolean>(false);

  const increaseImageIndex = () => {
    if (currentImageIndex < discount.pictures.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const decreaseImageIndex = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  let unlockButtonColor = "#228B22";
  if (
    currentPoints < discount.pointsCost ||
    (discount.vipStatus && !userVipStatus)
  ) {
    unlockButtonColor = "salmon";
  }

  let lowerRightActions = null;

  let buttonErrorMessage = null;

  if (discount.vipStatus && !userVipStatus) {
    buttonErrorMessage = "You are not a VIP user";
  } else if (currentPoints < discount.pointsCost) {
    buttonErrorMessage = `You don't have enough points (${discount.pointsCost})`;
  }

  if (userType === "MERCHANT") {
    if (currentEmail === discount.sellerEmail) {
      lowerRightActions = (
        <Tooltip arrow title="Delete your discount">
          <IconButton onClick={() => setDeleteDiscountDialogIsVisible(true)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
      );
    }
  } else if (userType === "REGULAR_USER") {
    if (purchasedDate) {
      // user owns this discount
      lowerRightActions = (
        <DateAquired>{`Purchased on ${new Date(purchasedDate).getDate()} ${
          months[new Date(purchasedDate).getMonth()]
        }`}</DateAquired>
      );
    } else {
      lowerRightActions = (
        <Button
          size="small"
          variant="contained"
          style={{
            backgroundColor: unlockButtonColor,
            color: "white",
            marginBottom: "8px",
          }}
          onClick={() => setUnlockDiscountIsVisible(true)}
          disabled={
            currentPoints < discount.pointsCost ||
            (discount.vipStatus && !userVipStatus)
          }
        >
          {buttonErrorMessage !== null
            ? buttonErrorMessage
            : `Unlock for ${discount.pointsCost} points`}
        </Button>
      );
    }
  }

  return (
    <Paper
      elevation={3}
      style={{ width: "100%", height: "160px", margin: "12px 0" }}
    >
      <Container>
        <LeftSideContainer>
          <ImageArrowContainer>
            <ChevronLeftIcon
              fontSize="large"
              color={currentImageIndex === 0 ? "disabled" : "inherit"}
              style={{ cursor: "pointer" }}
              onClick={decreaseImageIndex}
            />
          </ImageArrowContainer>
          <ImageContainer>
            <Image
              src={discount.pictures[currentImageIndex]}
              alt="Cannot load image"
            />
          </ImageContainer>
          <ImageArrowContainer>
            <ChevronRightIcon
              fontSize="large"
              color={
                currentImageIndex === discount.pictures.length - 1
                  ? "disabled"
                  : "inherit"
              }
              style={{ cursor: "pointer" }}
              onClick={increaseImageIndex}
            />
          </ImageArrowContainer>
        </LeftSideContainer>
        <RightSideContainer>
          <TitleContainer>
            <Title>{discount.title}</Title>
            {discount.vipStatus ? (
              <Tooltip
                arrow
                title="This is a premium discount"
                style={{ marginLeft: "4px", marginTop: "4px" }}
              >
                <StarIcon />
              </Tooltip>
            ) : null}
          </TitleContainer>
          <DescriptionContainer>
            <Description>{discount.description}</Description>
          </DescriptionContainer>
          <LowerRightContainer>
            <DiscountOwner>
              Added by <b>{discount.sellerEmail}</b>
            </DiscountOwner>
            {lowerRightActions}
          </LowerRightContainer>
        </RightSideContainer>
        <DeleteDiscountConfirmDialog
          open={deleteDiscountDialogIsVisible}
          onClose={() => setDeleteDiscountDialogIsVisible(false)}
          discountId={discount.id}
          onDeleteDiscount={onDeleteDiscount!}
        />
        <UnlockDiscountDialog
          open={unlockDiscountDialogIsVisible}
          onClose={() => setUnlockDiscountIsVisible(false)}
          currentPoints={currentPoints}
          discountId={discount.id}
          onUnlockDiscount={onUnlockDiscount!}
          pointsSpent={discount.pointsCost}
        />
      </Container>
    </Paper>
  );
};

export default DiscountCard;
