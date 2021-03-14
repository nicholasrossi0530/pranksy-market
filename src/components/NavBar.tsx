import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    textDecorationColor: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
  appBarTitle: {
    marginRight: "2em",
  },
  lastNavButton: {
    marginLeft: "auto",
  },
  appButton: {
    [theme.breakpoints.down("sm")]: { display: "none" },
  },
}));

function NavBar(props: {
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  theme: boolean;
}) {
  const icon = props.theme ? <WbSunnyIcon /> : <Brightness3Icon />;
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu">
                      <MenuIcon />
                      TODO: Make menu items
                    </IconButton> */}
        <Typography variant="h6" className={`${classes.appBarTitle} ${classes.link}`} color="inherit" component={Link} to={"/"}>
          LISTINGS
        </Typography>
        <Button
          color="inherit"
          href="https://nftboxes.io/"
          className={classes.appButton}
        >
          HOMEPAGE
        </Button>
        <Button
          color="inherit"
          href="https://nftboxes.io/win-win-win/"
          className={classes.appButton}
        >
          WIN WIN WIN
        </Button>
        <Button
          color="inherit"
          href="https://nftboxes.io/on-chain-magic/"
          className={classes.appButton}
        >
          ON CHAIN MAGIC
        </Button>
        <Button
          color="inherit"
          href="https://nftboxes.io/team/"
          className={classes.appButton}
        >
          THE TEAM
        </Button>
        <Button color="inherit" className={`${classes.appButton} ${classes.link}`} component={Link} to={"/"}>
            LISTINGS
        </Button>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="mode"
          onClick={() => props.setTheme(!props.theme)}
          className={classes.lastNavButton}
        >
          {icon}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
