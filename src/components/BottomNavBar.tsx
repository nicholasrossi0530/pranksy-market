import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
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
    padding: "0px 150px",
    marginBottom: "50px",
  },
}));

function BottomNavBar(props: { theme: Theme }) {
  const classes = useStyles(props.theme);

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
        icon={
          <>
            <img
              alt="Etherscan link"
              width="20"
              height="20"
              src="/etherscan-logo-light-circle.svg"
            />
          </>
        }
      />
    </BottomNavigation>
  );
}

export default BottomNavBar;
