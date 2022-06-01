import React, { MouseEventHandler, useState } from "react";
import { Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import AddressReport from "../../../AddressReport/AddressReport";
import Modal from "@mui/material/Modal";
import ModalDelete from "../ModalDelete";

interface optionsBlock {
  editStateBoolean?: "default" | "change" | "add";
  onSave: Function;
  onCancel: Function;
  handleEditableState: MouseEventHandler<SVGSVGElement>;
  onDelete: Function;
  id: string;
  validateState: boolean;
  documentElement?: boolean;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "94%",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflow: "auto",
};

const Index: React.FC<optionsBlock> = ({
  editStateBoolean = "default",
  onSave,
  onCancel,
  handleEditableState,
  onDelete,
  id,
  validateState,
  documentElement,
}) => {
  const [modal, setOpenModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
  };
  const handleModal = (state?: boolean) => {
    setOpenModal(state || !modal);
  };

  return (
    <div>
      {validateState &&
        (editStateBoolean == "add" || editStateBoolean == "change" ? (
          <Box sx={{ mt: "20px" }}>
            <SaveIcon
              onClick={() => onSave(id)}
              sx={{ cursor: "pointer", mr: "10px" }}
            />
            <CancelIcon
              onClick={() => onCancel(id)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        ) : (
          <>
            {documentElement && (
              <ArticleIcon
                sx={{ cursor: "pointer", mr: "10px" }}
                onClick={() => handleModal(true)}
              />
            )}
            <EditSharpIcon
              onClick={handleEditableState}
              sx={{ cursor: "pointer", mr: "10px" }}
            />
            <DeleteIcon
              onClick={() => {
                handleOpenDeleteModal();
              }}
              sx={{ cursor: "pointer" }}
            />
          </>
        ))}
      {modal && (
        <Modal
          open={modal}
          onClose={() => handleModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddressReport onClose={() => handleModal(false)} />
          </Box>
        </Modal>
      )}
      {deleteModal && (
        <ModalDelete
          handleClose={handleCloseDeleteModal}
          state={deleteModal}
          onDelete={() => {
            onDelete(id);
            handleCloseDeleteModal();
          }}
        />
      )}
    </div>
  );
};

export default Index;
