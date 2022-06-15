import React, { MouseEventHandler, useState } from "react";
import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import AddressReport from "../../../AddressReport/AddressReport";
import Modal from "@mui/material/Modal";
import ModalDelete from "../ModalDelete";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { IActiveRowObject } from "../Interfaces/TableWrapperInterfaces";

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

interface optionsBlock {
  onSave: Function;
  onCancel: Function;
  onDelete: Function;
  id: string;
  documentElement?: boolean;
  addIcon?: boolean;
  type?: "default" | "buttons";
  activeRowObject: IActiveRowObject;
  rowValues: any;
  handleEditableState: any;
}
const Index: React.FC<optionsBlock> = ({
  onSave,
  onCancel,
  onDelete,
  id,
  documentElement,
  addIcon,
  type = "default",
  activeRowObject,
  rowValues,
  handleEditableState,
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

  const saveElements = () => {
    switch (type) {
      case "default":
        return (
          <Box>
            <SaveIcon
              onClick={() => onSave(id)}
              sx={{ cursor: "pointer", mr: "10px" }}
            />
            <CancelIcon
              onClick={() => onCancel(id)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        );

      case "buttons":
        return (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Button
              variant={"contained"}
              onClick={() => onSave(id)}
              size={"small"}
              color="success"
            >
              Save
            </Button>
            <Button
              variant={"contained"}
              onClick={() => onCancel(id)}
              size={"small"}
              color="error"
            >
              Cancel
            </Button>
          </Box>
        );
    }
  };
  return (
    <div style={{ textAlign: "left" }}>
      {activeRowObject.activeRow?.number == id &&
      activeRowObject.activeRow.state != "default" ? (
        saveElements()
      ) : (
        <>
          {!rowValues.datemarkedinvalid && (
            <Box>
              {documentElement && (
                <ArticleIcon
                  sx={{ cursor: "pointer", mr: "10px" }}
                  onClick={() => handleModal(true)}
                />
              )}

              {addIcon && (
                <AddSharpIcon
                  sx={{
                    mr: "10px",
                    fill:
                      activeRowObject.activeRow.state !== "default"
                        ? "grey"
                        : "black",
                    cursor:
                      activeRowObject.activeRow.state !== "default"
                        ? "default"
                        : "pointer",
                  }}
                  onClick={() =>
                    activeRowObject.activeRow.state !== "default"
                      ? () => {}
                      : handleModal(true)
                  }
                />
              )}
              <EditSharpIcon
                onClick={() => {
                  activeRowObject.activeRow.state !== "default"
                    ? () => {}
                    : handleEditableState
                    ? handleEditableState()
                    : activeRowObject.handleRowState(
                        id,
                        activeRowObject.activeRow.state == "default"
                          ? "change"
                          : "default"
                      );
                }}
                sx={{
                  mr: "10px",
                  fill:
                    activeRowObject.activeRow.state !== "default"
                      ? "grey"
                      : "black",
                  cursor:
                    activeRowObject.activeRow.state !== "default"
                      ? "default"
                      : "pointer",
                }}
              />
              <DeleteIcon
                onClick={
                  activeRowObject.activeRow.state !== "default"
                    ? () => {}
                    : handleOpenDeleteModal
                }
                sx={{
                  fill:
                    activeRowObject.activeRow.state !== "default"
                      ? "grey"
                      : "black",
                  cursor:
                    activeRowObject.activeRow.state !== "default"
                      ? "default"
                      : "pointer",
                }}
              />
            </Box>
          )}
        </>
      )}

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
