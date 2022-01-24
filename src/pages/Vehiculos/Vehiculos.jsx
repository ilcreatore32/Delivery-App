import { useState, useEffect, useContext } from "react";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";
import { FilterContext } from "../../context/FilterContext";
import { UserContext } from "../../context/UserContextT";

/* API */
import { GetVehicles } from "../../api/Get";

/* Material UI */
import { Typography, Grid, Paper } from "@mui/material";

/* DataTable Columns */
import { VehiculosColumns } from "../../models/DataTableColums.jsx";

/* Components */
import Add from "./Add/Add";
import AppTabs from "../../components/AppTabs/AppTabs";
import Spinner from "../../components/Spinner/Spinner";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";
import Delete from "./Delete/Delete";

function Vehiculos() {
  const { view_type, token } = useContext(UserContext);
  const { vehicleFilter } = useContext(FilterContext);
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(false);
  const FilterMenuContext = useContext(filterMenuContext);

  const fetchVehicles = async (view, params) => {
    if (view === "T" || view === "C" || view === "A") return;
    await setLoading(true);
    const response = await GetVehicles(view, params);
    await setVehicles(response);
    await setLoading(false);
  };

  useEffect(() => {
    if (!view_type || !token) return;
    setVehicles([]);
    if (vehicleFilter) {
      switch (view_type) {
        case "A":
          fetchVehicles("admin", vehicleFilter);
          break;
        case "T":
          fetchVehicles("carrier", vehicleFilter);
          break;
        default:
          break;
      }
    } else {
      switch (view_type) {
        case "A":
          fetchVehicles("admin");
          break;
        case "T":
          fetchVehicles("carrier");
          break;
        default:
          break;
      }
    }
  }, [view_type, token, vehicleFilter]);

  return (
    <>
      <AppTabs />
      <Typography align="center" variant="h4" component="h2">
        {view_type === "A" ? "Vehículos" : "Sus Vehículos"}
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid
            item
            xs={FilterMenuContext.filterMenu ? 6 : 0}
            md={FilterMenuContext.filterMenu ? 4 : 0}
          >
            <LeftSideComponent vehiculos={true} />
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
                rowId="Vehiculo_Id"
                Columns={VehiculosColumns}
                Data={vehicles}
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

export default Vehiculos;
