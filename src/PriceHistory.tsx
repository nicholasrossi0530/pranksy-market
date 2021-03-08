import React, { useEffect, useState } from "react";
import "./App.css";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
  useQuery,
} from "@apollo/client";
import { IFormattedTransaction, ITransaction } from "./interfaces/Interfaces";

const useStyles = makeStyles((theme) => ({
  modalBox: {
    margin: "auto",
    display: "flex"
  },
  areaChart: {
    margin: "auto",
    display: "flex",
    backgroundColor: "white"
  }
}));

interface LooseObject {
  [key: string]: any
}

const formatData = (transacations: ITransaction[]) => {
  var daily: LooseObject = {};
  var maxValue = 0;
  transacations.forEach((item) => {
    const date = new Date(parseInt(item.timestamp) * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${date.getFullYear()}${month < 10 ? 0 : ''}${month}${day < 10 ? 0 : ''}${day}`;
    const value = parseInt(item.value) / Math.pow(10, 18);
    const formattedItem = {
      ...item,
      formattedTimestamp: date.toLocaleDateString(),
      Price: value.toFixed(4).toString(),
      day: dateString
    };
    maxValue = value > maxValue ? value : maxValue;

    if (daily[dateString] === null || daily[dateString] === undefined) {
      daily[dateString] = [formattedItem]
    } else {
      daily[dateString].push(formattedItem);
    }

  });

  const averageTransactions: IFormattedTransaction[] = [];
  Object.keys(daily).forEach((key: string) => {
    var totalValue = 0;
    var totalCount = 0;
    var averageDay: IFormattedTransaction = daily[key][0];

    daily[key].forEach((transaction: IFormattedTransaction) => {
      totalCount++;
      totalValue += parseFloat(transaction.Price);
    });

    const averageValue = totalValue / totalCount;
    averageDay.Price = `${averageValue}`;
    averageTransactions.push(averageDay);
  });

  return {
    averageTransactions,
    maxValue
  };
};

function PriceHistory(props: {
  query: DocumentNode;
  client: ApolloClient<NormalizedCacheObject>;
  open: boolean;
  handleClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
}) {

  const classes = useStyles();
  const { loading, error, data } = useQuery(props.query, {
    client: props.client
  });
  const [formattedData, setFormattedData] = useState<IFormattedTransaction[]>();
  const [ticks, setTicks] = useState<number[]>();

  useEffect(() => {
    if (data !== undefined && data !== null) {
      const formattedData = formatData(data.transactions);
      const ticks = [];
      const max = formattedData.maxValue;
      setFormattedData(formattedData.averageTransactions);
      for (var i = 0; i < Math.ceil(max <= 1.5 ? 1.5 : max); i+=0.5) {
        ticks.push(i);
      }
      setTicks(ticks);
    }
  }, [data]);

  if (loading) return null;
  if (error) return <p>Error :( {JSON.stringify(error)}</p>;

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modalBox}
      >
        <AreaChart
          width={750}
          height={750}
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          className={classes.areaChart}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="formattedTimestamp"
          />
          <YAxis
            dataKey="Price"
            tickSize={1}
            ticks={ticks}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Price"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </Modal>
    </>
  );
}

export default PriceHistory;
