import { useState, useContext, useEffect, useCallback } from "react";

/* Context */
import { UserContext } from "../../context/UserContextT";
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
  const AppMenuContext = useContext(appMenuContext);
  const { token, view_type } = useContext(UserContext);

  const welcome = useCallback(() => {
    let auth = token;
    if (auth) {
      AppMenuContext.setAppMenu(true);
    }
  }, [token, AppMenuContext]);

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
      await users.push(user);
      await console.log(users);
      await setUsers(users);
    });
  };

  useEffect(() => {
    fetchUsers(["ilcreatore32", "DeltaFrost25"]);
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
            {token ? (
              <>
                <Typography variant="h6" color="primary" component="span" >
                  Bienvenido{" "}
                  {view_type === "C"
                    ? "Cliente"
                    : view_type === "T"
                    ? "Transportista"
                    : view_type === "A"
                    ? "Administrador"
                    : null}
                </Typography>
                {AppMenuContext.appMenu ? (
                  <Typography
                    variant="subtitle2"
                    component="p"
                    sx={{
                      display: "flex",
                      margin: "0",
                      marginTop: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    ¿A dónde te diriges?
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
                  Delivery PA
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="p"
                  sx={{ margin: "2rem 0" }}
                >
                  Un Sistema Web prototipo de Auto-gestión de envíos a nivel
                  nacional, usando el modelo de negocio Crowdshipping.
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
                  <Button disabled variant="text">
                    Ingrese o regístrese dando clic en los botones arriba a la
                    derecha
                  </Button>
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
          ¿Quiénes Somos?
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            padding: "1rem",
            margin: "1rem 0",
          }}
        >
          <Typography variant="body1" component="p">
            Delivery PA (Prototype App) es una plataforma web prototipo de un
            sistema de gestión de envíos a nivel nacional, para que los clientes
            puedan controlar la entrega de sus pedidos y a su vez, para que los
            transportistas puedan ofrecer sus servicios y encargarse de los
            envíos a los clientes.
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
            Les ofrecemos la oportunidad de que puedan ver todas las ofertas de
            servicios de transporte que hay para el envío de sus productos.
            Además tiene la posibilidad de escoger el servicio que mejor se
            adecue a sus necesidades y llevar un control del estado de la
            entrega de dichos productos.
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
            Pueden utilizar nuestra plataforma para darse a conocer y tener una
            fuente constante de nuevos clientes, además de poder ofrecer sus
            servicios de transporte. Una vez hayan verificado su cuenta y se
            hayan suscrito a uno de nuestros planes, podrán ofertar sus
            servicios de transporte dentro de cualquiera de las solcitudes de
            envío de los clientes.
          </Typography>
        </Paper>
      </Box>
      {/* <Paper
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
                key={user?.id}
                sx={{
                  display: "flex",
                  padding: "1rem",
                }}
              >
                <Avatar
                  alt={user?.login}
                  src={user?.avatar_url}
                  sx={{ width: "100px", height: "100px" }}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {user?.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    component="span"
                  >
                    @{user?.login}, {user?.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    component="p"
                  >
                    {user?.bio}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component="a"
                    href={user?.html_url}
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
      </Paper> */}
    </>
  );
}

export default Home;
