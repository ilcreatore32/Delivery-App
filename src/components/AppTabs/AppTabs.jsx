import React from "react";

/* React-Router */
import { Link, useRouteMatch } from "react-router-dom";

/* Material UI */
import { AppBar, Box, Toolbar, Tabs, Tab } from "@mui/material";

/* Material UI Icons */
import ExploreTwoToneIcon from "@mui/icons-material/ExploreTwoTone";
import AddTaskIcon from "@mui/icons-material/AddTask";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import CommuteIcon from "@mui/icons-material/Commute";
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';

function AppTabs() {
  const routeMatch = useRouteMatch([
    `/Envios`,
    `/Servicios`,
    `/Asumidos`,
    `/Vehiculos`,
    `/Pagos`,
    `/Usuarios`,
  ]);
  const currentTab = routeMatch?.path;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="delivery-secundary-bar" position="static">
          <Toolbar
            sx={{
              color: "#614fb4",
            }}
          >
            {/* 
              error: first-child instead of: first-of-type
              follow this path to change property
              node_modules\@mui\material\Tab\Tab.js 
            */}
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
              <Tab
                label="Pagos"
                value={`/Pagos`}
                to={`/Pagos`}
                icon={<PaymentsTwoToneIcon />}
                component={Link}
              />
              <Tab
                label="Usuarios"
                value={`/Usuarios`}
                to={`/Usuarios`}
                icon={<GroupTwoToneIcon />}
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
