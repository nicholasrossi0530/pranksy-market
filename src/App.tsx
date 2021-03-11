import "./App.css";
import React, { useState } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles, ThemeOptions } from "@material-ui/core/styles";
import MarketCard from "./components/MarketCard";
import ComingSoonCard from "./components/ComingSoonCard";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import BoxDetail from "./components/BoxDetail";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { FEB_BOX_ADDRESS, JAN_BOX_ADDRESS } from "./utils/Utility";

const light: ThemeOptions = {
  palette: {
    type: "light",
  },
};

const dark: ThemeOptions = {
  palette: {
    type: "dark",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "50px",
    flexWrap: "wrap",
    padding: "0px 150px",
    marginBottom: "50px"
  },
}));

const client = new ApolloClient({
  uri: "https://api.opensea.io/graphql/",
  cache: new InMemoryCache(),
});

function App() {
  const [theme, setTheme] = useState(true);
  const icon = theme ? <Brightness7Icon /> : <Brightness3Icon />;
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
            <Grid container spacing={1}>
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="mode"
                    onClick={() => setTheme(!theme)}
                  >
                    {icon}
                  </IconButton>
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
            </Route>
            <Route path="/">
                <Grid container spacing={1}>
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="mode"
                    onClick={() => setTheme(!theme)}
                  >
                    {icon}
                  </IconButton>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={4}
                    className={classes.root}
                  >
                    <MarketCard address={JAN_BOX_ADDRESS} box={"genesis"} orderBy={"sale_date"} />
                    <MarketCard address={FEB_BOX_ADDRESS} box={"grow"} orderBy={"sale_date"} />
                    <MarketCard address={"0x5237E33D805339925aA5ab220F13B386357aa349"} orderBy={"tokenId"} tokenId={3} />
                    <ComingSoonCard name={"March 2021 Box"} />
                  </Grid>
                </Grid>
            </Route>
          </Switch>
        </div>
      </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
