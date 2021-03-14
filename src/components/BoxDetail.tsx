import { Card, CardActions, CardContent } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Shimmer } from "react-shimmer";
import { IAsset, IParamType } from "../interfaces/Interfaces";
import { ART_ADDRESS, getTokenIds } from "../utils/Utility";
import ArtCard from "./ArtCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  marketCard: {
    maxWidth: "450px",
    margin: "1em 0.5em",
    maxHeight: "950px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
  },
  spinner: {
    color: "#ffdc11",
  },
  shimmerText: {
    margin: "5px 0px",
  },
}));

function BoxDetail() {
  const params = useParams<IParamType>();
  const classes = useStyles();
  const [assetData, setAssetData] = useState<IAsset[] | []>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const result = await axios(
      `https://api.opensea.io/api/v1/assets${getTokenIds(params.box)}`,
      {
        params: {
          asset_contract_address: ART_ADDRESS,
          order_by: "token_id",
          order_direction: "asc",
        },
      }
    );
    if (result.status === 200) {
      setAssetData(result.data.assets);
      setLoading(false);
    } else {
      console.log(`ERROR: WTF ${result}`);
    }
  };

  useEffect(() => {
    if (assetData.length === 0) {
      fetchData();
    }
  });

  const LoadingCard = () => {
    return (
      <Card className={classes.marketCard}>
        <Shimmer width={400} height={450} />
        <CardContent>
          <Shimmer className={classes.shimmerText} width={325} height={32} />
          <Shimmer className={classes.shimmerText} width={325} height={20} />
          <Shimmer className={classes.shimmerText} width={325} height={60} />
        </CardContent>
        <CardActions>
          <Shimmer width={79} height={22} />
          <Shimmer width={79} height={22} />
        </CardActions>
      </Card>
    );
  };

  if (loading) {
    return (
      <>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </>
    );
  } else {
    return (
      <>
        {assetData.map((item: IAsset) => {
          return <ArtCard address={ART_ADDRESS} item={item} />;
        })}
      </>
    );
  }
}

export default BoxDetail;
