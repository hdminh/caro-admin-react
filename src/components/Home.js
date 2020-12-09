import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';

function Home(props) {

    useEffect(() => {
        if (!localStorage.getItem(ACCESS_TOKEN_NAME)) redirectToLogin();
        
    })
    function redirectToLogin() {
    props.history.push('/login');
    }
  return (
    <div className="App">
      Dashboard
    </div>
  );
}

export default withRouter(Home);