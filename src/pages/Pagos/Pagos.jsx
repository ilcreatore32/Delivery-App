import { useState, useEffect, useContext } from "react";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";

/* API */
import { GetPayments } from "../../api/Get";

/* Material UI */
import { Typography, Grid, Paper } from "@mui/material";

/* DataTable Columns */
import { PagosColumns } from "../../models/DataTableColums.jsx";

/* Components */
import Add from "./Add/Add";
import Spinner from "../../components/Spinner/Spinner";
import AppTabs from "../../components/AppTabs/AppTabs";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";
import { FilterContext } from "../../context/FilterContext";
import { UserContext } from "../../context/UserContextT";
import Delete from "./Delete/Delete";

function Pagos() {
  const { view_type, token } = useContext(UserContext);
  const { paymentFilter, setPaymentFilter } = useContext(FilterContext);
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(false);
  const FilterMenuContext = useContext(filterMenuContext);

  const fetchPayments = async (view, params) => {
    if (view ==="T" || view ==="C" || view ==="A") return
    await setLoading(true);
    const response = await GetPayments(view, params); 
    await setPayments(response);
    await setLoading(false);
  };

  useEffect(() => {
    if (!view_type || !token ) return;
    if (view_type !== "A") return;
    setPayments([]);
    fetchPayments("admin", paymentFilter);
  }, [view_type, token, paymentFilter]);

  return (
    <>
      <AppTabs />
      <Typography align="center" variant="h4" component="h2">
        Pagos
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid
            item
            xs={FilterMenuContext.filterMenu ? 6 : 0}
            md={FilterMenuContext.filterMenu ? 4 : 0}
          >
            <LeftSideComponent pagos={true} />
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
                rowId="PS_Id"
                Columns={PagosColumns}
                Data={payments}
              >
                <Add AddButton={true}/>
                <Delete />
              </RightSideComponent>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Pagos;
