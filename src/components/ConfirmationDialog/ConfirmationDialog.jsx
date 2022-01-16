import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

function ConfirmationDialog({
  buttonText,
  title,
  message,
  children,
  customOpen,
  customClose,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {buttonText && (
        <Button variant="text" onClick={handleClickOpen}>
          {buttonText}
        </Button>
      )}
      <Dialog open={open || customOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2">{message}</Typography>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{marginLeft: 2}}>

          {children}
        </Box>
          <Box sx={{marginRight: 2}}>
          {customClose ? (
            customClose
          ) : (
            <Button onClick={handleClose}>Regresar</Button>
          )}
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmationDialog;
