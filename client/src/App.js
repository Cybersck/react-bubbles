import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./styles.scss";

function App() {

  let history = useHistory();
  
  let [token, setToken] = useState(false);
  let [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    let token = window.localStorage.getItem('user-auth') ? window.localStorage.getItem('user-auth') : null;
    if (token !== null) {
      setLoggedIn(true);
      setToken(token)
    } 
  },[])


  const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      typeof token === "string"
      ? <Component {...props} history={history} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      : <Redirect to='/'/>
    )}/>
  )

  const PublicRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      typeof token === "string"
      ? <Redirect to='/bubble'/>
      : <Component {...props} history={history} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
    )}/>
  )

  return (
    <Switch>
        <PublicRoute exact path='/' component={Login}/>
        <PrivateRoute path='/bubble' component={BubblePage}/>
    </Switch>
  );
} 

export default App;
