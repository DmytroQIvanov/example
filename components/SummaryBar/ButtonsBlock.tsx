import React from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

const ButtonsBlock: React.FC<{
  editStatus: number;
  collapse: boolean;
  handleEditStatus: () => void;
  handleCollapse: () => void;
  onSave: () => void;
  onCancel: () => void;
  onCreateUser: () => void;
}> = ({
  editStatus,
  collapse,
  handleCollapse,
  handleEditStatus,
  onSave,
  onCancel,
  onCreateUser,
}) => {
  let router = useRouter();
  const goToPreviousPath = () => {
    router.back();
  };
  let component;

  switch (editStatus) {
    case 0:
      component = (
        <>
          {!collapse && (
            <Button
              style={{
                marginRight: 10,
              }}
              variant="contained"
              onClick={() => handleEditStatus()}
            >
              Edit
            </Button>
          )}
          <Button
            style={{
              backgroundColor: "#6BAD43",
            }}
            variant="contained"
            onClick={() => handleCollapse()}
          >
            {collapse ? "Expand" : "Collapse"}
          </Button>
        </>
      );
      break;
    case 1:
      component = (
        <>
          <Button
            style={{
              marginRight: 10,
            }}
            variant="contained"
            onClick={() => onSave()}
          >
            Save
          </Button>
          <Button
            style={{
              // backgroundColor: "#6BAD43",
              backgroundColor: "#AA2B2B",
            }}
            variant="contained"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        </>
      );
      break;
    case 2:
      component = (
        <>
          <Button
            style={{
              marginRight: 10,
            }}
            variant="contained"
            onClick={() => onCreateUser()}
          >
            Create
          </Button>
          <Button
            style={{
              // backgroundColor: "#6BAD43",
              backgroundColor: "#AA2B2B",
            }}
            variant="contained"
            onClick={() => {
              onCancel();
              goToPreviousPath();
            }}
          >
            Cancel
          </Button>
        </>
      );
      break;
  }

  return <Box sx={{ m: 2, textAlign: "center" }}>{component}</Box>;
};

export default ButtonsBlock;
