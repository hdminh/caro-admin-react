import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
// import PrivateRoute from './utils/PrivateRoute';
import Alert from '@material-ui/lab/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  const [title, setTitle] = useState("Caro Online Admin");
  const [auth, setAuth] = useState(true);
  const [error, setError] = useState(null);
  return (
    <Router>
    <div className="App">
    
      <Header 
      title={title} 
      auth={auth} 
      setAuth={setAuth} 
      setTitle={setTitle} />
        <div className="container d-flex align-items-center flex-column">
        {error && <Alert severity="error">{error}</Alert>}
          <Switch>
            <Route path="/login" exact>
              <LoginForm 
              setAuth={setAuth} 
              setTitle={setTitle} 
              setError={setError} />
            </Route>
            <Route path="/" exact>
              <Home/>
            </Route>

          </Switch>
        </div>
    </div>
    </Router>
  );
}

export default App;
