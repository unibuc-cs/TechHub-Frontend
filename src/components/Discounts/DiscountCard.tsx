import React, { useState } from "react";
import styled from "styled-components";
import { Discount } from "../../store/store";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button/Button";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteDiscountConfirmDialog from "../UI/DeleteDiscountConfirmDialog";

const Container = styled.div`
  width: 100%;
  border: 1px solid #231f20;
  height: 150px;
  margin: 8px 0;
  box-shadow: 4px 4px 4px #231f20;
  display: flex;
  margin-bottom: 8px;
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
  font-size: 1.7em;
  font-weight: bold;
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
  font-size: 1.1em;
  margin-top: 0;
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
  font-size: 1.1em;
  font-style: italic;
`;

const DiscountCard: React.FC<{
  discount: Discount;
  currentEmail: string;
  userType: string;
  onDeleteDiscount: (id: string) => void;
}> = ({ discount, currentEmail, userType, onDeleteDiscount }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [
    deleteDiscountDialogIsVisible,
    setDeleteDiscountDialogIsVisible,
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

  return (
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
        </TitleContainer>
        <DescriptionContainer>
          <Description>{discount.description}</Description>
        </DescriptionContainer>
        <LowerRightContainer>
          <DiscountOwner>
            Added by <b>{discount.sellerEmail}</b>
          </DiscountOwner>
          {userType === "MERCHANT" ? (
            currentEmail === discount.sellerEmail ? (
              <Tooltip arrow title="Delete your discount">
                <IconButton
                  onClick={() => setDeleteDiscountDialogIsVisible(true)}
                >
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Tooltip>
            ) : null
          ) : (
            <Button
              size="small"
              variant="contained"
              style={{
                backgroundColor: "#228B22",
                color: "white",
                marginBottom: "8px",
              }}
              onClick={() => {}}
            >
              Unlock for {discount.pointsCost} points
            </Button>
          )}
        </LowerRightContainer>
      </RightSideContainer>
      <DeleteDiscountConfirmDialog
        open={deleteDiscountDialogIsVisible}
        onClose={() => setDeleteDiscountDialogIsVisible(false)}
        discountId={discount.id}
        onDeleteDiscount={onDeleteDiscount}
      />
    </Container>
  );
};

export default DiscountCard;
