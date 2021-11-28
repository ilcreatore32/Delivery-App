import React from "react";
import { useState, useEffect } from "react";

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
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

/* DataTable Columns */
import { VehiculosColumns } from "../../models/DataTableColums.tsx";

/* Components */
import AppTabs from "../../components/AppTabs/AppTabs";
import Spinner from "../../components/Spinner/Spinner";
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

import TestCardImage from "../../assets/images/test-card-image.jpg";

function Vehiculos({ admin }) {
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(false);

  let [view, setView] = useState("true");

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
          <Grid item xs={6} md={4}>
            <LeftSideComponent vehiculos={true} />
          </Grid>
          <Grid item xs={6} md={8}>
            <Paper variant="outlined" sx={{ margin: ".3rem auto" }}>
              {admin ? (
                <>
                  <IconButton>
                    <AddCircleTwoToneIcon size="large" />
                  </IconButton>
                </>
              ) : null}
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
            ) : view ? (
              <RightSideComponent
                rowId="Vehiculo_Id"
                Columns={VehiculosColumns}
                Data={vehicles}
              />
            ) : (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: "repeat(4, 1fr)",
                    maxWidth: "fit-contend",
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
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Vehiculos;
