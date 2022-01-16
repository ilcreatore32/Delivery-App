import { useState, useEffect, useContext } from "react";

/* Context */
import { filterMenuContext } from "../../../context/filterMenuContext";

/* API */
import { GetShippments } from "../../../api/Get";

/* Material UI */
import { Typography, Paper, Grid } from "@mui/material";

/* DataTable Columns */
import { EnviosColumns } from "../../../models/DataTableColums.jsx";

/* Components */
import Add from "../Add/Add";
import Spinner from "../../../components/Spinner/Spinner";
import AppTabs from "../../../components/AppTabs/AppTabs";
import RightSideComponent from "../../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../../components/LeftSideComponent/LeftSideComponent";
/* Context */
import { FilterContext } from "../../../context/FilterContext";
import { UserContext } from "../../../context/UserContextT";

function EnviosTransportista(permissions) {
  const { view_type, token } = useContext(UserContext);
  const { shippmentFilter, setShippmentFilter } = useContext(FilterContext);
  const [shippments, setShippments] = useState(null);
  const [loading, setLoading] = useState(false);
  const FilterMenuContext = useContext(filterMenuContext);

  const fetchShippments = async (view, params) => {
    if (view ==="T" || view ==="C" || view ==="A") return
    await setLoading(true);
    const response = await GetShippments(view, params); 
    await setShippments(response);
    await setLoading(false);
  };

  useEffect(() => {
    if (!view_type || !token) return;
    setShippments([])
    switch (view_type) {
      case "A":
        fetchShippments("admin", shippmentFilter);
        break;
      case "T":
        fetchShippments("carrier_available", shippmentFilter);
        break;
      case "C":
        fetchShippments("client", shippmentFilter);
        break;
      default:
        break;
    }
  }, [view_type, token]);

  useEffect(() => {
    if (!shippmentFilter || !view_type) return
    fetchShippments(view_type,shippmentFilter);
  }, [shippmentFilter]);

  return (
    <>
      <AppTabs />
      <Typography align="center" variant="h4" component="h2">
        Descubrir Envíos
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid
            item
            xs={FilterMenuContext.filterMenu ? 6 : 0}
            md={FilterMenuContext.filterMenu ? 4 : 0}
          >
            <LeftSideComponent envios={true} />
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
                rowId="SE_Id"
                Columns={EnviosColumns}
                Data={shippments}
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

export default EnviosTransportista;
