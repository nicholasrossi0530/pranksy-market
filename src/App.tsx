import "./App.css";
import React, { useState } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles, ThemeOptions } from "@material-ui/core/styles";
import JanuaryCard from "./JanuaryCard";
import FebruaryCard from "./FebruaryCard";
import ComingSoonCard from "./ComingSoonCard";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import ArtCard from "./ArtCard";
import { IAsset } from "./interfaces/Interfaces";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";

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
  const ART_ADDRESS = "0x6d4530149e5B4483d2F7E60449C02570531A0751";
  const appliedTheme = createMuiTheme(theme ? dark : light);
  const [assetData, setAssetData] = useState<IAsset[] | []>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page: number) => {
    const result = await axios("https://api.opensea.io/api/v1/assets", {
      params: {
        asset_contract_address: ART_ADDRESS,
        order_by: "sale_date",
        limit: 50,
        offset: page * 50,
      },
    });
    if (result.status === 200) {
      if (result.data.assets.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        if (assetData.length === 0) {
          setAssetData(result.data.assets);
        } else {
          setAssetData(assetData.concat(result.data.assets));
        }
      }
    } else {
      console.log(`ERROR: WTF ${result}`);
    }
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchData}
      hasMore={hasMore}
      initialLoad={true}
      threshold={1000}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
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
            <JanuaryCard />
            <FebruaryCard />
            <ComingSoonCard />
            {assetData.map((item: IAsset) => {
              return <ArtCard address={ART_ADDRESS} item={item} />;
            })}
          </Grid>
        </Grid>
      </ThemeProvider>
    </InfiniteScroll>
  );
}

export default App;
