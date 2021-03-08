import React from "react";
import "./App.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IAsset } from "./interfaces/Interfaces";
import PriceHistory from "./PriceHistory";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { coinSymbolConverter } from "./utils/Utility";

const useStyles = makeStyles(() => ({
  marketCard: {
    maxWidth: "450px",
    margin: "1em 0",
    maxHeight: "950px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonContainer: {},
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
}));

const getXDaysAgo = () => {
  const today = new Date();
  today.setDate(today.getDate() - 7);
  return Date.parse(today.toString()) / 1000;
};

const client = new ApolloClient({
  uri:
    "https://api.thegraph.com/subgraphs/name/nicholasrossi0530/nft-box-art-graph",
  cache: new InMemoryCache(),
});

function ArtCard(props: { item: IAsset; address: string }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const QUERY = (days: number, tokenId: string) => {
    return gql`
  {
    transactions(
      orderBy: "timestamp"
      orderDirection: "asc"
      where: {
        value_gt: 0,
        # timestamp_gt: ${getXDaysAgo()},
        tokenId: ${tokenId}
      }
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
  };

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
    <Card className={classes.marketCard} key={props.item.id}>
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
          component={props.item && props.item.animation_url ? "video" : "img"}
          alt="NFTBox"
          height="450px"
          title="NFTBox"
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
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          Last sale:{" "}
          {props.item
            ? `${
                Number(parseInt(props.item.last_sale.total_price) /
                Math.pow(10, props.item.last_sale.payment_token.decimals)).toFixed(4)
              } ${coinSymbolConverter(props.item.last_sale.payment_token.symbol)}`
            : ""}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonContainer}>
        <Button
          href={props.item ? props.item.permalink : ""}
          target="_blank"
          size="small"
        >
          Check Out
        </Button>
        <Button onClick={handleOpen} size="small">
          Price History
        </Button>
        {open && (
          <PriceHistory
            query={QUERY(0, props.item.token_id)}
            client={client}
            handleClose={handleClose}
            open={open}
          />
        )}
      </CardActions>
    </Card>
  );
}

export default ArtCard;
