import React from "react";
import { Card, CardActions, CardContent } from "@material-ui/core";
import { Shimmer } from "react-shimmer";
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

function LoadingCard() {
    const classes = useStyles();

    return (
      <Card className={classes.marketCard}>
        <Shimmer width={450} height={450} />
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

  export default LoadingCard;
