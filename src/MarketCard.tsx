import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PriceHistory from "./PriceHistory";
import { ApolloClient, DocumentNode, NormalizedCacheObject } from "@apollo/client";
import { IAsset } from "./interfaces/Interfaces";
import { coinSymbolConverter } from "./utils/Utility";

const useStyles = makeStyles(() => ({
  marketCard: {
    maxWidth: "450px",
    margin: "1em 0",
    maxHeight: "950px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }
}));

function MarketCard(props: { address: string, query: DocumentNode, client: ApolloClient<NormalizedCacheObject> }) {
  const [assetData, setAssetData] = useState<IAsset[] | []>([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://api.opensea.io/api/v1/assets", {
        params: {
          asset_contract_address: props.address,
          order_by: "sale_date",
          limit: 1,
        },
      });
      if (result.status === 200) {
        setAssetData(result.data.assets);
      } else {
        console.log(`ERROR: WTF ${result}`);
      }
    };

    fetchData();
  }, [props.address]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.marketCard}>
      <img
        alt="NFT Box"
        style={{ height: 450 }}
        src={assetData.length > 0 ? assetData[0].image_url : ""}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {assetData.length > 0
            ? assetData[0].name.replace(/([#])\d+/g, "")
            : ""}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          Last sale:{" "}
          {assetData.length > 0
            ? `${Number(parseInt(assetData[0].last_sale.total_price) /
            Math.pow(10, assetData[0].last_sale.payment_token.decimals)).toFixed(4)
            } ${coinSymbolConverter(assetData[0].last_sale.payment_token.symbol)}`
            : ""}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {assetData.length > 0 ? assetData[0].description : ""}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          href={assetData.length > 0 ? assetData[0].permalink : ""}
          target="_blank"
          size="small"
        >
          Check Out
      </Button>
        <Button onClick={handleOpen} size="small">
          Price History
        </Button>
        {open && 
          <PriceHistory
            query={props.query}
            client={props.client}
            handleClose={handleClose}
            open={open}
          />
        }
      </CardActions>
    </Card>
  );
}

export default MarketCard;
