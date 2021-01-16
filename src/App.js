import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import Match from "./components/Match";
import PrivateRoute from "./utils/PrivateRoute";
import AlertDialog from "./components/AlertDialog";
import NotFound from "./components/NotFound";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MatchHistory from './components/MatchHistory';
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }  
}));

function App(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("Caro Online Admin");
  const [auth, setAuth] = useState(true);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header
          title={title}
          auth={auth}
          setAuth={setAuth}
          setTitle={setTitle}
        />
        <div className="container d-flex align-items-center flex-column">
        {alert && <Alert severity="error">{alert}</Alert>}
          {loading && (
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          <Switch>
            <Route path="/login" exact>
              <LoginForm
                setAuth={setAuth}
                setTitle={setTitle}
                setError={setAlert}
                setLoading={setLoading}
              />
            </Route>
            <PrivateRoute path="/" exact>
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/user" exact>
              <User 
              setError={setAlert} 
              setTitle={setTitle}
              setLoading={setLoading}
              />
            </PrivateRoute>
            <PrivateRoute path="/match" exact>
              <Match
                setError={setAlert}
                setTitle={setTitle}
                setLoading={setLoading}
              />
            </PrivateRoute>
            <PrivateRoute path="/detail/:id">
                <MatchHistory setError={setAlert} setLoading={setLoading} />
              </PrivateRoute>
            <Route path="" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
