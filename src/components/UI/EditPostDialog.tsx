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

const EditPostDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onEditPost: (newText: string, postId: string) => void;
  currentPostText: string;
  postId: string;
}> = ({ open, onClose, onEditPost, currentPostText, postId }) => {
  const [postText, setPostText] = useState<string>(currentPostText);

  const onPostTextChangedHandler = (e: any) => {
    setPostText(e.target.value);
  };

  const addThread = () => {
    onEditPost(postText, postId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextfieldContainer>
          <TextField
            variant="outlined"
            label="Text"
            placeholder="Edit the post..."
            onChange={onPostTextChangedHandler}
            value={postText}
            fullWidth
          />
        </TextfieldContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={addThread} color="secondary">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;
