import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import Map from './container/Map'
import Post from './container/Post'
import Login from './container/Login'
import Fill_in from './container/Fill_in';
function App() {
  const [id, setId] = useState(null)
  const [clickMap, setClickMap] = useState(false);
  return (
    <div className="App">
      {/* clickMap? <Fill_in /> */}
      {(id)? {
        clickMap?
        <Fill_in />
        <Map id={id}/>} : <Login setId={setId}/>}
    </div>
  );
}

export default App;
