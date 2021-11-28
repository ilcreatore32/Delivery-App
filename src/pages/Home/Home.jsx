import React from "react";

/* Material UI */
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";

/* CSS */
import "./Home.css";

function Home() {
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
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
            }}
          >
            <Typography variant="h6" component="span">
              Welcome to
            </Typography>
            <Typography variant="h2" component="h1">
              Delivery App
            </Typography>
            <Typography variant="body2" component="p" sx={{ margin: "2rem 0" }}>
              Sistema Web de Auto-gestión de envíos a nivel nacional, usando el
              modelo de negocio Crowdshipping.
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
              <Button variant="outlined">Get Started</Button>
              <Button variant="outlined">Sign in</Button>
            </Box>
          </Paper>
        </Box>
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
