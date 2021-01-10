import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
// import Map from './container/Map'
import Login from './container/Login'
import UserInterface from './container/UserInterface';
function App() {
  const [id, setId] = useState(null);
  const [isAuth, setAuth] = useState(false);

  return (
    <div className="App">
      {(id)? 
        <UserInterface id={id} isAuth={isAuth}/>: <Login setAuth={setAuth} setId={setId}/> 
      }
    </div>
  );
}

export default App;