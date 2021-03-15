import React, { useEffect, useState } from "react";
import "../App.css";
import { Modal } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@apollo/client";
import { ILooseObject } from "../interfaces/Interfaces";
import { OS_SCHEMA } from "../utils/Schema";

const useStyles = makeStyles((theme) => ({
  modalBox: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  areaChart: {
    margin: "auto",
    display: "flex",
    backgroundColor: "white",
  },
}));

const formatSaleData = (edges: ILooseObject[]) => {
  const results: ILooseObject = {};

  edges.forEach((edge) => {
    if (edge.node.asset.assetEventData.lastSale) {
      const date = new Date(edge.node.asset.assetEventData.lastSale.timestamp);
      const timestamp = date.toLocaleDateString();
      const value = Number(
        edge.node.asset.assetEventData.lastSale.unitPriceQuantity.quantity /
          Math.pow(10, 18)
      ).toString();
      const result = {
        value,
        timestamp,
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
    average["Average Sale ( Ξ )"] = `${averageValue}`;
    average.timestamp = key;
    average.volume = totalCount;
    dailyResult.push(average);
  });

  return dailyResult.reverse();
};

function PriceHistory(props: {
  open: boolean;
  queryVariables: ILooseObject;
  handleClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  setPriceHistoryLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(OS_SCHEMA, {
    variables: props.queryVariables,
  });
  const [saleData, setSaleData] = useState<ILooseObject[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setSaleData(formatSaleData(data.query.search.edges));
    }
  }, [data]);

  if (loading) {
    props.setPriceHistoryLoading(true);
    return null;
  } else if (error) {
    return <p>Error :( {JSON.stringify(error)}</p>;
  } else {
    props.setPriceHistoryLoading(false);
    return (
      <>
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modalBox}
        >
          <ResponsiveContainer width={"95%"} height={"90%"}>
            <AreaChart
              data={saleData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              className={classes.areaChart}
              style={{
                backgroundColor: theme.palette.background.paper,
                fill: theme.palette.text.secondary,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis dataKey="timestamp" tick={{ fill: theme.palette.text.primary }}/>
              <YAxis dataKey="Average Sale ( Ξ )"  tick={{ fill: theme.palette.text.primary }}/>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip contentStyle={{ color: theme.palette.text.primary, backgroundColor: theme.palette.background.paper }} />
              <Area
                type="monotone"
                dataKey="Average Sale ( Ξ )"
                stroke={theme.palette.primary.main}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Modal>
      </>
    );
  }
}

export default PriceHistory;
