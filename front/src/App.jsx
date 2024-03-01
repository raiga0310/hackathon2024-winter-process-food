import { useState, useEffect } from 'react'
import './App.css'
import Loading from './components/loading';
import { MapContainer } from './components/Map';
import { Releases } from './components/Releases';
import { loadMapboxToken } from './utils/loadToken';
import { fetchApiData } from './utils/getReleseAddres';
import { getPrefectureName } from './utils/getPrefectureName';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = loadMapboxToken();

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
      const releases = Object.entries(data);
        setReleases(releases);
        setLoading(false);
        console.log(pref);
      });
    }
  
    return () => {
      setLoading(true);
      setReleases();
    }
  }, [pref]);

  return (
    <>
      {loading ?(<Loading/>):(
        <>
          <h1>地元探検 × プレスリリース</h1>
          <div className="main">
            <div className="map">
              <h2 onClick={getCurrentPosition}>
                地元の{pref}のプレスリリースはこちら!
              </h2>
              <MapContainer latitude={position.latitude} longitude={position.longitude} releases={releases}/>
            </div>
            <Releases className="release" releases={releases} />
          </div>
        </>
      )}
    </>
  );
}

export default App
