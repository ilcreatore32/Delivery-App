import React from "react";
import { useState } from "react";

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
import RightSideComponent from "../../components/RightSideComponent/RightSideComponent";
import LeftSideComponent from "../../components/LeftSideComponent/LeftSideComponent";

import TestCardImage from "../../assets/images/test-card-image.jpg";

function Vehiculos({ admin }) {
  let [view, setView] = useState("true");

  const handleChange = (e) => {
    if (e.currentTarget.value === "true") {
      setView(true);
    } else {
      setView(false);
    }
  };

  const Data = [
    {
      id: 1,
      Marca: "Ford",
      Modelo: "Cruze",
      Año: 2019,
      Pasajeros: 4,
      Areas: "Caracas",
      CapacidadCarga: "120",
      Matricula: "AOP4C5AS",
    },
    {
      id: 2,
      Marca: "Jeep",
      Modelo: "Grand Cheeroke",
      Año: 2009,
      Pasajeros: 6,
      Areas: "Valencia",
      CapacidadCarga: "200",
      Matricula: "WP012AVC",
    },
    {
      id: 3,
      Marca: "Chevrolet",
      Modelo: "Highlander",
      Año: 2021,
      Pasajeros: 5,
      Areas: "Falcon",
      CapacidadCarga: "200",
      Matricula: "WWER441G",
    },
  ];

  return (
    <>
      <AppTabs />
      <Typography className="text-center mt-3 mb-3" variant="h4" component="h2">
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
                    <AddCircleTwoToneIcon size="large"/>
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
            {view ? (
              <RightSideComponent Columns={VehiculosColumns} Data={Data} />
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
                  {Data.map(({ id, Modelo, Matricula }) => {
                    return(
                    <Card variant="outlined">
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
                            Id: <code>{id}</code>
                          </Typography>
                          <Typography gutterBottom variant="h5" component="div">
                            Modelo: <code>{Modelo}</code>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Matricula: <code>{Matricula}</code>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  )})}
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
