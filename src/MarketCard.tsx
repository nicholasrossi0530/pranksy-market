import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  }, [props.address]);

  return (
    <Card className={classes.marketCard}>
      <img alt="NFT Box" style={{ height: 450 }} src={data.length > 0 ? data[0].image_url : ''} />
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
      <CardActions className={classes.buttonContainer}>
        <Button href={data.length > 0 ? data[0].permalink : ''} target="_blank" size="small">Check Out</Button>
      </CardActions>
    </Card>
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
  buttonContainer: {

  }
}));

export default MarketCard;
