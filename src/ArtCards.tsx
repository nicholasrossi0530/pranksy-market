import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PriceHistory from "./PriceHistory";

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

function ArtCards(props: { address: string }) {
  const [data, setData] = useState<Asset[] | []>([]);
  const classes = useStyles();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://api.opensea.io/api/v1/assets", {
        params: {
          asset_contract_address: props.address,
          order_by: "sale_date",
          limit: 50,
        },
      });
      console.log(result.data);
      if (result.status === 200) {
        setData(result.data.assets);
      } else {
        console.log(`ERROR: WTF ${result}`);
      }
    };

    fetchData();
  }, [props.address]);

  return (
    <>
      {data.map((item: Asset) => {
        return (
          <Card className={classes.marketCard}>
            <CardMedia
                component={item && item.image_url.includes('.mp4')? "video" : "img"}
                alt="NFTBox"
                height="450px"
                title="NFTBox"
                src={item ? item.image_url : ""}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item ? item.name.replace(/([#])\d+/g, "") : ""}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Last sale:{" "}
                {item
                  ? `${
                      parseInt(item.last_sale.total_price) /
                      Math.pow(10, item.last_sale.payment_token.decimals)
                    } ${item.last_sale.payment_token.symbol}`
                  : ""}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item ? item.description : ""}
              </Typography>
            </CardContent>
            <CardActions className={classes.buttonContainer}>
              <Button
                href={item ? item.permalink : ""}
                target="_blank"
                size="small"
              >
                Check Out
              </Button>
              <PriceHistory />
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}

const useStyles = makeStyles(() => ({
  marketCard: {
    maxWidth: '450px',
    margin: '1em 0',
    maxHeight: '950px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  buttonContainer: {},
  image: {
      height: '450px'
  }
}));

export default ArtCards;
