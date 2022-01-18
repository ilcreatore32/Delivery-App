import { useState, useEffect, useContext } from "react";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";
import { UserContext } from "../../context/UserContextT";
import { FilterContext } from "../../context/FilterContext";

/* Material UI */
import { Typography, Grid, Paper } from "@mui/material";

/* Api */
import { GetServices } from "../../api/Get";

/* DataTable Columns */
import { ServiciosColumns } from "../../models/DataTableColums.jsx";

/* Components */
import Add from "./Add/Add";
import Delete from "./Delete/Delete";
import AppTabs from "../../components/AppTabs/AppTabs";
import Spinner from "../../components/Spinner/Spinner";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Servicios({ admin }) {
  const { view_type, token } = useContext(UserContext);
  const FilterMenuContext = useContext(filterMenuContext);
  const { serviceFilter } = useContext(FilterContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchServices = async (view, params) => {
    if (view ==="T" || view ==="C" || view ==="A") return
    await setLoading(true);
    const response = await GetServices(view, params); 
    await setServices(response);
    await setLoading(false);
  };
  useEffect(() => {
    if (!view_type || !token ) return;
    setServices([])
    if (serviceFilter) {
      switch (view_type) { 
        case "A":
          fetchServices("admin", serviceFilter);
          break;
        case "T":
          fetchServices("carrier", serviceFilter);
          break;
        default:
          break;
      }} else {
        switch (view_type) {
          case "A":
            fetchServices("admin");
            break;
          case "T":
            fetchServices("carrier");
            break;
          default:
            break;
        }
      }
  }, [view_type, token, serviceFilter]);
  
  return (
    <>
      <AppTabs />
      <Typography align="center" variant="h4" component="h2">
        Servicios
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid
            item
            xs={FilterMenuContext.filterMenu ? 6 : 0}
            md={FilterMenuContext.filterMenu ? 4 : 0}
          >
            <LeftSideComponent servicios={true} />
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
                rowId="ST_Id"
                Columns={ServiciosColumns}
                Data={services}
              >
                <Add />
                <Delete />
              </RightSideComponent>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Servicios;
