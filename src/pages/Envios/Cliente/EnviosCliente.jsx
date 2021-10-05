import React from "react";

/* Material UI */
import { Typography, Grid, Paper, IconButton } from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

/* DataTable Columns */
import { EnviosColumns } from "../../../models/DataTableColums";

/* Components */
import AppTabs from "../../../components/AppTabs/AppTabs";
import RightSideComponent from "../../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../../components/LeftSideComponent/LeftSideComponent";

function EnviosCliente({ admin }) {
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
            {admin ? (
              <>
                <Paper variant="outlined" sx={{ margin: ".3rem auto" }}>
                  <IconButton>
                    <AddCircleTwoToneIcon size="large" color="secondary" />
                  </IconButton>
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

export default EnviosCliente;
