import React, { useState, useEffect } from "react";

/* React-Router */
import { Link } from "react-router-dom";

/* Material UI */
import { Typography, Grid, Paper, IconButton } from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

/* Api */
import { GetServices } from "../../api/Get";

/* DataTable Columns */
import { ServiciosColumns } from "../../models/DataTableColums.tsx";

/* Components */
import AppTabs from "../../components/AppTabs/AppTabs";
import Spinner from "../../components/Spinner/Spinner";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Servicios({ admin }) {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchService = async () => {
    await setLoading(true);
    const response = await GetServices();
    await setServices(response);
    await setLoading(false);
  };

  useEffect(() => {
    fetchService();
  }, []);

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
            <Paper variant="outlined" sx={{ margin: ".3rem auto" }}>
              <IconButton component={Link} to="/Servicios/Añadir">
                <AddCircleTwoToneIcon size="large" />
              </IconButton>
            </Paper>
            {loading ? (
              <Paper
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: ".3rem auto",
                }}
              >
                <Spinner loading={loading} />
              </Paper>
            ) : (
              <RightSideComponent
                rowId="ST_Id"
                Columns={ServiciosColumns}
                Data={services}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Servicios;
