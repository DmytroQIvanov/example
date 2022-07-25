import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  layout: {
    display: "flex",
  },
  content: {
    overflow: "clip",
    width: "100%",
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
