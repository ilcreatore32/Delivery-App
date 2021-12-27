import { useState, useEffect } from "react";

/* API */
import { GetShippments } from "../../../api/Get";

/* Material UI */
import { Typography, Grid, Paper } from "@mui/material";

/* DataTable Columns */
import { EnviosColumns } from "../../../models/DataTableColums.tsx";

/* Components */
import Add from "../Add/Add";
import Spinner from "../../../components/Spinner/Spinner";
import AppTabs from "../../../components/AppTabs/AppTabs";
import RightSideComponent from "../../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../../components/LeftSideComponent/LeftSideComponent";

function EnviosCliente(Shippments) {
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
        Envíos
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <LeftSideComponent envios={true} />
          </Grid>
          <Grid item xs={6} md={8}>
            <Paper variant="outlined" sx={{ margin: ".3rem auto" }}>
              <Add />
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
                rowId="SE_Id"
                Columns={EnviosColumns}
                Data={shippments}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default EnviosCliente;
