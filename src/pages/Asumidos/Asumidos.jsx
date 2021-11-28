import React, { useState, useEffect } from "react";

/* Api */
import { GetShippments } from "../../api/Get";

/* React-Router */
import { Link } from "react-router-dom";

/* Material UI */
import { Typography, Grid, Paper, IconButton } from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

/* DataTable Columns */
import { EnviosColumns } from "../../models/DataTableColums.tsx";

/* Components */
import AppTabs from "../../components/AppTabs/AppTabs";
import Spinner from "../../components/Spinner/Spinner";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Asumidos() {
  const [shippments, setShippments] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchShippments = async () => {
    await setLoading(true);
    const response = await GetShippments();
    await setShippments(response);
    await setLoading(false);
  };

  useEffect(() => {
    fetchShippments();
  }, []);

  return (
    <>
      <AppTabs />
      <Typography align="center" variant="h4" component="h2">
        Envios Asumidos
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <LeftSideComponent envios={true} asumidos={true} />
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
              <RightSideComponent rowId="SE_Id" Columns={EnviosColumns} Data={shippments} />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Asumidos;
