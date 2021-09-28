import React from "react";

/* Material UI */
import {
  Grid,
  Paper,
  Typography,
  Backdrop,
  Button,
  TextField,
  Box,
} from "@mui/material";
// import { CircularProgress } from "@material-ui/core";

/* CSS */
import "./Login.css";
import logo from "../../assets/logo.png";

function Login() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={handleToggle}>Sign In</Button>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          {/* <CircularProgress color="inherit" /> */}
          <Grid className="login-component">
            <Paper elevation={10} className="paper-style">
              <Grid align="center">
                <img alt="Logo" src={logo} className="logo" />
                <Typography variant="h4" component="h2">
                  Welcome
                </Typography>
                <Grid>
                  <Typography variant="h6" component="h1">
                    Sign In
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateRows: "repeat(2, 1fr)",
                    }}
                  >
                    <TextField
                      id=""
                      label="Outlined"
                      variant="outlined"
                      type="email"
                    />
                    <TextField id="" label="Outlined" variant="outlined" />
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: "repeat(2, 1fr)",
                    }}
                  >
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button>Acceder</Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Backdrop>
      </div>
    </>
  );
}

export default Login;
