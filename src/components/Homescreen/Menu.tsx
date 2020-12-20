import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { fade, makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const ToolbarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightSideContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Menu = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#231f20" }}>
        <Toolbar>
          <ToolbarContainer>
            <Image src="https://i.pinimg.com/474x/0b/cb/57/0bcb579e4b62ca4f7293080be30fa4e7.jpg" />
            <RightSideContainer>
              <Button
                variant="contained"
                style={{ backgroundColor: "#edf5e1" }}
                className={classes.button}
                startIcon={<EqualizerIcon />}
              >
                Leaderboard
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#edf5e1" }}
                className={classes.button}
                startIcon={<AttachMoneyOutlinedIcon />}
              >
                Discounts
              </Button>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </RightSideContainer>
          </ToolbarContainer>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
