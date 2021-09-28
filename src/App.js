import { React } from "react";
import { useState } from "react";

/* React-Router */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

/* App Pages */
import Login from "./components/Login/Login";
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
} from "@mui/material";

import MaterialSwitch from "@mui/material/Switch";

/* Material Icons */
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

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

  return (
    <>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar className="delivery-app-bar" position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
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
              <Button component={Link} variant="outlined" to="/">
                Envios
              </Button>
              <Button component={Link} variant="outlined" to="/">
                Transporte
              </Button>
              {auth && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
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
                  >
                    <MenuItem onClick={handleClose}>Cambiar a Cliente</MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to="/Cuenta">Su Cuenta</Link>
                    </MenuItem>
                    <MenuItem onClick={handleChange}>Salir</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <div className="app-page wrapper">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/Envios" exact component={Envios} />
            {/* Cuenta */}
            <Route path="/Cuenta" exact component={Cuenta} />
            <Route path="/Cuenta/Editar" exact component={EditarCuenta} />
            {/* Transportista */}
            <Route path={`/Asumidos`} exact component={Asumidos} />
            <Route path={`/Servicios`} exact component={Servicios} />
            <Route path={`/Vehiculos`} exact component={Vehiculos} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
