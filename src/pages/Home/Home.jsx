import { useContext, useEffect, useCallback } from "react";

/* Context */
import { authContext } from "../../context/authContext";
import { appMenuContext } from "../../context/appMenuContext";

/* Material UI */
import { Box, Typography, Button, Paper } from "@mui/material";

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

  /* const [users, setUsers] = React.useState([]);

  let fetchUsers = async (nicknames) => {
   await nicknames.map(async (nickname) => {
      let user = await fetch(`https://api.github.com/users/${nickname}`)
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.log(error);
        });
      await setUsers([...users, user]);
      await console.log(users)
    });
  };

  useEffect(() => {
    fetchUsers(["ilcreatore32", "DeltaFrost25"]);
  }, []); */

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
                  Bienvenido.
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
                  Bienvenido
                </Typography>
                <Typography variant="h2" component="h1">
                  Delivery App
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{ margin: "2rem 0" }}
                >
                  Sistema Web de Auto-gestión de envíos a nivel nacional, usando
                  el modelo de negocio Crowdshipping.
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
      <Box container>
        <Typography variant="h4" color="primary" component="h2">
          Quienes Somos?
        </Typography>
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          margin: "2rem 0",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {users.map((user) => {
          return (
            <Card elevation={3} key={user.id}>
              <Avatar alt={user.login} src={user.avatar_url} />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary" gutterBottom component="p">
                  {user.bio}
                </Typography>
              </CardContent>
              <CardActions>
                <Button component="a" href={user.html_url} size="small">
                  Github
                </Button>
              </CardActions>
            </Card>
          );
        })} 
      </Box>*/}
    </>
  );
}

export default Home;
