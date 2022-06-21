import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  content: {},
  internal: {
    background: "#8a1c1c",
    padding: "10px",
    borderRadius: "6px",
  },
  editInternal: {
    border: "2px solid black",
    padding: "0px",
    borderRadius: "6px",
    "& input": {
      fontSize: "14px",
    },
  },
  container: {
    padding: "0px 10px",
  },
  containerWhite: {
    padding: "5px",
    background: "white",
  },
  orgName: {
    paddingLeft: "8px !important",
  },
  topSection: {
    paddingTop: "10px",
  },
  bottomSection: {
    paddingBottom: "10px",
  },
  item: {
    // padding: '5px',
    background: "white",
    borderRadius: "3px",
  },
  textContent: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    fontSize: "13px",
    fontWeight: "500",
    minHeight: "20px",
  },
  textTitle: {
    fontSize: "12px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    marginBottom: "3px",
  },
  itemPaddingWhite: {
    padding: "3px",
    background: "white",
  },
  itemBtn: {
    display: "flex",
    marginTop: "5px",

    "& > button": {
      textTransform: "initial",
      padding: "6px 10px",
    },
  },
  prompt: {
    fontSize: "14px",
    display: "flex",
  },
  icon: {
    color: "#3b3b3b",
    fontSize: "18px",
    cursor: "pointer",
    position: "absolute",
    right: "120px",

    "&:hover": {
      color: "#1b1b1b",
    },
  },
  iconSection: {
    padding: "8px 0px 0px 20px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
  },
  actionIcon: {
    color: "#7b7b7b",
    cursor: "pointer",
    fontSize: "24px",
    margin: "0px 5px",

    "&:hover": {
      color: "#6b6b6b",
    },
  },
  actionContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
}));

export default useStyles;
