import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { loadPrtmiesToken } from './utils/loadToken';
import { loadMapboxToken } from './utils/loadToken';
import { fetchMapImage } from './utils/fetchMapImage';

function App() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
    const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
  };
  const [imgURL, setURL] = useState("");
  useEffect(() => {
    fetchMapImage("東京都",loadMapboxToken()).then((data) => {
      setURL(data);
    })
  },[])
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={getCurrentPosition}>
          latitude: {position.latitude},<br/>
          longitude: {position.longitude}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <img src={ imgURL }></img>
    </>
  )
}

export default App
