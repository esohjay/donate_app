import { useRef } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { selectViewState } from "../features/app/appSlice";
import { useAppSelector } from "../app/hooks";
import { FaSearchLocation, FaLocationArrow } from "react-icons/fa";
// import useMap from "../hooks/useMap";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
// // let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow
// });
// L.Marker.prototype.options.icon = DefaultIcon;

function Home() {
  const view = useAppSelector(selectViewState);
  // const mapContainer = useRef<HTMLDivElement>(null!);
  // const map = useMap(mapContainer.current);

  return (
    <section className=" bg-heroBg bg-no-repeat bg-center bg-cover">
      <section
        className="min-h-screen px-5 gap-5 md:gap-10 py-10 flex flex-col bg-black bg-opacity-25 backdrop-blur-sm
    md:flex-row items-center  md:px-10"
      >
        <article className="h-[480px] w-full">
          <div className="h-4/6 md:h-5/6">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <article className="flex justify-center md:py-2 flex-col md:flex-row h-2/6 md:h-1/6 mt-2 md:mt-5 px-10 gap-3 md:gap-5">
            <button
              className="bg-mainColor text-white text-sm md:text-lg rounded-md px-5 py-3 font-semibold
          inline-block md:w-1/3 hover:bg-altColor duration-500 transition-all"
            >
              Locate me
            </button>
            <div className="flex gap-x-3  md:w-2/3">
              <span
                className="bg-white flex justify-between items-center w-full p-2
            rounded-md"
              >
                <input
                  type="text"
                  placeholder="Search address"
                  className="block p-2 border-none rounded-md  md:w-11/1 focus:outline-none text-mainColor text-base
            "
                />
                <button
                  className="bg-transparent md:w-1/1 text-mainColor text-base md:text-xl rounded-full p-2 font-semibold
              absolut right- border border-mainColor"
                >
                  <FaSearchLocation />
                </button>
              </span>
            </div>
          </article>
        </article>
        <article className="w-full max-w-md ">
          {/* <p>share with your padi</p> */}
          {view ? <Login /> : <SignUp />}
        </article>
      </section>
    </section>
  );
}

export default Home;
