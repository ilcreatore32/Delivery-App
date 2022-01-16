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
import { FilterContext } from "../../context/FilterContext";
import { UserContext } from "../../context/UserContextT";

function Usuarios() {
  const { view_type, token } = useContext(UserContext);
  const { userFilter, setUserFilter } = useContext(FilterContext);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const FilterMenuContext = useContext(filterMenuContext);

  const fetchUsers = async (params) => {
    await setLoading(true);
    const response = await GetUsers(params); 
    await setUsers(response);
    await setLoading(false);
  };

  useEffect(() => {
    if (!view_type || !token ) return;
    if (view_type !== "A") return;
    setUsers([]);
    fetchUsers(userFilter);
  }, [view_type, token, userFilter]);

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
