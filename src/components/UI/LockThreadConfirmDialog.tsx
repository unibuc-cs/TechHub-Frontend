import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button/Button";

const LockThreadConfirmDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onLockThread: () => void;
}> = ({ onLockThread, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Lock Thread</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to lock this thread?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onLockThread();
            onClose();
          }}
          color="secondary"
        >
          Lock
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LockThreadConfirmDialog;
