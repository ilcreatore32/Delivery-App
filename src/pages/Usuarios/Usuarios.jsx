import { useState, useEffect, useContext } from "react";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";

/* Api */
import { GetUsers } from "../../api/Get";

/* Material UI */
import { Typography, Grid, Paper } from "@mui/material";

/* DataTable Columns */
import { UsuariosColumns } from "../../models/DataTableColums.jsx";

/* Components */
import Add from "./Add/Add";
import AppTabs from "../../components/AppTabs/AppTabs";
import Spinner from "../../components/Spinner/Spinner";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Usuarios() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const FilterMenuContext = useContext(filterMenuContext);

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
          <Grid
            item
            xs={FilterMenuContext.filterMenu ? 6 : 0}
            md={FilterMenuContext.filterMenu ? 4 : 0}
          >
            <LeftSideComponent usuarios={true} />
          </Grid>
          <Grid
            item
            xs={FilterMenuContext.filterMenu ? 6 : 12}
            md={FilterMenuContext.filterMenu ? 8 : 12}
          >
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
                Columns={UsuariosColumns}
                Data={users}
                rowId="Persona_Id"
              >
                <Add />
              </RightSideComponent>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Usuarios;
