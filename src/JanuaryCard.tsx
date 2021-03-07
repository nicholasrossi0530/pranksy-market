import React, { useEffect, useState } from "react";
import "./App.css";
import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";
import { IFormattedTransaction, ITransaction } from "./interfaces/Interfaces";
import MarketCard from "./MarketCard";

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
    "https://api.thegraph.com/subgraphs/name/nicholasrossi0530/nft-box-graph",
  cache: new InMemoryCache(),
});

const formatData = (transacations: ITransaction[]) => {
  return transacations.map((transaction: ITransaction) => {
    const date = new Date(parseInt(transaction.timestamp) * 1000);
    const value = parseInt(transaction.value) / Math.pow(10, 18);
    return {
      ...transaction,
      formattedTimestamp: date.toLocaleDateString(),
      formattedValue: value.toString(),
      day: parseInt(`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`)
    };
  });
};

function JanuaryCard() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES, {
    client,
  });
  const [formattedData, setFormattedData] = useState<IFormattedTransaction[]>();
  const JAN_BOX_ADDRESS = "0x5F8061F9d6A2Bb4688F46491cCA7658e214E2Cb6";

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setFormattedData(formatData(data.transactions));
    }
  }, [data]);

  return (
    <MarketCard
      address={JAN_BOX_ADDRESS}
      loading={loading}
      error={error}
      transactions={data ? formattedData : undefined}
    />
  );
}

export default JanuaryCard;
