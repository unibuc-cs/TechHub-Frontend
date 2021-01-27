import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button/Button";
import ItemReports from "../../pages/ItemReports";

const ItemReportsDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  reportedItemId: string;
  isThread: boolean;
}> = ({ open, onClose, reportedItemId, isThread }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Reports for this {isThread ? "thread" : "post"}</DialogTitle>
      <DialogContent>
        <ItemReports reportedItemId={reportedItemId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemReportsDialog;
