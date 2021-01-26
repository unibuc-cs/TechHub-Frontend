import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ThreadInformation, UserDetails } from "../../store/store";

const TextfieldContainer = styled.div`
  margin: 16px 0;
`;

const AddThreadDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  category: string;
  currentEmail: string;
  onAddThread: (newThread: ThreadInformation) => void;
  accessToken: string;
  currentUserDetails: UserDetails;
}> = ({
  open,
  onClose,
  category,
  currentEmail,
  onAddThread,
  accessToken,
  currentUserDetails,
}) => {
  const [threadTitle, setThreadTitle] = useState<string>("");
  const [threadText, setThreadText] = useState<string>("");

  const onThreadTitleChangedHandler = (e: any) => {
    setThreadTitle(e.target.value);
  };

  const onThreadTextChangedHandler = (e: any) => {
    setThreadText(e.target.value);
  };

  const addThread = () => {
    const newThread: ThreadInformation = {
      category,
      dateCreated: new Date().toString(),
      id: "",
      ownerEmail: currentEmail,
      text: threadText,
      title: threadTitle,
      hasTrophy: false,
      vipStatus: false,
      userImage: currentUserDetails.profilePicture,
      username: currentUserDetails.username,
      isReported: false,
    };
    onAddThread(newThread);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Thread</DialogTitle>
      <DialogContent>
        <TextfieldContainer>
          <TextField
            variant="outlined"
            label="Thread Title"
            placeholder="Add Thread Title"
            onChange={onThreadTitleChangedHandler}
            fullWidth
          />
        </TextfieldContainer>
        <TextfieldContainer>
          <TextField
            variant="outlined"
            label="Thread Text"
            placeholder="Add Thread Text"
            onChange={onThreadTextChangedHandler}
            multiline
            rows={2}
            fullWidth
          />
        </TextfieldContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={addThread}
          color="secondary"
          disabled={threadTitle.length === 0 || threadText.length === 0}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddThreadDialog;
