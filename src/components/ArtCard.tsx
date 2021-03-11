import React from "react";
import "../App.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IAsset } from "../interfaces/Interfaces";
import PriceHistory from "./PriceHistory";
import { removeEdition, getSearchTraits } from "../utils/Utility";
import { OS_VARS } from "../utils/Schema";

const useStyles = makeStyles(() => ({
  artCard: {
    maxWidth: "450px",
    margin: "1em 0.5em",
    maxHeight: "950px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    height: "450px",
  },
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 4,
    "-webkit-box-orient": "vertical",
  },
  spinner: {
    color: "#ffdc11"
  }
}));

function ArtCard(props: { item: IAsset; address: string }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [priceHistoryLoading, setPriceHistoryLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptions = props.item.description.match(/[^\r\n]+/g)!;
  const artist = descriptions[1];
  const message = descriptions[4];
  const artistNote = descriptions[5];
  return (
    <Card className={classes.artCard} key={props.item.id}>
      {props.item &&
      props.item.animation_url &&
      props.item.animation_url.includes(".mp4") ? (
        <video
          autoPlay
          muted
          loop
          src={props.item.animation_url!}
          height={450}
          preload="auto"
          controlsList="nodownload"
        />
      ) : (
        <CardMedia
          component={props.item && props.item.image_url && props.item.image_url.includes(".mp4") ? "video" : "img"}
          alt="NFTBox"
          height="450px"
          title="NFTBox"
          autoPlay={true}
          muted={true}
          loop={true}
          preload={"auto"}
          controlsList={"nodownload"}
          src={
            props.item ? props.item.animation_url ?? props.item.image_url : ""
          }
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.item ? props.item.name : ""}
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary={artist} />
          </ListItem>
          <ListItem>
            <ListItemText primary={message} />
          </ListItem>
          <ListItem>
            <ListItemText
              className={classes.multiLineEllipsis}
              primary={artistNote}
            />
          </ListItem>
        </List>
        {/* <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          Last sale:{" "}
          {props.item && props.item.last_sale
            ? `${
                Number(parseInt(props.item.last_sale.total_price) /
                Math.pow(10, props.item.last_sale.payment_token.decimals)).toFixed(4)
              } ${coinSymbolConverter(props.item.last_sale.payment_token.symbol)}`
            : ""}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button
          href={props.item ? props.item.permalink : ""}
          target="_blank"
          size="small"
        >
          Check Out
        </Button>
        <Button onClick={handleOpen} size="small">
          {priceHistoryLoading ? <CircularProgress className={classes.spinner} size={20} /> : "Price History"}
        </Button>
        {open && (
          <PriceHistory
            handleClose={handleClose}
            setPriceHistoryLoading={setPriceHistoryLoading}
            open={open}
            queryVariables={OS_VARS(
              removeEdition(props.item.name),
              getSearchTraits(props.item.traits),
              "nftboxes"
            )}
          />
        )}
      </CardActions>
    </Card>
  );
}

export default ArtCard;
