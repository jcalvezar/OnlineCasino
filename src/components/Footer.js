import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    padding: theme.spacing(1, 2),
    marginTop: "auto",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="#">
          Paktolus Casino
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}
