import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PriceHistory from "./PriceHistory";

interface Asset {
  id: number;
  permalink: string;
  name: string;
  description: string;
  image_url: string;
  last_sale: LastSale;
  creator: CreatorInfo;
}

interface CreatorInfo {
  profile_img_url: string;
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
        const descriptions = item.description.match(/[^\r\n]+/g)!;
        const artist = descriptions[1];
        const message = descriptions[4];
        const artistNote = descriptions[5];
        return (
          <Card className={classes.marketCard} key={item.id}>
            <CardMedia
                component={item && item.image_url.includes('.mp4')? "video" : "img"}
                alt="NFTBox"
                height="450px"
                title="NFTBox"
                src={item ? item.image_url : ""}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item ? item.name : ""}
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary={artist} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={message}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.multiLineEllipsis}
                    primary={artistNote}
                  />
                </ListItem>
              </List>
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
            </CardContent>
            <CardActions className={classes.buttonContainer}>
              <Button
                href={item ? item.permalink : ""}
                target="_blank"
                size="small"
              >
                Check Out
              </Button>
              {/* <PriceHistory /> */}
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
  },
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 4,
    "-webkit-box-orient": "vertical"
  }
}));

export default ArtCards;
