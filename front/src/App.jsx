import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loading from "./components/loading";

function App() {
  const [count, setCount] = useState(0);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
    const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
    });
  };

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchApiData=async()=>{
      //APIに接続する非同期関数はawaitをつけてここに定義する。
      
      setLoading(false)
    }
    fetchApiData()
  }, [])

  return (
    <>
      {loading ?(<Loading/>):(
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
        </>
      )}
    </>
  )
}

export default App
