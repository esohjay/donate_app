import * as L from "leaflet";
function useMap(element: HTMLDivElement) {
  const map = new L.Map(element).setView([51.505, -0.09], 13);
  return map;
}

export default useMap;
