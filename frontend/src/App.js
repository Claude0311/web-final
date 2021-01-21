// import logo from './logo.svg';
import './App.css';
import { useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Post from './container/Post'

import Login from './container/Login'
import UserInterface from './container/UserInterface';
import SignUp from './container/SignUp';
import {PrivateRoute} from './component/PrivateRoute';
import { useAuth } from './Auth/AuthService';

function App() {
  const [isLoading, setLoading] = useState(false);
  const {username, isAuth, login, logout, autoLogin} = useAuth();
  /*
  const loginAuto = async () => {
    const token = getLocalAccount();
    if (!token) {
      console.log("do not get stored...");
      setLoading(false);
      return;
    }
    else {
      
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
  */
  useEffect(() => {
    // do read cache here
    setLoading(true)
    if (!username) {
      console.log("Welcome to House Evaluation App");
      console.log("try login automatically...");
      autoLogin();
    }
    setLoading(false)
  }, []);

  if (isLoading) {
    return <div><p>is loading...</p></div>;
  }
  return (
    <div className="App">
      <Post/>
      <Router>
        <Switch>
          <Route path="/login" exact render={ (props) => 
            (<Login {...props} id={username} login={login}/> )} />
          <Route path="/register" exact render={ (props) => 
            (<SignUp {...props} logout={logout}/> )} />
          <PrivateRoute 
            path="/" component={UserInterface} 
            id={username} isAuth={isAuth} logout={logout}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;