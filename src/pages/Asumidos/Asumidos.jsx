import React from "react";

/* Material UI */
import { Typography, Grid } from "@mui/material";

/* DataTable Columns */
import { EnviosColumns } from "../../models/DataTableColums.tsx";

/* Components */
import AppTabs from "../../components/AppTabs/AppTabs";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Asumidos() {
  const Data = [
    {
      id: 1,
      location: "caracas",
      products: "harina",
      price: 12,
      weight: 144,
      date: "01.01.2021",
    },
  ];
  return (
    <>
      <AppTabs />
      <Typography className="text-center mt-3 mb-3" variant="h4" component="h2">
        Envios Asumidos
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <LeftSideComponent envios={true} asumidos={true} />
          </Grid>
          <Grid item xs={6} md={8}>
            <RightSideComponent Columns={EnviosColumns} Data={Data} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Asumidos;
