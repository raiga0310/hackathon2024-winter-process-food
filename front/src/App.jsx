import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { loadMapboxToken } from './utils/loadToken';
import { fetchMapImage } from './utils/fetchMapImage';
import Loading from './components/loading';;
import { loadPrtmiesToken } from "./utils/loadToken";
import { fetchPrefectureId } from "./utils/fetchPrefecture";
import { fetchRelease } from "./utils/fetchReleases";
import { fetchReleaseLocation } from "./utils/fetchReleaseLocation";

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
    const fetchApiData=async()=>{
      const prefectureId=await fetchPrefectureId("東京都",loadPrtmiesToken())
      const releases=await fetchRelease(prefectureId,loadPrtmiesToken())
      for (const key in releases) {
        const releaseLocation=await fetchReleaseLocation(releases[key]["company_id"],releases[key]["release_id"],loadPrtmiesToken())
        console.log(releaseLocation)
      }
    }
    fetchApiData()
    setLoading(false)
  },[])

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
