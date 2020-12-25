import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button/Button";

const DeletePostConfirmDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  postId: string;
  onDeletePost: (postId: string) => void;
}> = ({ postId, onDeletePost, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onDeletePost(postId)} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostConfirmDialog;
