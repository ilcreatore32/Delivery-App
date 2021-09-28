import React from "react";

/* Material UI */
import { Typography, Grid } from "@mui/material";

/* DataTable Columns */
import { VehiculosColumns } from "../../models/DataTableColums";

/* Components */
import AppTabs from "../../components/AppTabs/AppTabs";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Vehiculos() {
  return (
    <>
      <AppTabs />
      <Typography className="text-center mt-3 mb-3" variant="h4" component="h2">
        Sus Vehiculos
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <LeftSideComponent vehiculos={true} />
          </Grid>
          <Grid item xs={6} md={8}>
            <RightSideComponent columns={VehiculosColumns} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Vehiculos;
