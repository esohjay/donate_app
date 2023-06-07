import React, { useEffect, useRef, useState } from "react";
import L, { LatLngExpression } from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import {
  setWktCoordinates,
  selectWktCoordinates,
  selectLocationSelected,
  selectMapCenter,
} from "../features/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { GeoJSONFeature, GeoJSONFeatureCollection } from "../type";
import icon from "../assets/pin.svg";

interface MapProps {
  center: LatLngExpression;
  zoom: number;
  geojsonData: GeoJSONFeature | GeoJSONFeatureCollection;
  allowCoordSelection?: boolean;
}

const Map: React.FC<MapProps> = ({
  center,
  zoom,
  geojsonData,
  allowCoordSelection,
}) => {
  const [markerToRemove, setMarkerToRemove] = useState<L.Marker>();
  const mapRef = useRef<L.Map | null>(null);
  const markerClusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const dispatch = useAppDispatch();
  const wkt = useAppSelector(selectWktCoordinates);
  const locationSelected = useAppSelector(selectLocationSelected);
  const mapCenter = useAppSelector(selectMapCenter);

  useEffect(() => {
    mapRef.current = L.map("map", {
      center,
      zoom,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data &copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    markerClusterGroupRef.current = L.markerClusterGroup({
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false,
    }).addTo(mapRef.current!);

    // if (mapRef.current && geojsonData.type === "Feature") {
    //   const latLng = L.latLng(
    //     geojsonData.geometry.coordinates[1],
    //     geojsonData.geometry.coordinates[0]
    //   );

    //   const customIcon = L.icon({
    //     iconUrl: icon, // Replace with the correct path to your marker icon image
    //     iconSize: [50, 81],
    //     iconAnchor: [12, 41],
    //     popupAnchor: [1, -34],
    //   });

    //   L.marker(latLng, { icon: customIcon }).addTo(mapRef.current!);
    // } else if (mapRef.current && geojsonData.type === "FeatureCollection") {
    //   console.log(geojsonData.features.length);
    //   L.geoJSON(geojsonData, {
    //     onEachFeature: (feature: GeoJSONFeature, layer) => {
    //       const latLng = L.latLng(
    //         feature.geometry.coordinates[1],
    //         feature.geometry.coordinates[0]
    //       );

    //       const customIcon = L.icon({
    //         iconUrl: icon, // Replace with the correct path to your marker icon image
    //         iconSize: [50, 81],
    //         iconAnchor: [12, 41],
    //         popupAnchor: [1, -34],
    //       });

    //       L.marker(latLng, { icon: customIcon }).addTo(mapRef.current!);
    //     },
    //   });
    // }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [center, zoom]);

  useEffect(() => {
    const customIcon = L.icon({
      iconUrl: icon, // Replace with the correct path to your marker icon image
      iconSize: [50, 81],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    if (
      mapRef.current &&
      geojsonData.type === "Feature" &&
      !allowCoordSelection
    ) {
      const latLng = L.latLng(
        geojsonData.geometry.coordinates[1],
        geojsonData.geometry.coordinates[0]
      );

      L.marker(latLng, { icon: customIcon }).addTo(mapRef.current!);
    } else if (
      mapRef.current &&
      geojsonData.type === "FeatureCollection" &&
      markerClusterGroupRef.current
    ) {
      markerClusterGroupRef.current.clearLayers();

      // Create markers and bind popup with feature count for each cluster
      //   const markers: L.Marker[] = [];
      markersRef.current = [];
      geojsonData.features.forEach((feature: GeoJSONFeature) => {
        const latLng = L.latLng(
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0]
        );
        const marker = L.marker(latLng, { icon: customIcon }).bindPopup(
          `<p>${feature.properties.name}</p>`
        );
        markersRef.current.push(marker);
      });

      const cluster = new L.MarkerClusterGroup();
      cluster.addLayers(markersRef.current);

      markerClusterGroupRef.current!.addLayer(cluster);
    }
  }, [geojsonData, allowCoordSelection]);

  useEffect(() => {
    const handleMapClick = (event: L.LeafletMouseEvent) => {
      if (markerToRemove) {
        markerToRemove.removeFrom(mapRef.current!);
      }
      const customIcon = L.icon({
        iconUrl: icon, // Replace with the correct path to your marker icon image
        iconSize: [30, 61],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const { lat, lng } = event.latlng;
      mapRef.current!.setView([lat, lng], 12);
      const marker = L.marker(event.latlng, { icon: customIcon });
      setMarkerToRemove(marker);
      marker.addTo(mapRef.current!);
      dispatch(
        setWktCoordinates(`POINT(${event.latlng.lng} ${event.latlng.lat})`)
      );
    };

    if (mapRef.current && allowCoordSelection) {
      mapRef.current.on("click", handleMapClick);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off("click", handleMapClick);
      }
    };
  }, [allowCoordSelection, dispatch, wkt, markerToRemove]);

  useEffect(() => {
    if (allowCoordSelection && locationSelected) {
      if (markerToRemove) {
        markerToRemove.removeFrom(mapRef.current!);
      }
      const customIcon = L.icon({
        iconUrl: icon, // Replace with the correct path to your marker icon image
        iconSize: [30, 61],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      mapRef.current!.setView(mapCenter, 12);
      const marker = L.marker(mapCenter, { icon: customIcon });
      setMarkerToRemove(marker);
      marker.addTo(mapRef.current!);
    }
  }, [locationSelected, mapCenter, allowCoordSelection]);

  return <div id="map" style={{ height: "400px" }}></div>;
};

export default Map;
