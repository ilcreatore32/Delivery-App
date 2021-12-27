import { useState, useEffect, useContext } from "react";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";

/* Api */
import { GetShippments } from "../../api/Get";

/* Material UI */
import { Typography, Grid, Paper } from "@mui/material";

/* DataTable Columns */
import { EnviosColumns } from "../../models/DataTableColums.tsx";

/* Components */
import AppTabs from "../../components/AppTabs/AppTabs";
import Spinner from "../../components/Spinner/Spinner";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

function Asumidos() {
  const [shippments, setShippments] = useState(null);
  const [loading, setLoading] = useState(false);
  const FilterMenuContext = useContext(filterMenuContext);

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
        Envíos Asumidos
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid
            item
            xs={FilterMenuContext.filterMenu ? 6 : 0}
            md={FilterMenuContext.filterMenu ? 4 : 0}
          >
            <LeftSideComponent envios={true} asumidos={true} />
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
              />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Asumidos;
