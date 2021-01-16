import React, { useState } from "react";
import { ACCESS_TOKEN_NAME } from "../constants/apiContants";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { login } from "../utils/api";
import { withRouter } from "react-router-dom";

function LoginForm(props) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const wrapper = React.createRef();

  const handleSubmitCheck = (e) => {
    setLoading(true);
    login(e.username, e.password)
      .then((response) => {
        setLoading(false);
        if (response.status < 400) {
          console.log(response.data.datalogin.token);

          localStorage.setItem(
            ACCESS_TOKEN_NAME,
            response.data.datalogin.token
          );
          redirectToHome();
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        props.setError("Đăng nhập không thành công");
      });
  };
  const redirectToHome = () => {
    props.history.push("/");
    props.setError(null);
    props.setAuth(true);
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
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
  const classes = useStyles();
  return (
    <div ref={wrapper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {loading && (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit((data) => handleSubmitCheck(data))}
          >
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(LoginForm);
