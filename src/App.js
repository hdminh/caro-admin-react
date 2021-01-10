import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import User from './components/User';
import Match from './components/Match'; 
import PrivateRoute from './utils/PrivateRoute';
import AlertDialog from './components/AlertDialog';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [title, setTitle] = useState("Caro Online Admin");
  const [auth, setAuth] = useState(true);
  const [alert, setAlert] = useState(null);

  return (
    <Router>
    <div className="App">
    
      <Header 
      title={title} 
      auth={auth} 
      setAuth={setAuth} 
      setTitle={setTitle} />
        <div className="container d-flex align-items-center flex-column">
          <AlertDialog alert={alert} setAlert={setAlert} />
          <Switch>
            <Route path="/login" exact>
              <LoginForm 
              setAuth={setAuth} 
              setTitle={setTitle} 
              setError={setAlert} />
            </Route>
            <PrivateRoute path="/" exact>
              <Home/>
            </PrivateRoute>
            <PrivateRoute path="/user" exact>
              <User 
              setError={setAlert} 
              setTitle={setTitle} />
            </PrivateRoute>
            <PrivateRoute path="/match" exact>
              <Match 
              setError={setAlert} 
              setTitle={setTitle} />
            </PrivateRoute>
          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;
