import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const TextfieldContainer = styled.div`
  margin: 16px 0;
`;

const AddDiscountDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onAddDiscount: (
    title: string,
    description: string,
    pictures: string[],
    pointsCost: number
  ) => void;
}> = ({ open, onClose, onAddDiscount }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [pictures, setPictures] = useState<string[]>([]);
  const [pointsCost, setPointsCost] = useState<number>(0);

  const onTitleChangedHandler = (e: any) => {
    setTitle(e.target.value);
  };

  const onDescriptionChangedHandler = (e: any) => {
    setDescription(e.target.value);
  };

  const onImagesChangedHandler = (e: any) => {
    const imagesArray: any = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          imagesArray.push(reader.result?.toString());
        }
      };
      reader.readAsDataURL(e.target.files[i]);
    }
    setPictures(imagesArray);
  };

  const onPointsCostChangedHandler = (e: any) => {
    setPointsCost(e.target.value);
  };

  const onAddDiscountButtonClicked = () => {
    onAddDiscount(title, description, pictures, pointsCost);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Discount</DialogTitle>
      <DialogContent>
        <TextfieldContainer>
          <TextField
            variant="outlined"
            label="Discount Title"
            placeholder="Add Discount Title"
            onChange={onTitleChangedHandler}
            fullWidth
          />
        </TextfieldContainer>
        <TextfieldContainer>
          <TextField
            variant="outlined"
            label="Discount Description"
            placeholder="Add Discount Description"
            onChange={onDescriptionChangedHandler}
            multiline
            fullWidth
          />
        </TextfieldContainer>
        <TextfieldContainer>
          <TextField
            variant="outlined"
            label="Discount Cost"
            placeholder="Add Discount Cost"
            onChange={onPointsCostChangedHandler}
            value={pointsCost}
            fullWidth
          />
        </TextfieldContainer>
        <TextfieldContainer>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={onImagesChangedHandler}
            multiple
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              size="small"
            >
              Upload Images
            </Button>
          </label>
        </TextfieldContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={onAddDiscountButtonClicked}
          color="secondary"
          disabled={
            title === "" ||
            description === "" ||
            isNaN(pointsCost) ||
            pointsCost < 0
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDiscountDialog;
