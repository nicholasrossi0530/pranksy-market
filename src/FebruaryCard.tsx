import React from "react";
import "./App.css";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import MarketCard from "./MarketCard";

const getXDaysAgo = () => {
  const today = new Date();
  today.setDate(today.getDate() - 7);
  return Date.parse(today.toString()) / 1000;
};

const QUERY = () => {
  return gql`
{
  transactions(
    orderBy: "timestamp"
    orderDirection: "asc"
    where: {
      value_gt: 0,
      timestamp_gt: ${getXDaysAgo()},
    }
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
`};

const client = new ApolloClient({
  uri:
    "https://api.thegraph.com/subgraphs/name/nicholasrossi0530/nft-feb-box-graph",
  cache: new InMemoryCache(),
});

function FebruaryCard() {
  const FEB_BOX_ADDRESS = "0x067ab2FbdBED63401aF802d1DD786E6D83b0ff1B";

  return (
    <MarketCard
      address={FEB_BOX_ADDRESS}
      query={QUERY()}
      client={client}
    />
  );
}

export default FebruaryCard;
