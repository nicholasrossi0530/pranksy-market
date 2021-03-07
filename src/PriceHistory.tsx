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
import { gql, useQuery } from "@apollo/client";

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

function PriceHistory() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {JSON.stringify(error)}</p>;

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
          width={1000}
          height={1000}
          data={data.transactions}
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
          <XAxis dataKey="timestamp" />
          <YAxis
            dataKey="value"
            tickSize={1}
            ticks={[
              500000000000000000,
              1000000000000000000,
              1500000000000000000,
              2000000000000000000,
              2500000000000000000,
              3000000000000000000,
              3500000000000000000,
              4000000000000000000,
            ]}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
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
