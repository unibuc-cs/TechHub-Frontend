import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button/Button";

const BanUserConfirmDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  username: string;
  onBanUser: (email: string) => void;
  email: string;
}> = ({ username, onBanUser, open, onClose, email }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ban User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to ban <b>{username}</b> ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onBanUser(email);
            onClose();
          }}
          color="secondary"
        >
          BAN
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BanUserConfirmDialog;
