import * as React from 'react';
import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import { loadMapboxToken } from '../utils/loadToken';
import mapboxgl from 'mapbox-gl';
import { geocoding } from '../utils/geocoding';
import { MarkerWrap } from './MarkerWrap';

export function MapContainer({ latitude, longitude, releases }) {
    const markerRef = useRef<mapboxgl.Marker>();
    const [popups, setPopups] = useState<any>();
    console.log(latitude);
    console.log(longitude);
    useEffect(() => {
        const fetchPopups = async () => {
            const releasePopups = await Promise.all(releases.map(async ([key, item]) => {
                const [marker_longitude, marker_latitude] = await geocoding(key, loadMapboxToken());
                console.log(marker_latitude);
                return ({
                    longitude: marker_longitude,
                    latitude: marker_latitude,
                    popup: new mapboxgl.Popup().setHTML(`<h2><a target="_blank" href=${item[0].url}>${item[0].title}</a></h2><p>${item[0].body.slice(0, 50)}...`),
                })
            }));
            if (!popups) {
                setPopups(releasePopups);
            }
        }
        fetchPopups();

        return (() => {
            setPopups(undefined);
        })
    }, []);
    const popup = useMemo(() => {
        return new mapboxgl.Popup().setHTML('<h3>Popup</h3>');
    }, []);

    const togglePopup = useCallback(() => {
        markerRef.current?.togglePopup();
    }, []);

    const markers = popups?.map(release => {
        return <MarkerWrap 
            longitude={release.longitude} 
            latitude={release.latitude} 
            popup={release.popup}
        />
    });
    
    return (
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
            {markers}
            <Marker longitude={137.1669836} latitude={34.9261186} popup={popup} ref={markerRef} onClick={togglePopup} />
        </Map>
    );
}
