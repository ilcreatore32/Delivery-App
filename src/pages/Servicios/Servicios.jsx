import { useState, useEffect, useContext } from "react";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";

/* Material UI */
import { Typography, Grid, Paper } from "@mui/material";

/* Api */
import { GetServices } from "../../api/Get";

/* DataTable Columns */
import { ServiciosColumns } from "../../models/DataTableColums.jsx";

/* Components */
import Add from "./Add/Add";
import AppTabs from "../../components/AppTabs/AppTabs";
import Spinner from "../../components/Spinner/Spinner";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Servicios({ admin }) {
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(false);
  const FilterMenuContext = useContext(filterMenuContext);

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
              </RightSideComponent>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Servicios;
