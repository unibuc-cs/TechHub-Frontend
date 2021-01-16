import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button/Button";

const UnlockDiscountDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  discountId: string;
  pointsSpent: number;
  currentPoints: number;
  onUnlockDiscount: (pointsSpent: number, discountId: string) => void;
}> = ({
  discountId,
  pointsSpent,
  onUnlockDiscount,
  open,
  onClose,
  currentPoints,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Unlock Discount</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to unlock this discount?
        </DialogContentText>
        <DialogContentText>
          You will have <b>{currentPoints - pointsSpent}</b> points left.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onUnlockDiscount(pointsSpent, discountId);
            onClose();
          }}
          color="secondary"
        >
          Unlock
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnlockDiscountDialog;
