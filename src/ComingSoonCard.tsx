import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

function ComingSoonCard() {
  const classes = useStyles();
  const IMAGE_URL =
    "https://media.giphy.com/media/xTiN0IuPQxRqzxodZm/giphy.gif";

  return (
    <Card className={classes.comingSoonCard}>
      <Container className={classes.imageContainer}>
        <img alt="NFT Box" style={{ height: 450 }} src={IMAGE_URL} />
      </Container>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          March Box
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          Last sale: N/A
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Stay tuned for next month's box!
        </Typography>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles(() => ({
  comingSoonCard: {
    maxWidth: "450px",
    margin: "1em 0",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default ComingSoonCard;
