/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import {
  getUserInformation,
  setUserAccessToken,
  setUserEmail,
} from "../../store/user/user.actions";

import { useHistory, Link } from "react-router-dom";

import { accessTokenSelector } from "../../store/user/user.selector";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://hginsights.com/wp-content/uploads/Technology-trends-for-the-future-of-work-in-2020.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const accessToken = useSelector(accessTokenSelector);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(true);

  const onEmailChangedHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const onPasswordChangedHandler = (e: any) => {
    setPassword(e.target.value);
  };

  const onSignInPressedHandler = () => {
    dispatch(getUserInformation(email, password));
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken") && localStorage.getItem("email")) {
      dispatch(setUserAccessToken(localStorage.getItem("accessToken")!));
      dispatch(setUserEmail(localStorage.getItem("email")!));
    }
  }, []);

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setButtonIsDisabled(false);
    } else {
      setButtonIsDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (accessToken) {
      history.push("/homescreen");
    }
  }, [accessToken]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => onEmailChangedHandler(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => onPasswordChangedHandler(e)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSignInPressedHandler}
              disabled={buttonIsDisabled}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/sign-up" style={{ textDecoration: "none" }}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignIn;
