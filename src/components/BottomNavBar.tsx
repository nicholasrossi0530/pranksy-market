import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
    flexWrap: "wrap",
    padding: "0px auto",
    marginBottom: "50px",
  },
  navButton: {
      width: "20px"     
  }
}));

function BottomNavBar(props: { theme: boolean }) {
  const classes = useStyles(props.theme);
  const theme = useTheme();

  return (
    <BottomNavigation className={classes.root}>
      <BottomNavigationAction
        target="_blank"
        href="https://twitter.com/nftboxes"
        label="Twitter"
        value="twitter"
        icon={<TwitterIcon />}
      />
      <BottomNavigationAction
        target="_blank"
        href="https://discord.gg/eQWR2HBCYs"
        label="Discord"
        value="favorites"
        icon={
          <>
            <img
              alt="Discord link"
              width="20"
              height="20"
              src="/DiscordIcon.svg"
              style={{
                  backgroundColor: props.theme ? "" : "black"
              }}
            />
          </>
        }
      />
      <BottomNavigationAction
        target="_blank"
        href="https://www.instagram.com/nftboxes/"
        label="Instagram"
        value="nearby"
        icon={<InstagramIcon />}
      />
      <BottomNavigationAction
        target="_blank"
        href="https://etherscan.io/address/0xf876bbc810e84854c9c37018103c0045544a6af9"
        label="Etherscan"
        value="folder"
        className={classes.navButton}
        icon={
          <>
            <img
              alt="Etherscan link"
              width="20"
              height="20"
              src="/etherscan-logo-light-circle.svg"
              className={classes.navButton}
              style={{
                backgroundColor: props.theme ? "" : "black"
            }}
            />
          </>
        }
      />
    </BottomNavigation>
  );
}

export default BottomNavBar;
