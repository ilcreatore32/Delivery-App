import React, { useState, useEffect } from "react";

/* Api */
import { GetUsers } from "../../api/Get";

/* React-Router */
import { Link } from "react-router-dom";

/* Material UI */
import { Typography, Grid, Paper, IconButton } from "@mui/material";

/* Material UI Icons */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

/* DataTable Columns */
import { UsuariosColumns } from "../../models/DataTableColums.tsx";

/* Components */
import AppTabs from "../../components/AppTabs/AppTabs";
import Spinner from "../../components/Spinner/Spinner";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Usuarios() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    await setLoading(true);
    const response = await GetUsers();
    await setUsers(response);
    await setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <AppTabs />
      <Typography align="center" variant="h4" component="h2">
        Usuarios
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid item xs={6} md={4}>
            <LeftSideComponent usuarios={true} />
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
              <RightSideComponent Columns={UsuariosColumns} Data={users} />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Usuarios;
