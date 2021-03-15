import "./App.css";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, ThemeOptions } from "@material-ui/core/styles";
import MarketCard from "./components/MarketCard";
// import ComingSoonCard from "./components/ComingSoonCard";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import BoxDetail from "./components/BoxDetail";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { FEB_BOX_ADDRESS, JAN_BOX_ADDRESS } from "./utils/Utility";
import NavBar from "./components/NavBar";
import DevDetails from "./components/DevDetails";
import BottomNavBar from "./components/BottomNavBar";

const light: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#f2b400",
    },
  },
};

const dark: ThemeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#f2b400",
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    flexWrap: "wrap",
    padding: "0px 150px",
    marginBottom: "50px",
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
    textDecoration: "none",
  },
  devSignature: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: "50px",
    paddingLeft: "10px",
  },
  mainGrid: {
    justifyContent: "center",
  },
  appBarTitle: {
    marginRight: "2em",
  },
  lastNavButton: {
    marginLeft: "auto",
  },
  appButton: {
    [theme.breakpoints.down("sm")]: { display: "none" },
  },
}));

const client = new ApolloClient({
  uri: "https://api.opensea.io/graphql/",
  cache: new InMemoryCache(),
});

function App() {
  const [theme, setTheme] = useState(true);
  const classes = useStyles();
  const appliedTheme = createMuiTheme(theme ? dark : light);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Router>
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/nftbox/:box">
                <NavBar setTheme={setTheme} theme={theme} />
                <Grid className={classes.mainGrid} container spacing={1}>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={4}
                    className={classes.root}
                  >
                    <BoxDetail />
                  </Grid>
                </Grid>
                <BottomNavBar theme={appliedTheme} />
                <DevDetails />
              </Route>
              <Route path="/">
                <NavBar setTheme={setTheme} theme={theme} />
                <Grid className={classes.mainGrid} container spacing={1}>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={4}
                    className={classes.root}
                  >
                    <MarketCard
                      address={JAN_BOX_ADDRESS}
                      box={"genesis"}
                      orderBy={"sale_date"}
                      collection="nftbox"
                      name="Genesis Box"
                    />
                    <MarketCard
                      address={FEB_BOX_ADDRESS}
                      box={"grow"}
                      orderBy={"sale_date"}
                      collection="nftbox"
                      name="Grow Box"
                    />
                    <MarketCard
                      address={"0x5237E33D805339925aA5ab220F13B386357aa349"}
                      orderBy={"tokenId"}
                      tokenId={3}
                      collection="nftboxes"
                      name="March Ticket"
                    />
                    {/* <ComingSoonCard name={"March 2021 Box"} /> */}
                  </Grid>
                </Grid>
                <BottomNavBar theme={appliedTheme} />
                <DevDetails />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
