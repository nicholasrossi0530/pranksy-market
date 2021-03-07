import React from "react";
import "./App.css";
import { Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ApolloError, gql, useQuery } from "@apollo/client";
import { IFormattedTransaction } from "./interfaces/Interfaces";

const getXDaysAgo = () => {
    const today = new Date();
    today.setDate(today.getDate() - 5);
    return Date.parse(today.toString()) / 1000;
  };

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

function PriceHistory(props: { loading: boolean, error: ApolloError | undefined, transactions: IFormattedTransaction[] | undefined }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (props.loading) return <p>Loading...</p>;
  if (props.error) return <p>Error :( {JSON.stringify(props.error)}</p>;

  return (
    <>
      <Button onClick={handleOpen} size="small">
        Price History
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modalBox}
      >
        <AreaChart
          width={750}
          height={750}
          data={props.transactions}
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
            ticks={[
              202131,
              202132,
              202133,
              202134,
              202135,
              202136
            ]}
          />
          <YAxis
            dataKey="formattedValue"
            tickSize={1}
            ticks={[
              0.5,
              1.0,
              1.5,
              2,
              2.5,
              3,
              3.5,
              4,
            ]}
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
