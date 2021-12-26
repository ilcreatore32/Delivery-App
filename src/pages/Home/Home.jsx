import { useState, useContext, useEffect, useCallback } from "react";

/* Context */
import { authContext } from "../../context/authContext";
import { appMenuContext } from "../../context/appMenuContext";

/* Material UI */
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  Avatar,
  CardContent,
  CardActions,
} from "@mui/material";

/* Material UI Icons */
import GitHub from "@mui/icons-material/GitHub";

/* Components */
import AppTabs from "../../components/AppTabs/AppTabs";

/* CSS */
import "./Home.css";

function Home() {
  const AuthContext = useContext(authContext);
  const AppMenuContext = useContext(appMenuContext);

  const welcome = useCallback(() => {
    let auth = AuthContext.auth;
    if (auth) {
      AppMenuContext.setAppMenu(true);
    }
  }, [AuthContext, AppMenuContext]);

  useEffect(() => {
    welcome();
  }, [welcome]);

  const [users, setUsers] = useState([]);

  let fetchUsers = async (nicknames) => {
    await nicknames.map(async (nickname) => {
      let user = await fetch(`https://api.github.com/users/${nickname}`)
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.log(error);
        });
      await setUsers([user]);
      await console.log(user);
    });
  };

  useEffect(() => {
    fetchUsers(["ilcreatore32"]);
  }, []);

  return (
    <>
      <Box className="full-screen">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            flexWrap: "wrap",
            overflowWrap: "anywhere",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
            }}
          >
            {AuthContext.auth ? (
              <>
                <Typography variant="h6" color="primary" component="span">
                  Bienvenido
                </Typography>
                {AppMenuContext.appMenu ? (
                  <Typography
                    variant="subtitle2"
                    component="p"
                    sx={{
                      display: "flex",
                      margin: "0",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    A donde te diriges?
                  </Typography>
                ) : null}
                <AppTabs />
              </>
            ) : (
              <>
                <Typography variant="h6" color="primary" component="span">
                  Bienvenido a
                </Typography>
                <Typography variant="h2" component="h1">
                  Delivery App
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="p"
                  sx={{ margin: "2rem 0" }}
                >
                  Un Sistema Web de Auto-gestión de envíos a nivel nacional,
                  usando el modelo de negocio Crowdshipping.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    margin: "2rem 0",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Button variant="outlined">Comenzar</Button>
                </Box>
              </>
            )}
          </Paper>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
          padding: ".3rem",
        }}
      >
        <Typography variant="h4" color="primary" component="h2">
          Quienes Somos?
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            padding: "1rem",
            margin: "1rem 0",
          }}
        >
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae explicabo dolores quisquam ipsum eos sapiente
            repellendus? Voluptate velit dignissimos quia sequi, in quisquam
            provident reiciendis nemo temporibus qui nostrum sunt?
          </Typography>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "1rem",
          padding: ".3rem",
          gap: "1rem",
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            padding: "1rem",
            margin: "1rem 0",
          }}
        >
          <Typography variant="h4" color="primary" component="h3">
            Clientes
          </Typography>
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae explicabo dolores quisquam ipsum eos sapiente
            repellendus? Voluptate velit dignissimos quia sequi, in quisquam
            provident reiciendis nemo temporibus qui nostrum sunt?
          </Typography>
        </Paper>
        <Paper
          variant="outlined"
          sx={{
            padding: "1rem",
            margin: "1rem 0",
          }}
        >
          <Typography variant="h4" color="primary" component="h4">
            Transportistas
          </Typography>
          <Typography variant="body1" component="p">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repudiandae explicabo dolores quisquam ipsum eos sapiente
            repellendus? Voluptate velit dignissimos quia sequi, in quisquam
            provident reiciendis nemo temporibus qui nostrum sunt?
          </Typography>
        </Paper>
      </Box>
      <Paper
        variant="outlined"
        sx={{
          margin: "2rem",
          padding: ".6rem",
        }}
      >
        <Typography variant="h4" color="primary" component="h5">
          Nuestro Equipo
        </Typography>
        <Box
          sx={{
            display: "flex",
            padding: ".5rem",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {users.map((user) => {
            return (
              <Card
                elevation={3}
                key={user.id}
                sx={{
                  display: "flex",
                  padding: "1rem",
                }}
              >
                <Avatar
                  alt={user.login}
                  src={user.avatar_url}
                  sx={{ width: "100px", height: "100px" }}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {user.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    component="span"
                  >
                    @{user.login}, {user.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    component="p"
                  >
                    {user.bio}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component="a"
                    href={user.html_url}
                    size="small"
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <GitHub color="primary" />
                    Github
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Paper>
    </>
  );
}

export default Home;
