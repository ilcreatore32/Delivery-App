import React from "react";
import { useState } from "react";

/* React-Router */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

/* Components */
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

/* App Pages */
import Home from "./pages/Home/Home";
import Envios from "./pages/Envios/Envios";
/* Cuenta */
import Cuenta from "./pages/Cuenta/Cuenta";
import EditarCuenta from "./pages/Cuenta/EditarCuenta/EditarCuenta";
/* Transportista*/
import Vehiculos from "./pages/Vehiculos/Vehiculos";
import Servicios from "./pages/Servicios/Servicios";
import Asumidos from "./pages/Asumidos/Asumidos";
import NoMatch from "./pages/NoMatch";

/* Material UI */
import {
  FormControlLabel,
  FormGroup,
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

import MaterialSwitch from "@mui/material/Switch";

/* Material Icons */
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import AccountCircle from "@mui/icons-material/AccountCircleTwoTone";

/* CSS */
import "./styles/App.css";
import "./styles/Responsive.css";

function App() {
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const PrivateRoute = ({ auth, component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          auth ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
        }
      />
    );
  };

  return (
    <>
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
              <FormGroup>
                <FormControlLabel
                  control={
                    <MaterialSwitch
                      checked={auth}
                      onChange={handleChange}
                      aria-label="login switch"
                    />
                  }
                  label={auth ? "Logout" : "Login"}
                />
              </FormGroup>
              {auth ? (
                <>
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Button
                      component={Link}
                      size="small"
                      variant="text"
                      to="/Envios"
                      auth={auth}
                      sx={{ padding: ".2rem" }}
                    >
                      Envios
                    </Button>
                    <Button
                      component={Link}
                      size="small"
                      to="/"
                      variant="text"
                      auth={auth}
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
                  <Button variant="text" component={Login}>
                    Sign in
                  </Button>
                  <Button variant="text" component={SignUp}>
                    Sign up
                  </Button>
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
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/Envios" exact component={Envios} auth={auth} />
            {/* Cuenta */}
            <PrivateRoute path="/Cuenta" exact component={Cuenta} auth={auth} />
            <PrivateRoute
              path="/Cuenta/Editar"
              exact
              component={EditarCuenta}
              auth={auth}
            />
            {/* Transportista */}
            <PrivateRoute
              path={`/Asumidos`}
              exact
              component={Asumidos}
              auth={auth}
            />
            <PrivateRoute
              path={`/Servicios`}
              exact
              component={Servicios}
              auth={auth}
            />
            <PrivateRoute
              path={`/Vehiculos`}
              exact
              component={Vehiculos}
              auth={auth}
            />
            <Route path="*" component={NoMatch} />
          </Switch>
        </Box>
      </Router>
    </>
  );
}

export default App;
