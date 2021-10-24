import React from "react";

/* React-Router */
import { Link } from "react-router-dom";

/* Material UI */
import { Typography, Grid, Paper, IconButton } from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

/* DataTable Columns */
import { PagosColumns } from "../../models/DataTableColums.tsx";

/* Components */
import AppTabs from "../../components/AppTabs/AppTabs";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Pagos() {
  const Data = [
    {
      id: "1",
      Metodo: "transferencia",
      Fecha: "01/01/2021",
      Monto: "50",
      Estatus: "pagado",
      Usuario: "jesus rivas",
    },
  ];
  return (
    <>
      <AppTabs />
      <Typography className="text-center mt-3 mb-3" variant="h4" component="h2">
        Pagos
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <LeftSideComponent pagos={true} />
          </Grid>
          <Grid item xs={6} md={8}>
            <Paper variant="outlined" sx={{ margin: ".3rem auto" }}>
              <IconButton component={Link} to="/Servicios/Añadir">
                <AddCircleTwoToneIcon size="large" />
              </IconButton>
            </Paper>
            <RightSideComponent Columns={PagosColumns} Data={Data} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Pagos;
