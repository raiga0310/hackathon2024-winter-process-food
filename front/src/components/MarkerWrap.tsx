import React from "react";
import { useRef } from "react";
import { Marker } from "react-map-gl";

export function MarkerWrap({ longitude, latitude, popup }) {
    const markerRef = useRef<mapboxgl.Marker>();
    return <Marker
        longitude={longitude}
        latitude={latitude}
        popup={popup}
        ref={markerRef}
        onClick={() => markerRef.current?.togglePopup}
    />
}
