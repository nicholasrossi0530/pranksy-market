import React from "react";
import {
  AppBar,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { ILooseObject } from "../interfaces/Interfaces";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import GroupIcon from '@material-ui/icons/Group';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
  hamMenu: {
    [theme.breakpoints.up("md")]: { display: "none" },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function NavBar(props: {
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  theme: boolean;
}) {
  const icon = props.theme ? <WbSunnyIcon /> : <Brightness3Icon />;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openListings, setOpenListings] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openNested, setOpenNested] = React.useState(false);

  const handleClick = (event: ILooseObject) => {
    setAnchorEl(event.currentTarget);
    setOpenListings(true);
  };

  const handleNestedClick = (event: ILooseObject) => {
    setOpenNested(!openNested);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenListings(false);
    setOpenDrawer(false);
  };

  const toggleDrawer = (open: boolean) => (event: ILooseObject) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const DrawerItems = () => (
    <div
      role="presentation"
    >
      <List>
        <ListItem button onClick={handleClose}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"HOMEPAGE"} />
        </ListItem>
        <ListItem button onClick={handleClose}>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary={"WIN WIN WIN"} />
        </ListItem>
        <ListItem button onClick={handleClose}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary={"ON CHAIN MAGIC"} />
        </ListItem>
        <ListItem button onClick={handleClose}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary={"THE TEAM"} />
        </ListItem>
        <ListItem button onClick={handleNestedClick}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="LISTINGS" />
          {openNested ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openNested} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={handleClose}
              component={Link}
              to={"/nftbox/genesis"}
            >
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary="Jan 2021 - Genesis Box" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={handleClose}
              component={Link}
              to={"/nftbox/grow"}
            >
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary="Feb 2021 - Grow Box" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );

  const AppBarButtons = () => {
    return (
      <>
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
        <Button
          ref={anchorEl}
          color="inherit"
          className={`${classes.appButton} ${classes.link}`}
          onClick={handleClick}
        >
          LISTINGS
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={openListings}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={handleClose}
            component={Link}
            to={"/nftbox/genesis"}
            className={classes.link}
          >
            Jan 2021 - Genesis Box
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={Link}
            to={"/nftbox/grow"}
            className={classes.link}
          >
            Feb 2021 - Grow Box
          </MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.hamMenu}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer(false)}>
          <DrawerItems />
        </Drawer>
        <Typography
          variant="h6"
          className={`${classes.appBarTitle} ${classes.link}`}
          color="inherit"
          component={Link}
          to={"/"}
        >
          LISTINGS
        </Typography>
    <AppBarButtons />
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
