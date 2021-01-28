import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { fade, makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StarIcon from "@material-ui/icons/Star";
import ReportIcon from "@material-ui/icons/Report";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ProfileModal from "../UI/ProfileModal";
import { UserDetails } from "../../store/store";

import { logoutUser } from "../../store/user/user.actions";

import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const animated = keyframes`
0% {
  transform:scale(1);
}
50% {
  transform:scale(1.25);
}
100% {
  transform:scale(1);
}
`;

const Image = styled.img`
  width: 100px;
  height: 100px;

  :hover {
    cursor: pointer;
  }
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

const AnimatedButtonContainer = styled.div`
  animation: ${animated} 1.5s linear infinite;
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

const Menu: React.FC<{ userDetails?: UserDetails; isAuth: boolean }> = ({
  userDetails,
  isAuth,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [profileModalIsOpen, setProfileModalIsOpen] = useState<boolean>(false);

  const onLogoutButtonClickedHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    history.push("/");
  };

  let vipButton = null;
  let reportsButton = null;
  let logoutButton = null;
  let profileButton = null;
  let loginButton = null;

  if (isAuth) {
    // if vip or mod
    if (userDetails!.vipStatus || userDetails!.type === "MODERATOR") {
      vipButton = (
        <AnimatedButtonContainer>
          <Button
            variant="contained"
            style={{
              backgroundColor: "lime",
              fontFamily: "Montserrat",
            }}
            className={classes.button}
            startIcon={<StarIcon />}
            onClick={() => history.push("/homescreen/vip")}
          >
            VIP
          </Button>
        </AnimatedButtonContainer>
      );
    }

    // if mod
    if (userDetails!.type === "MODERATOR") {
      reportsButton = (
        <Button
          variant="contained"
          style={{ backgroundColor: "white", fontFamily: "Montserrat" }}
          className={classes.button}
          startIcon={<ReportIcon />}
          onClick={() => history.push("/homescreen/reports")}
        >
          Reports
        </Button>
      );
    }

    logoutButton = (
      <Button
        variant="contained"
        style={{ backgroundColor: "white", fontFamily: "Montserrat" }}
        className={classes.button}
        startIcon={<ExitToAppIcon />}
        onClick={onLogoutButtonClickedHandler}
      >
        Logout
      </Button>
    );

    profileButton = (
      <IconButton color="inherit" onClick={() => setProfileModalIsOpen(true)}>
        <AccountCircle style={{ color: "white" }} />
      </IconButton>
    );
  } else {
    loginButton = (
      <Button
        variant="contained"
        style={{ backgroundColor: "white", fontFamily: "Montserrat" }}
        className={classes.button}
        startIcon={<VpnKeyIcon />}
        onClick={() => history.push("/")}
      >
        Sign In
      </Button>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#231f20" }}>
        <Toolbar>
          <ToolbarContainer>
            <Image
              src="https://i.pinimg.com/474x/0b/cb/57/0bcb579e4b62ca4f7293080be30fa4e7.jpg"
              onClick={() => history.push("/homescreen")}
            />
            <RightSideContainer>
              {vipButton}
              {reportsButton}
              <Button
                variant="contained"
                style={{ backgroundColor: "white", fontFamily: "Montserrat" }}
                className={classes.button}
                startIcon={<EqualizerIcon />}
                onClick={() => history.push("/homescreen/leaderboard")}
              >
                Leaderboard
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "white", fontFamily: "Montserrat" }}
                className={classes.button}
                startIcon={<ConfirmationNumberIcon />}
                onClick={() => history.push("/homescreen/raffle")}
              >
                Raffle
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "white", fontFamily: "Montserrat" }}
                className={classes.button}
                startIcon={<AttachMoneyOutlinedIcon />}
                onClick={() => history.push("/homescreen/discounts")}
              >
                Discounts
              </Button>
              {logoutButton}
              {profileButton}
              {loginButton}
            </RightSideContainer>
          </ToolbarContainer>
        </Toolbar>
      </AppBar>
      <ProfileModal
        open={profileModalIsOpen}
        onClose={() => setProfileModalIsOpen(false)}
      />
    </div>
  );
};

export default Menu;
