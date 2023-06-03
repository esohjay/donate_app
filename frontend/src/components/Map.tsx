import React, { useEffect, useRef } from "react";
import L, { LatLngExpression } from "leaflet";
import { GeoJSONFeature, GeoJSONFeatureCollection } from "../type";
import icon from "../assets/location-pin-svgrepo-com.svg";

interface MapProps {
  center: LatLngExpression;
  zoom: number;
  geojsonData: GeoJSONFeature | GeoJSONFeatureCollection;
}

const Map: React.FC<MapProps> = ({ center, zoom, geojsonData }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    mapRef.current = L.map("map", {
      center,
      zoom,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data &copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);
    if (mapRef.current && geojsonData.type === "Feature") {
      const latLng = L.latLng(
        geojsonData.geometry.coordinates[1],
        geojsonData.geometry.coordinates[0]
      );
      console.log(latLng);
      // L.marker(latLng).addTo(mapRef?.current as L.Map);

      const customIcon = L.icon({
        iconUrl: icon, // Replace with the correct path to your marker icon image
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      L.marker(latLng, { icon: customIcon }).addTo(mapRef.current!);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [center, zoom, geojsonData]);

  const calculateDistance = (
    latLng1: L.LatLngExpression,
    latLng2: L.LatLngExpression
  ): number => {
    return mapRef.current?.distance(latLng1, latLng2) || 0;
  };

  const addMarker = (latLng: L.LatLngExpression): void => {
    L.marker(latLng).addTo(mapRef.current as L.Map);
  };

  return (
    <div id="map" style={{ height: "400px" }}>
      <button
        onClick={() => calculateDistance([51.5, -0.09], [51.51, -0.1])}
        className="bg-mainColor text-white p-9 z-50 relative"
      >
        Calculate Distance
      </button>

      <button onClick={() => addMarker([51.5, -0.09])}>Add Marker</button>
    </div>
  );
};

export default Map;
