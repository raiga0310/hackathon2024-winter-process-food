import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { loadMapboxToken } from './utils/loadToken';
import { fetchMapImage } from './utils/fetchMapImage';
import { changeToPrefecture } from './utils/changeToPrefecture';
import Loading from './components/loading';;

function App() {
  const [loading, setLoading] = useState(true)
  const [position, setPosition] = useState({ latitude: null, longitude: null });
    const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
  };
  const [imgURL, setURL] = useState("");
  useEffect(() => {
    fetchMapImage(loadMapboxToken()).then((data) => {
      setURL(data);
      setLoading(false);
    })
  },[])

  useEffect(() => {
    fetchMapImage(loadMapboxToken(),changeToPrefecture(position["latitude"], position["longitude"],loadMapboxToken())).then((data) => {
      setURL(data);
    })
  },[position])

  return (
    <>
      {loading ?(<Loading/>):(
        <>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={getCurrentPosition}>
              latitude: {position.latitude},<br/>
              longitude: {position.longitude}
            </button>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
          <img src={ imgURL }></img>
        </>
      )}
    </>
  );
}

export default App
