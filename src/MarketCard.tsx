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
import { ApolloError } from "@apollo/client";
import { IFormattedTransaction } from "./interfaces/Interfaces";

interface Asset {
  permalink: string;
  name: string;
  description: string;
  image_url: string;
  last_sale: LastSale;
}

interface LastSale {
  payment_token: PaymentToken;
  total_price: string;
}

interface PaymentToken {
  symbol: string;
  eth_price: string;
  decimals: number;
}

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

function MarketCard(props: { address: string, loading: boolean, error: ApolloError | undefined, transactions: IFormattedTransaction[] | undefined }) {
  const [assetData, setAssetData] = useState<Asset[] | []>([]);
  const classes = useStyles();

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
            ? `${parseInt(assetData[0].last_sale.total_price) /
            Math.pow(10, assetData[0].last_sale.payment_token.decimals)
            } ${assetData[0].last_sale.payment_token.symbol}`
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
        <PriceHistory
          transactions={props.transactions}
          loading={props.loading}
          error={props.error}
        />
      </CardActions>
    </Card>
  );
}

export default MarketCard;
