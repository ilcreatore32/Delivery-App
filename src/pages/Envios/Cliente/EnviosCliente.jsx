import React from "react";

/* Material UI */
import { Typography, Grid } from "@mui/material";

/* DataTable Columns */
import { EnviosColumns } from "../../../models/DataTableColums";

/* Components */
import AppTabs from "../../../components/AppTabs/AppTabs";
import RightSideComponent from "../../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../../components/LeftSideComponent/LeftSideComponent";

function EnviosCliente() {
  return (
    <>
      <AppTabs />
      <Typography className="text-center mt-3 mb-3" variant="h4" component="h2">
        Envios
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <LeftSideComponent envios={true} />
          </Grid>
          <Grid item xs={6} md={8}>
            <RightSideComponent columns={EnviosColumns} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default EnviosCliente;
