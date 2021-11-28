import React, { useState, useEffect } from "react";

/* API */
import { GetPayments } from "../../api/Get";

/* React-Router */
import { Link } from "react-router-dom";

/* Material UI */
import { Typography, Grid, Paper, IconButton } from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

/* DataTable Columns */
import { PagosColumns } from "../../models/DataTableColums.tsx";

/* Components */
import Spinner from "../../components/Spinner/Spinner";
import AppTabs from "../../components/AppTabs/AppTabs";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Pagos() {
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    await setLoading(true);
    const response = await GetPayments();
    await setPayments(response);
    await setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      <AppTabs />
      <Typography align="center" variant="h4" component="h2">
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
                rowId="PS_Id"
                Columns={PagosColumns}
                Data={payments}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Pagos;
