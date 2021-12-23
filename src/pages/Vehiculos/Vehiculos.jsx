import { useState, useEffect, useContext } from "react";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";

/* API */
import { GetVehicles } from "../../api/Get";

/* Material UI */
import {
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
  Paper,
  IconButton,
} from "@mui/material";

/* Material UI Icons */
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ManageSearch from "@mui/icons-material/ManageSearch";
import CloseIcon from "@mui/icons-material/Close";

/* DataTable Columns */
import { VehiculosColumns } from "../../models/DataTableColums.tsx";

/* Components */
import Add from "./Add/Add";
import AppTabs from "../../components/AppTabs/AppTabs";
import Spinner from "../../components/Spinner/Spinner";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

import TestCardImage from "../../assets/images/test-card-image.jpg";

function Vehiculos({ admin }) {
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(false);
  const FilterMenuContext = useContext(filterMenuContext);
  const [view, setView] = useState("true");

  const handleChange = (e) => {
    if (e.currentTarget.value === "true") {
      setView(true);
    } else {
      setView(false);
    }
  };

  const fetchVehicles = async () => {
    await setLoading(true);
    const response = await GetVehicles();
    await setVehicles(response);
    await setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <>
      <AppTabs />
      <Typography align="center" variant="h4" component="h2">
        Sus Vehiculos
      </Typography>
      <div className="dashboard">
        <Grid container spacing={3}>
          <Grid
            itemxs={FilterMenuContext.filterMenu ? 6 : 0}
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
            ) : view ? (
              <RightSideComponent
                rowId="Vehiculo_Id"
                Columns={VehiculosColumns}
                Data={vehicles}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Add />
                  <ToggleButtonGroup
                    value={view}
                    color="secondary"
                    exclusive
                    onChange={handleChange}
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      alignItems: "center",
                      justifyContent: "flex-end",
                      margin: ".3rem",
                    }}
                  >
                    <ToggleButton value={true} aria-label="Table">
                      <ViewListIcon />
                    </ToggleButton>
                    <ToggleButton value={false} aria-label="Cards">
                      <ViewModuleIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </RightSideComponent>
            ) : (
              <>
                <Paper
                  variant="outlined"
                  sx={{
                    display: "flex",
                    marginBottom: ".3rem",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      FilterMenuContext.setFilterMenu(
                        !FilterMenuContext.filterMenu
                      )
                    }
                  >
                    {FilterMenuContext.filterMenu ? (
                      <CloseIcon color="primary" />
                    ) : (
                      <ManageSearch color="primary" />
                    )}
                  </IconButton>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Add />
                    <ToggleButtonGroup
                      value={view}
                      color="secondary"
                      exclusive
                      onChange={handleChange}
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        alignItems: "center",
                        justifyContent: "flex-end",
                        margin: ".3rem",
                      }}
                    >
                      <ToggleButton value={true} aria-label="Table">
                        <ViewListIcon />
                      </ToggleButton>
                      <ToggleButton value={false} aria-label="Cards">
                        <ViewModuleIcon />
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Paper>
                <Paper
                  variant="outlined"
                  sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: "repeat(4, 1fr)",
                    maxWidth: "fit-contend",
                    padding: ".5rem",
                  }}
                >
                  {vehicles.map(
                    ({ Vehiculo_Id, Vehiculo_Matricula, Vehiculo_Marca }) => {
                      return (
                        <Card key={Vehiculo_Id} variant="outlined">
                          <CardActionArea
                            sx={{ maxWidth: 345, flexDirection: "column" }}
                          >
                            <CardMedia
                              component="img"
                              height="140"
                              image={TestCardImage}
                              alt="test card image"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="span"
                                component="sup"
                              >
                                Id: <code>{Vehiculo_Id}</code>
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                Marca: <code>{Vehiculo_Marca}</code>
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Matricula: <code>{Vehiculo_Matricula}</code>
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      );
                    }
                  )}
                </Paper>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Vehiculos;
