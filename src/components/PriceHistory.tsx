import React, { useEffect, useState } from "react";
import "../App.css";
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
  useQuery,
} from "@apollo/client";
import { ILooseObject } from "../interfaces/Interfaces";
import { OS_SCHEMA } from "../utils/Schema";

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

const formatSaleData = (edges: ILooseObject[]) => {
  const results: ILooseObject = {};

  edges.forEach((edge) => {
    if (edge.node.asset.assetEventData.lastSale) {
      const date = new Date(edge.node.asset.assetEventData.lastSale.timestamp);
      const timestamp = date.toLocaleDateString();
      const value = Number(edge.node.asset.assetEventData.lastSale.unitPriceQuantity.quantity / Math.pow(10, 18)).toString();
      const result = {
        value,
        timestamp
      };
      if (results[timestamp]) {
        results[timestamp].push(result);
      } else {
        results[timestamp] = [result];
      }
    }
  });
  
  const dailyResult: ILooseObject[] = [];
  Object.keys(results).forEach((key) => {
    var totalValue = 0;
    var totalCount = 0;
    var average: ILooseObject = {};

    results[key].forEach((item: ILooseObject) => {
      totalCount++;
      totalValue += parseFloat(item.value);
    });

    const averageValue = totalValue / totalCount;
    average.value = `${averageValue}`;
    average.timestamp = key;
    average.volume = totalCount;
    dailyResult.push(average);
  });

  return dailyResult.reverse();
};

function PriceHistory(props: {
  open: boolean;
  queryVariables: ILooseObject;
  handleClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
}) {

  const classes = useStyles();
  const { loading, error, data } = useQuery(OS_SCHEMA, {
    variables: props.queryVariables
  });
  const [saleData, setSaleData] = useState<ILooseObject[]>([]);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setSaleData(formatSaleData(data.query.search.edges));
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
          data={saleData}
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
            dataKey="timestamp"
          />
          <YAxis
            dataKey="value"
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