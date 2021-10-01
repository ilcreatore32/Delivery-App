import React from "react";

import { Link, useRouteMatch } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ExploreTwoToneIcon from "@mui/icons-material/ExploreTwoTone";
import AddTaskIcon from "@mui/icons-material/AddTask";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import CommuteIcon from "@mui/icons-material/Commute";

function AppTabs() {
  const routeMatch = useRouteMatch([
    `/Envios`,
    `/Servicios`,
    `/Asumidos`,
    `/Vehiculos`,
  ]);
  const currentTab = routeMatch?.path;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="delivery-secundary-bar" position="static">
          <Toolbar sx={{color:"#614fb4"}}>
            <Tabs
              value={currentTab}
              centered
              textColor="primary"
              indicatorColor="secondary"
            >
              <Tab
                label="Envios"
                value={`/Envios`}
                to={`/Envios`}
                icon={<ExploreTwoToneIcon />}
                component={Link}
              />
              <Tab
                label="Asumidos"
                value={`/Asumidos`}
                to={`/Asumidos`}
                icon={<AddTaskIcon />}
                component={Link}
              />
              <Tab
                label="Servicios"
                value={`/Servicios`}
                to={`/Servicios`}
                icon={<WorkTwoToneIcon />}
                component={Link}
              />
              <Tab
                label="Vehiculos"
                value={`/Vehiculos`}
                to={`/Vehiculos`}
                icon={<CommuteIcon />}
                component={Link}
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default AppTabs;
