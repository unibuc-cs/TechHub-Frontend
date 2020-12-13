/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-control-regex */
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
import { sendRegisterInformation } from "../../store/user/user.actions";
import { didRegisterSelector } from "../../store/user/user.selector";

import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
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

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const userDidRegister = useSelector(didRegisterSelector);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [usernameTouched, setUsernameTouched] = useState<boolean>(false);
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState<boolean>(
    false
  );
  const [signUpIsDisabled, setSignUpIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (userDidRegister) {
      history.push("/");
    }
  }, [userDidRegister]);

  const onEmailChangedHandler = (e: any) => {
    setEmail(e.target.value);
    setEmailTouched(true);
  };

  const onUsernameChangedHandler = (e: any) => {
    setUsername(e.target.value);
    setUsernameTouched(true);
  };

  const onPasswordChangedHandler = (e: any) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
  };

  const onConfirmPasswordChangedHandler = (e: any) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordTouched(true);
  };

  useEffect(() => {
    if (emailTouched) {
      if (emailRegex.test(email)) {
        setEmailError("");
      } else {
        setEmailError("Email is not valid");
      }
    }

    if (usernameTouched) {
      if (username.trim().length > 0) {
        setUsernameError("");
      } else {
        setUsernameError("Username must not be empty");
      }
    }

    if (passwordTouched) {
      if (passwordRegex.test(password)) {
        setPasswordError("");
      } else {
        setPasswordError(
          "Password must be at least 6 characters long and contain lowercase, uppercase and number"
        );
      }
    }

    if (confirmPasswordTouched) {
      if (confirmPassword === password) {
        setConfirmPasswordError("");
      } else {
        setConfirmPasswordError("Must match password");
      }
    }

    if (
      emailTouched &&
      usernameTouched &&
      passwordTouched &&
      confirmPasswordTouched &&
      emailError === "" &&
      usernameError === "" &&
      passwordError === "" &&
      confirmPasswordError === ""
    ) {
      setSignUpIsDisabled(false);
    } else {
      setSignUpIsDisabled(true);
    }
  }, [
    email,
    password,
    username,
    confirmPassword,
    emailTouched,
    usernameTouched,
    passwordTouched,
    confirmPasswordTouched,
    emailError,
    usernameError,
    passwordError,
    confirmPasswordError,
  ]);

  const onSignUpPressedHandler = () => {
    dispatch(sendRegisterInformation(email, username, password));
  };

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
            Sign up
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
              error={emailError !== ""}
              helperText={emailError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e) => onUsernameChangedHandler(e)}
              error={usernameError !== ""}
              helperText={usernameError}
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
              error={passwordError !== ""}
              helperText={passwordError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm password"
              label="Confirm Password"
              type="password"
              id="confirm password"
              autoComplete="current-password"
              onChange={(e) => onConfirmPasswordChangedHandler(e)}
              error={confirmPasswordError !== ""}
              helperText={confirmPasswordError}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSignUpPressedHandler}
              disabled={signUpIsDisabled}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/" style={{ textDecoration: "none" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignUp;
