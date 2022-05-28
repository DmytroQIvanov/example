import React from "react";
import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";

interface optionsBlock {
  editStateBoolean: Boolean;
  onSave: Function;
  onCancel: Function;
  handleEditableState: Function;
  onDelete: Function;
  id: string;
  validateState: boolean;
}
const Index: React.FC<optionsBlock> = ({
  editStateBoolean,
  onSave,
  onCancel,
  handleEditableState,
  onDelete,
  id,
  validateState,
}) => {
  return (
    <div>
      {validateState &&
        (editStateBoolean ? (
          <Box sx={{ mt: "20px" }}>
            <SaveIcon onClick={onSave} sx={{ cursor: "pointer", mr: "10px" }} />
            <CancelIcon onClick={onCancel} sx={{ cursor: "pointer" }} />
          </Box>
        ) : (
          <>
            <EditSharpIcon
              onClick={handleEditableState}
              sx={{ cursor: "pointer", mr: "10px" }}
            />
            <DeleteIcon
              onClick={() => {
                onDelete(id);
              }}
              sx={{ cursor: "pointer" }}
            />
          </>
        ))}
    </div>
  );
};

export default Index;
