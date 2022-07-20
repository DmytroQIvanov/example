import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  layout: {
    display: "flex",
  },
  content: {
    overflow: "auto",
    width: "100%",
    // height: "100vh",
  },
  actions: {
    position: "absolute",
    right: "25px",
    marginTop: "-50px",

    "& > button": {
      textTransform: "initial",
      fontSize: "13px",
      marginLeft: "10px",
      borderRadius: "10px",
    },
  },
}));

export default useStyles;
