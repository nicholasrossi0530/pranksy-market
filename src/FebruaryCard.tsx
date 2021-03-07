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
import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";
import { ITransaction, IFormattedTransaction } from "./interfaces/Interfaces";

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
  },
}));

const getXDaysAgo = () => {
  const today = new Date();
  today.setDate(today.getDate() - 5);
  return Date.parse(today.toString()) / 1000;
};

const EXCHANGE_RATES = gql`
  {
    transactions(
      orderBy: "timestamp"
      orderDirection: "asc"
      where: { value_gt: 0, timestamp_gt: ${getXDaysAgo()} }
    ) {
      id
      hash
      index
      from
      to
      value
      gasUsed
      gasPrice
      timestamp
      tokenId
    }
  }
`;

const client = new ApolloClient({
  uri:
    "https://api.thegraph.com/subgraphs/name/nicholasrossi0530/nft-feb-box-graph",
  cache: new InMemoryCache(),
});

const formatData = (transacations: ITransaction[]) => {
  return transacations.map((transaction: ITransaction) => {
    const date = new Date(parseInt(transaction.timestamp) * 1000);
    const value = parseInt(transaction.value) / Math.pow(10, 18);
    return {
      ...transaction,
      formattedTimestamp: date.toString(),
      formattedValue: value.toString()
    };
  });
};

function FebruaryCard(props: { address: string }) {
  const [assetData, setAssetData] = useState<Asset[] | []>([]);
  const classes = useStyles();
  const { loading, error, data } = useQuery(EXCHANGE_RATES, {
    client,
  });

  const [formattedData, setFormattedData] = useState<IFormattedTransaction[]>();

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setFormattedData(formatData(data.transactions));
    }
  }, [data]);

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
            ? `${
                parseInt(assetData[0].last_sale.total_price) /
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
          transactions={data ? formattedData : undefined}
          loading={loading}
          error={error}
        />
      </CardActions>
    </Card>
  );
}

export default FebruaryCard;
