import React from "react";
import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LaunchIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles(() => ({
    devSignature: {
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        marginBottom: "50px",
        paddingLeft: "10px"
      },
      link: {
        "&:hover": {
          textDecoration: "none",
        },
        textDecoration: "none",
      }
  }));

function DevDetails() {
    const classes = useStyles();

    return (
        <div className={classes.devSignature}>
        <Link
          target="_blank"
          className={classes.link}
          color="textSecondary"
          href={"https://opensea.io/accounts/nickrossi"}
        >
          Developed by: nickrossi <LaunchIcon fontSize={"small"} />
          <br />
          Eth address: 0x8530e5B5621119CB3e3Ae324e6A6e63014A6aD87
        </Link>
      </div>
    );
  };

  export default DevDetails;
