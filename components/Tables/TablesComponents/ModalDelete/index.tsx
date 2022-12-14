import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface modalDeleteProps {
  handleClose: () => void;
  state: boolean;
  onDelete: () => void;
}
const Index: React.FC<modalDeleteProps> = ({
  onDelete,
  handleClose,
  state,
}) => {
  return (
    <Modal
      open={state}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete this record?
        </Typography>
        <Box
          sx={{
            width: "max-content",
            m: "10px 0px auto auto",
            display: "flex",
          }}
        >
          <Button onClick={onDelete} variant={"contained"} sx={{ mr: "15px" }}>
            Confirm
          </Button>
          <Button color={"error"} variant={"contained"} onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Index;
