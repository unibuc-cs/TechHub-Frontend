import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button/Button";

const DeleteDiscountConfirmDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  discountId: string;
  onDeleteDiscount: (discountId: string) => void;
}> = ({ discountId, onDeleteDiscount, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Discount</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this discount?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onDeleteDiscount(discountId);
            onClose();
          }}
          color="secondary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDiscountConfirmDialog;
