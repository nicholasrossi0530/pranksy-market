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

const formatData = (transacations: ITransaction[]) => {
  return transacations.map((transaction: ITransaction) => {
    const date = new Date(parseInt(transaction.timestamp) * 1000);
    const value = parseInt(transaction.value) / Math.pow(10, 18);
    return {
      ...transaction,
      formattedTimestamp: date.toLocaleDateString(),
      formattedValue: value.toString(),
      day: parseInt(
        `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
      ),
    };
  });
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

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setFormattedData(formatData(data.transactions));
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
            dataKey="day"
            tickSize={1}
            ticks={[202131, 202132, 202133, 202134, 202135, 202136]}
          />
          <YAxis
            dataKey="formattedValue"
            tickSize={1}
            ticks={[0.5, 1.0, 1.5, 2, 2.5, 3, 3.5, 4]}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="formattedValue"
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
