import React from "react";

/* React-Router */
import { Link } from 'react-router-dom';

/* Material UI */
import { Typography, Grid, Paper, Button } from "@mui/material";

/* DataTable Columns */
import { EnviosColumns } from "../../../models/DataTableColums";

/* Components */
import AddEnvios from "../AddEnvios/AddEnvios";
import AppTabs from "../../../components/AppTabs/AppTabs";
import RightSideComponent from "../../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../../components/LeftSideComponent/LeftSideComponent";

function EnviosTransportista({ admin }) {
  return (
    <>
      <AppTabs />
      <Typography className="text-center mt-3 mb-3" variant="h4" component="h2">
        Descubrir Envios
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <LeftSideComponent envios={true} />
          </Grid>
          <Grid item xs={6} md={8}>
            {admin ? (
              <>
                <Paper variant="outlined" sx={{ margin: ".3rem auto" }}>
                  <AddEnvios />
                  <Button component={Link} to="/Envios/Detalles">detalles</Button>
                </Paper>
              </>
            ) : null}
            <RightSideComponent columns={EnviosColumns} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default EnviosTransportista;
