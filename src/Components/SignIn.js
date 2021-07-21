import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import PersonIcon from "@material-ui/icons/Person";
import InputAdornment from "@material-ui/core/InputAdornment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Redirect } from "react-router-dom";
import  { useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import swal from "sweetalert";

var jwt = require("jsonwebtoken");
const axios = require("axios");

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://localhost:3000/">
        Sithru
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    boxShadow: "0 8px 15px 0 rgba(0, 0, 0, 0.5)",
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    boxShadow: "0 8px 15px 0 rgba(0, 0, 0, 0.5)",
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    boxShadow: "0 8px 15px 0 rgba(0, 0, 0, 0.5)",
    color: "#fff",
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  let history = useHistory();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if((localStorage.getItem('token'))){
    return <Redirect to="/dashboard" />;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkAuthorization();
  };

  const resetform = () => {
    setName("");
    setPassword("");
  }

  const checkAuthorization = async () => {
    const data = {
      name: name,
      password: password,
    };
    try {
      const responce = await axios({
        method: "post",
        url: "http://localhost:5000/admin/auth",
        data: data,
      });

      if (responce.data.massage === "UNAUTHORIZED") {
        swal(
          "Invalid login",
          "please try again",
          "error"
        );
        resetform();
      } else if (responce.data.massage === "AUTHORIZED") {
        localStorage.setItem("token", responce.data.token);
        var decoded = jwt.decode(localStorage.getItem("token"));
        console.log("admin", decoded);
        console.log(responce.data.massage);
        resetform();
        swal("login successful", "your login successful", "success");
        history.push('/dashboard');
      } else {
        swal(
          "Invalid login",
          "please try again",
          "error"
        );
        resetform();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.card}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            SITHRU ADMIN
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              onChange={e => setName(e.target.value)}
              value={name}
              autoComplete="name"
              placeholder="enter username here"
              autoFocus
              // size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar className={classes.icon}>
                      <PersonIcon />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              label="Password"
              type="password"
              id="password"
              placeholder="enter password here"
              autoComplete="current-password"
              // size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar className={classes.icon}>
                      <VpnKeyIcon />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Card>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
