import React from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MarketCard from "./MarketCard";
import ComingSoonCard from "./ComingSoonCard";
import ArtCards from "./ArtCards";
import { useQuery, gql } from "@apollo/client";

const EXCHANGE_RATES = gql`
{
  transactions(orderBy: "timestamp", orderDirection: "desc", where: {value_gt: 0}) {
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "50px",
    flexWrap: "wrap",
    padding: "0px 150px",
  },
}));

interface ITransaction {
  from: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  id: string;
  index: string;
  timestamp: string;
  to: string;
  tokenId: string;
  value: string;
}

function App() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  const classes = useStyles();
  const JAN_BOX_ADDRESS = "0x5F8061F9d6A2Bb4688F46491cCA7658e214E2Cb6";
  const FEB_BOX_ADDRESS = "0x067ab2FbdBED63401aF802d1DD786E6D83b0ff1B";
  const ART_ADDRESS = "0x6d4530149e5B4483d2F7E60449C02570531A0751";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {JSON.stringify(error)}</p>;

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={4} className={classes.root}>
        {data.transactions.length}
        {data.transactions.map((transaction: ITransaction) => {
        const transactionDate = new Date(parseInt(transaction.timestamp)*1000);
        return (
          <div>
            <p>{parseInt(transaction.value)/Math.pow(10,18)} Eth</p>
            <p>Token {transaction.tokenId}</p>
            <p>{transactionDate.toString()}</p>
            <br />
            <br />
            <br />
          </div>
        )})}
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
  );
}

export default App;
