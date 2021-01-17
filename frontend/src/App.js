// import logo from './logo.svg';
import './App.css';
import { useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Post from './container/Post'

import Login from './container/Login'
import UserInterface from './container/UserInterface';
import SignUp from './container/SignUp';
import {PrivateRoute} from './component/PrivateRoute';
import { getLocalAccount, removeAccount, useAuth } from './Auth/AuthService';

function App() {
  const [isLoading, setLoading] = useState(true);
  const {username, isAuth, login, logout} = useAuth();
  
  const loginAuto = async () => {
    const token = getLocalAccount();
    if (!token) {
      console.log("do not get stored...");
      setLoading(false);
      return;
    }
    // setLoading(true);
    const result = await login(token);
    if (result === 'success') {
      console.log(result);
      console.log(username,isAuth);
    } else {
      removeAccount();
    }
    setLoading(false);
    return;
  } 
  useEffect(() => {
    // do read cache here
    if (!username) {
      console.log("this is App");
      console.log("try login automatically");
      loginAuto();
    }
    
  }, []);

  // const requireLogin = ()
  if (isLoading) {
    return <div><p>is loading...</p></div>;
  }
  return (
    <div className="App">
      <Post/>
      <Router>
        <Switch>
          <PrivateRoute 
            path="/" exact component={UserInterface} 
            id={username} isAuth={isAuth} logout={logout}/>
          <Route path="/login" exact render={ (props) => 
            (<Login {...props} id={username} login={login}/> )} />
          <Route path="/register" exact render={ (props) => 
            (<SignUp {...props} logout={logout}/> )} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;