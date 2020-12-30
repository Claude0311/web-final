import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import Map from './container/Map'
import Login from './container/Login'
function App() {
  const [id, setId] = useState(null)

  return (
    <div className="App">
      {(id)? 
        <Map id={id}/>: <Login setId={setId}/> 
      }
    </div>
  );
}

export default App;