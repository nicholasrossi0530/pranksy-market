import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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

function MarketCard(props: { address: string }) {

  const [data, setData] = useState<Asset[] | []>([]);
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://api.opensea.io/api/v1/assets', {
        params: {
          asset_contract_address: props.address,
          order_by: 'sale_date',
          limit: 1
        }
      }
      );
      console.log(result.data);
      if (result.status === 200) {
        setData(result.data.assets);
      } else {
        console.log(`ERROR: WTF ${result}`)
      }
    };

    fetchData();
  }, []);

  return (
    <Card className={classes.marketCard}>
      <CardActionArea>
        <img style={{ height: 450 }} src={data.length > 0 ? data[0].image_url : ''} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.length > 0 ? data[0].name.replace(/([#])\d+/g, '') : ''}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            Last sale: {data.length > 0
              ? `${parseInt(data[0].last_sale.total_price) / Math.pow(10, data[0].last_sale.payment_token.decimals)} ${data[0].last_sale.payment_token.symbol}`
              : ''
            }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.length > 0 ? data[0].description : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button href={data.length > 0 ? data[0].permalink : ''} target="_blank" size="small">Check Out</Button>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '50px'
  },
  marketCard: {
    maxWidth: '450px'
  }
}));

function App() {

  const classes = useStyles();
  const theme = useTheme();
  const JAN_BOX_ADDRESS = "0x5F8061F9d6A2Bb4688F46491cCA7658e214E2Cb6";
  const FEB_BOX_ADDRESS = "0x067ab2FbdBED63401aF802d1DD786E6D83b0ff1B";

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={3} className={classes.root}>
        <MarketCard
          address={JAN_BOX_ADDRESS}
        />
        <MarketCard
          address={FEB_BOX_ADDRESS}
        />
      </Grid>
    </Grid>
  );
}

export default App;
