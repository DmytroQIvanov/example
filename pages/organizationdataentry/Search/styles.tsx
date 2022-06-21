import { makeStyles } from "@mui/styles";

// @ts-ignore
const useStyles = makeStyles(() => ({
  searchContainer: {
    position: "absolute",
    overflowX: "visible !important",
    marginTop: "22px",
    zIndex: 2,
  },
  result: {
    padding: "8px",
    background: "#fff",
    minHeight: "150px",
    minWidth: "500px",
    overflowY: "auto",
    boxShadow: "1px 1px 9px 2px #c6c6c6",
  },
}));

export default useStyles;
