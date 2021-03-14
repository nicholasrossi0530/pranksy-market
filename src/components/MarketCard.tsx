import React, { useEffect, useState } from "react";
import "../App.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PriceHistory from "./PriceHistory";
import { IAsset } from "../interfaces/Interfaces";
import {
  coinSymbolConverter,
  removeEdition,
  getSearchTraits,
} from "../utils/Utility";
import { OS_VARS } from "../utils/Schema";
import { Link } from "react-router-dom";
import { Shimmer } from 'react-shimmer';

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
    margin: "5px 0px"
  }
}));

function MarketCard(props: {
  address: string;
  box?: string;
  orderBy: string;
  tokenId?: number;
  collection: string;
  name: string;
}) {
  const [assetData, setAssetData] = useState<IAsset[] | []>([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [priceHistoryLoading, setPriceHistoryLoading] = React.useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.opensea.io/api/v1/assets${
          props.tokenId ? `?token_ids=${props.tokenId}` : ""
        }`,
        {
          params: {
            asset_contract_address: props.address,
            order_by: props.orderBy,
            limit: 1,
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

    fetchData();
  }, [props.address, props.orderBy, props.tokenId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <Card className={classes.marketCard}>
        <Link to={`/nftbox/${props.box}`} className={classes.link}>
          <Shimmer width={450} height={450} />
        </Link>
        <CardContent>
        <Shimmer className={classes.shimmerText} width={418} height={32} />
        <Shimmer className={classes.shimmerText} width={418} height={20} />
        <Shimmer className={classes.shimmerText} width={418} height={60} />
        </CardContent>
        <CardActions>
          <Button
            href={assetData.length > 0 ? assetData[0].permalink : ""}
            target="_blank"
            size="small"
          >
            <Shimmer width={79} height={22} />
          </Button>
          {props.box && (
            <Link to={`/nftbox/${props.box}`} className={classes.link}>
              <Shimmer width={79} height={22} />
            </Link>
          )}
          <Button onClick={handleOpen} size="small">
            <Shimmer width={79} height={22} />
          </Button>
        </CardActions>
      </Card>
    );
  } else {
    return (
      <Card className={classes.marketCard}>
        <Link to={`/nftbox/${props.box}`} className={classes.link}>
          {assetData.length > 0 &&
          assetData[0].animation_url &&
          assetData[0].animation_url.includes(".mp4") ? (
            <video
              autoPlay
              muted
              loop
              src={assetData[0].animation_url!}
              height={450}
              preload="auto"
              controlsList="nodownload"
            />
          ) : (
            <CardMedia
              component={
                assetData.length > 0 &&
                assetData[0].image_url &&
                assetData[0].image_url.includes(".mp4")
                  ? "video"
                  : "img"
              }
              alt="NFTBox"
              height="450px"
              title="NFTBox"
              autoPlay={true}
              muted={true}
              loop={true}
              preload={"auto"}
              controlsList={"nodownload"}
              src={
                assetData.length > 0
                  ? assetData[0].animation_url ?? assetData[0].image_url
                  : ""
              }
            />
          )}
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name ? props.name : "Box"}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Last sale:{" "}
            {assetData.length > 0 && assetData[0].last_sale
              ? `${Number(
                  parseInt(assetData[0].last_sale.total_price) /
                    Math.pow(10, assetData[0].last_sale.payment_token.decimals)
                ).toFixed(4)} ${coinSymbolConverter(
                  assetData[0].last_sale.payment_token.symbol
                )}`
              : ""}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {assetData.length > 0 ? assetData[0].description : ""}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            href={assetData.length > 0 ? assetData[0].permalink : ""}
            target="_blank"
            size="small"
          >
            Check Out
          </Button>
          {props.box && (
            <Link to={`/nftbox/${props.box}`} className={classes.link}>
              <Button size="small">Contents</Button>
            </Link>
          )}
          <Button onClick={handleOpen} size="small">
            {priceHistoryLoading ? (
              <CircularProgress className={classes.spinner} size={20} />
            ) : (
              "Price History"
            )}
          </Button>
          {open && (
            <PriceHistory
              handleClose={handleClose}
              setPriceHistoryLoading={setPriceHistoryLoading}
              open={open}
              queryVariables={OS_VARS(
                removeEdition(assetData.length > 0 ? assetData[0].name : ""),
                getSearchTraits(
                  assetData.length > 0 ? assetData[0].traits : []
                ),
                props.collection
              )}
            />
          )}
        </CardActions>
      </Card>
    );
  }
}

export default MarketCard;
