import React from "react";
import { useState } from "react";

/* React-Router */
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/* Hooks */
import { useLocalStorage } from "./hooks/useLocalStorage";

/* Context */
import { authContext } from "./context/authContext";

/* Routes */
import Routes from "./routes/Routes";
import NoMatch from "./pages/NoMatch";

/* Components */
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

/* Material UI */
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Badge,
} from "@mui/material";

/* Material Icons */
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import AccountCircle from "@mui/icons-material/AccountCircleTwoTone";

/* CSS */
import "./styles/App.css";
import "./styles/Responsive.css";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [auth, setAuth] = useLocalStorage("token", null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <authContext.Provider value={{auth, setAuth}}>
        <Router>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar className="delivery-app-bar" position="static">
              <Toolbar>
                {auth ? (
                  <>
                    <IconButton
                      size="large"
                      edge="start"
                      color="secondary"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </>
                ) : null}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Delivery App
                </Typography>
                {auth ? (
                  <>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Button
                        component={Link}
                        size="small"
                        variant="text"
                        to="/Envios"
                        sx={{ padding: ".2rem" }}
                      >
                        Envios
                      </Button>
                      <Button
                        component={Link}
                        size="small"
                        to="/"
                        variant="text"
                        sx={{ padding: ".2rem" }}
                      >
                        Transporte
                      </Button>
                      <IconButton>
                        <Badge
                          size="sm"
                          color="secondary"
                          showZero
                          badgeContent={0}
                        >
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box sx={{ display: "flex", gap: ".3rem" }}>
                      <Login />
                      <Login shop={true} />
                      <SignUp />
                    </Box>
                  </>
                )}

                {auth && (
                  <div>
                    <IconButton
                      size="large"
                      aria-label="Cuenta"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.20)",
                      }}
                    >
                      <MenuItem
                        component={Link}
                        to="/Cuenta"
                        onClick={handleClose}
                      >
                        Cambiar a Cliente
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/Cuenta"
                        onClick={handleClose}
                      >
                        Su Cuenta
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setAuth(false);
                          handleClose();
                        }}
                      >
                        Salir
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Box>
          <Box>
            <Switch>
              <Routes auth={auth} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </Box>
        </Router>
      </authContext.Provider>
    </>
  );
}

export default App;
