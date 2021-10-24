import React from "react";

/* Material UI */
import { Box, Paper } from "@mui/material";

/* React-Bootstrap */
import Form from "react-bootstrap/Form";

function Usuarios() {
  return (
    <>
      <Form>
        <Box
          sx={{
            display: "grid",
            rowGap: 1,
            margin: "1rem",
            padding: "1rem 0",
          }}
        >
          <Paper variant="outlined" sx={{ padding: "1rem" }}></Paper>
        </Box>
      </Form>
    </>
  );
}
export default Usuarios;
