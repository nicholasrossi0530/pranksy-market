import "./App.css";
import React, { useState } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles, ThemeOptions } from "@material-ui/core/styles";
import MarketCard from "./MarketCard";
import JanuaryCard from "./JanuaryCard";
import FebruaryCard from "./FebruaryCard";
import ComingSoonCard from "./ComingSoonCard";
import ArtCards from "./ArtCards";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";

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
  },
}));

function App() {
  const [theme, setTheme] = useState(true);
  const icon = theme ? <Brightness7Icon /> : <Brightness3Icon />;
  const classes = useStyles();
  const JAN_BOX_ADDRESS = "0x5F8061F9d6A2Bb4688F46491cCA7658e214E2Cb6";
  const FEB_BOX_ADDRESS = "0x067ab2FbdBED63401aF802d1DD786E6D83b0ff1B";
  const ART_ADDRESS = "0x6d4530149e5B4483d2F7E60449C02570531A0751";
  const appliedTheme = createMuiTheme(theme ? dark : light);
  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Grid container spacing={1}>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="mode"
          onClick={() => setTheme(!theme)}
        >
          {icon}
        </IconButton>
        <Grid container item xs={12} spacing={4} className={classes.root}>
          <JanuaryCard address={JAN_BOX_ADDRESS} />
          <FebruaryCard address={FEB_BOX_ADDRESS} />
          {/* <MarketCard
            address={JAN_BOX_ADDRESS}
          />
          <MarketCard
            address={FEB_BOX_ADDRESS}
          />
          <ComingSoonCard />
          <ArtCards 
            address={ART_ADDRESS}
          /> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
