import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CasinoIcon from "@material-ui/icons/Casino";
import Container from "@material-ui/core/Container";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NumberFormat from "react-number-format";
import ModalLogin from "./ModalLogin";
import { store } from "../context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  balance: {
    paddingRight: 20,
  },
  toolbar: {
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const datos = useContext(store);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const handleLogin = () => {
    setOpenModalLogin(true);
  };

  const handleLoginClose = () => {
    setOpenModalLogin(false);
  };

  const handleLogout = () => {
    datos.updateAuth({ isLogged: false, username: "" });
  };

  const handleLogoClick = () => {
    datos.restoreData({ isLogged: false, username: "", balance: 100 });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleLogoClick}
            >
              <CasinoIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Paktolus Casino
            </Typography>
            <Typography variant="h6" className={classes.balance}>
              Balance:{" "}
              {datos.state ? (
                <NumberFormat
                  value={datos.state.balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale="2"
                  fixedDecimalScale={true}
                />
              ) : (
                0
              )}
            </Typography>
            {datos.state && datos.state.isLogged ? (
              <>
                <Typography variant="h6">{datos.state.username}</Typography>
                <IconButton onClick={handleLogout} color="inherit">
                  <ExitToAppIcon />
                </IconButton>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <ModalLogin open={openModalLogin} handleClose={handleLoginClose} />
    </div>
  );
}
