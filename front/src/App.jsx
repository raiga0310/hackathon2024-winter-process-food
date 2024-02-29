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
  const [pref, setPref] = useState("");
  const [releases, setReleases] = useState();
  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
  };
  useEffect(() => {
    getCurrentPosition();
  }, []);
  
  useEffect(() => {
    if (position.latitude !== null) {
      getPrefectureName(position, loadMapboxToken()).then((pref_name) => 
        setPref(pref_name)
      );
    }
  }, [position]); 
  
  useEffect(() => {
    if (pref !== "") {
      fetchApiData(pref).then((data) => {

      const releases = Object.values(data).flat().map((item, index) => ({
        id: index,
        ...item,
      }));
        setReleases(releases);
        setLoading(false);
      });
    }
  
    return () => {
      setLoading(true);
      setPref("");
      setReleases();
    }
  }, [pref]);

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
            <Releases releases={releases} />
          </div>
        </>
      )}
    </>
  );
}

export default App
