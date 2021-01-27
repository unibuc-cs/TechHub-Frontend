/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const ReportDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  type: "thread" | "post";
  reportTypes: string[];
  postId?: string;
  onSubmitReportHandler: (
    isThread: boolean,
    reportType: string,
    description: string,
    postId?: string
  ) => void;
}> = ({ open, onClose, type, reportTypes, postId, onSubmitReportHandler }) => {
  const [selectedOption, setSelectedOption] = useState<string>(reportTypes[0]);
  const [reportDescription, setReportDescription] = useState<string>("");

  const onReportOptionSelected = (e: any) => {
    setSelectedOption(e.target.value);
  };

  const onReportDescriptionChanged = (e: any) => {
    setReportDescription(e.target.value);
  };

  const submitReport = () => {
    if (type === "thread") {
      onSubmitReportHandler(true, selectedOption, reportDescription);
    } else {
      onSubmitReportHandler(false, selectedOption, reportDescription, postId!);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Submit a report</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Why are you reporting this {type === "post" ? "post" : "thread"}?
        </DialogContentText>
        <RadioGroup value={selectedOption} onChange={onReportOptionSelected}>
          {reportTypes.map((type: string) => (
            <FormControlLabel
              key={type}
              value={type}
              label={type}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
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
          onClick={submitReport}
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
