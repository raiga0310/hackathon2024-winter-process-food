import { useState, useEffect } from 'react'
import './App.css'
import { fetchMapImage } from './utils/fetchMapImage';
import Loading from './components/loading';
import { loadPrtmiesToken,loadMapboxToken } from "./utils/loadToken";
import { fetchApiData } from "./utils/getReleseAddres";
import { geocoding } from "./utils/geocoding";

function App() {
  const [loading, setLoading] = useState(true)
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [releases, setReleases] = useState();
    const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
  };
  useEffect(() => {
    fetchMapImage("東京都",loadMapboxToken()).then((data) => {
      setURL(data);
     })
    fetchApiData("東京都").then((data) => {
         console.log(data)
         setLoading(false)
      })
  },[])
  const releaseItems = releases.map((data) => <li><Bubble title={data.title} url={data.url} image={data.main_image} /></li>);

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
          <ul>{releaseItems}</ul>
        </>
      )}
    </>
  );
}

export default App
