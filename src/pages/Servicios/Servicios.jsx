import React from "react";

/* Material UI */
import { Typography, Grid } from "@mui/material";

/* DataTable Columns */
import { ServiciosColumns } from "../../models/DataTableColums";

/* Components */
import AppTabs from "../../components/AppTabs/AppTabs";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Servicios() {
  return (
    <>
      <AppTabs />
      <Typography className="text-center mt-3 mb-3" variant="h4" component="h2">
        Servicios
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <LeftSideComponent servicios={true} />
          </Grid>
          <Grid item xs={6} md={8}>
            <RightSideComponent columns={ServiciosColumns} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Servicios;
