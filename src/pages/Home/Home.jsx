import React from "react";

/* Material UI */
import { Box, Typography, Button, Paper } from "@mui/material";

/* CSS */
import "./Home.css";

function Home() {
  return (
    <>
      <Box className="home-images">
        <Box
          className="backdrop"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                backgroundColor: "#23272a",
                padding: "1rem",
              }}
            >
              <Typography variant="h6" color="secondary" component="span">
                Welcome to
              </Typography>
              <Typography variant="h2" color="#fff" component="h1">
                Delivery App
              </Typography>
              <Typography
                variant="body2"
                color="#ccc"
                component="p"
                sx={{ margin: "2rem 0" }}
              >
                Sistema Web de Auto-gestión de envíos a nivel nacional, usando
                el modelo de negocio Crowdshipping.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  margin: "2rem 0",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Button variant="outlined" color="secondary">
                  Get Started
                </Button>
                <Button variant="outlined" color="secondary">
                  Sign in
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
