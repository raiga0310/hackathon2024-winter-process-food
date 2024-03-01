import * as React from 'react';
import { useRef, useMemo, useCallback } from 'react';
import Map, { Marker } from 'react-map-gl';
import { loadMapboxToken } from '../utils/loadToken';
import mapboxgl from 'mapbox-gl';

export function MapContainer({ latitude, longitude }) {
    const markerRef = useRef<mapboxgl.Marker>();
    console.log(latitude);
    console.log(longitude);
    const popup = useMemo(() => {
        return new mapboxgl.Popup().setHTML('<h3>Popup</h3>');
    }, []);

    const togglePopup = useCallback(() => {
        markerRef.current?.togglePopup();
    }, []);
    
    return (
        <>
        <div className="sidebar"></div>
        <Map
            mapboxAccessToken={loadMapboxToken()}
            initialViewState={{
                longitude: longitude,
                latitude: latitude,
                zoom: 8.5
            }}
            style={{width: 720, height: 480}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker longitude={137.1669836} latitude={34.9261186} popup={popup} ref={markerRef} onClick={togglePopup} />
        </Map>
        </>
    );
}
