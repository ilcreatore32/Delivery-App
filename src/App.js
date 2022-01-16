import { useContext, useEffect, useState } from "react";

/* React-Router */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";

/* Hooks */
import { useLocalStorage } from "./hooks/useLocalStorage";

/* Context */
import { authContext } from "./context/authContext";
import { userContext } from "./context/userContext";
import { appMenuContext } from "./context/appMenuContext";
import { filterMenuContext } from "./context/filterMenuContext";
import OpenEditProvider from "./context/openEditContext";
import DeleteProvider from "./context/deleteContext";

/* Routes */
import Routes from "./routes/Routes";
import NoMatch from "./pages/NoMatch";

/* Components */
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

/* Material UI */
import {
  AppBar,
  Paper,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Badge,
  Tooltip,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";

/* Material Icons */
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/NotificationsActiveTwoTone";
import AccountCircle from "@mui/icons-material/AccountCircleTwoTone";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

/* Material UI Styles */
import { ThemeProvider } from "@mui/material/styles";

/* Themes */
import { Light, Dark } from "./themes/theme";

/* CSS */
import "./styles/App.css";
import "./styles/Responsive.css";

import { UserContext as UserContextT } from "./context/UserContextT";
import FilterProvider from "./context/FilterContext";

function App() {
  const { token, view_type, setToken, setView_type, setLogged_user } =
    useContext(UserContextT);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mode, setMode] = useState(true);
  const [theme, setTheme] = useState(Light);
  const [appMenu, setAppMenu] = useState(false);
  const [filterMenu, setFilterMenu] = useState(false);

  const handleModeToggle = () => {
    mode ? setTheme(Dark) : setTheme(Light);
    setMode(!mode);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <FilterProvider>
            <OpenEditProvider>
              <DeleteProvider>
                <appMenuContext.Provider value={{ appMenu, setAppMenu }}>
                  <filterMenuContext.Provider
                    value={{ filterMenu, setFilterMenu }}
                  >
                    <Router>
                      <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static" enableColorOnDark>
                          <Toolbar>
                            {token ? (
                              <>
                                <IconButton
                                  edge="start"
                                  color="primary"
                                  aria-label="Menu"
                                  sx={{ mr: 2 }}
                                  onClick={() => setAppMenu(!appMenu)}
                                >
                                  {appMenu ? <CloseIcon /> : <MenuIcon />}
                                </IconButton>
                              </>
                            ) : null}
                            <Typography
                              variant="h6"
                              component="div"
                              color="text.primary"
                              sx={{ flexGrow: 1 }}
                            >
                              Delivery App
                            </Typography>
                            {token ? (
                              <>
                                <Box sx={{ display: "flex", gap: "1rem" }}>
                                  <Button
                                    component={Link}
                                    size="small"
                                    variant="text"
                                    color="primary"
                                    to="/Envios"
                                    sx={{ padding: ".2rem" }}
                                  >
                                    Dashboard
                                  </Button>
                                  <Tooltip
                                    title={`Cambiar a ${
                                      mode ? "Oscuro" : "Claro"
                                    }`}
                                    arrow
                                  >
                                    <IconButton
                                      onClick={handleModeToggle}
                                      color="inherit"
                                    >
                                      {mode ? (
                                        <Brightness7Icon color="primary" />
                                      ) : (
                                        <Brightness4Icon color="primary" />
                                      )}
                                    </IconButton>
                                  </Tooltip>
                                  <IconButton>
                                    <Badge
                                      size="sm"
                                      color="secondary"
                                      showZero
                                      badgeContent={0}
                                    >
                                      <NotificationsIcon color="primary" />
                                    </Badge>
                                  </IconButton>
                                </Box>
                              </>
                            ) : (
                              <>
                                <Box sx={{ display: "flex", gap: ".3rem" }}>
                                  <Tooltip
                                    title={`Cambiar a ${
                                      mode ? "Oscuro" : "Claro"
                                    }`}
                                    arrow
                                  >
                                    <IconButton
                                      onClick={handleModeToggle}
                                      color="inherit"
                                    >
                                      {mode ? (
                                        <Brightness7Icon color="primary" />
                                      ) : (
                                        <Brightness4Icon color="primary" />
                                      )}
                                    </IconButton>
                                  </Tooltip>
                                  <Login />
                                  <Login shop={true} />
                                  <SignUp />
                                </Box>
                              </>
                            )}

                            {token && (
                              <div>
                                <IconButton
                                  aria-label="Cuenta"
                                  aria-controls="menu-appbar"
                                  aria-haspopup="true"
                                  onClick={handleMenu}
                                  color="primary"
                                >
                                  <AccountCircle />
                                </IconButton>
                                <Menu
                                  id="menu-appbar"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                  transformOrigin={{
                                    horizontal: "right",
                                    vertical: "top",
                                  }}
                                  anchorOrigin={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                  }}
                                  MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                  }}
                                  sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.20)",
                                  }}
                                >
                                  {view_type === "C" ? (
                                    <MenuItem
                                      onClick={() => setView_type("T")}
                                      color="primary"
                                    >
                                      Cambiar a Transportista
                                    </MenuItem>
                                  ) : null}
                                  {view_type === "T" ? (
                                    <MenuItem
                                      onClick={() => setView_type("C")}
                                      color="primary"
                                    >
                                      Cambiar a Cliente
                                    </MenuItem>
                                  ) : null}
                                  {view_type === "A" ? (
                                    <MenuItem color="primary">
                                      Usted es Administrador
                                    </MenuItem>
                                  ) : null}
                                  <MenuItem
                                    component={Link}
                                    to="/Cuenta"
                                    onClick={handleClose}
                                    color="primary"
                                  >
                                    Su Cuenta
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      setLogged_user({});
                                      setToken("");
                                      setView_type("C");
                                      handleClose();
                                    }}
                                    color="primary"
                                  >
                                    Salir
                                  </MenuItem>
                                </Menu>
                              </div>
                            )}
                          </Toolbar>
                        </AppBar>
                      </Box>
                      <Paper square elevation={0}>
                        <Switch>
                          <Routes auth={token} />
                          <Route path="*" component={NoMatch} />
                        </Switch>
                      </Paper>
                    </Router>
                  </filterMenuContext.Provider>
                </appMenuContext.Provider>
              </DeleteProvider>
            </OpenEditProvider>
          </FilterProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
