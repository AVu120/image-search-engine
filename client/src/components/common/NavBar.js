import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { grey } from "../../utilities/constants/colors";
import NavigationButton from "../common/NavigationButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    backgroundColor: grey,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <NavigationButton />
          <Typography variant="h3" className={classes.title}>
            Image Search Engine
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
