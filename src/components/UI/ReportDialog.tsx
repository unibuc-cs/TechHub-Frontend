import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";

const ReportDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  type: "thread" | "post";
}> = ({ open, onClose, type }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    misinformation: false,
    inappropiate: false,
    spam: false,
  });
  const [reportDescription, setReportDescription] = useState<string>("");

  const onReportOptionSelected = (e: any) => {
    setSelectedOptions({
      ...selectedOptions,
      [e.target.name]: e.target.checked,
    });
  };

  const onReportDescriptionChanged = (e: any) => {
    setReportDescription(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Submit a report</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Why are you reporting this {type === "post" ? "post" : "thread"}?
        </DialogContentText>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions.misinformation}
                onChange={onReportOptionSelected}
                name="misinformation"
              />
            }
            label="Misinformation"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions.inappropiate}
                onChange={onReportOptionSelected}
                name="inappropiate"
              />
            }
            label="Inappropiate"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions.spam}
                onChange={onReportOptionSelected}
                name="spam"
              />
            }
            label="Spam"
          />
        </FormGroup>
        <DialogContentText>Add a description for the report</DialogContentText>
        <TextField
          label="Description"
          placeholder="Add a description"
          multiline
          variant="outlined"
          onChange={onReportDescriptionChanged}
          rows={2}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {}}
          color="secondary"
          disabled={reportDescription === ""}
        >
          Submit report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
