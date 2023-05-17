import { useEffect } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import SignUpAlt from "../components/SignUpAlt";
import AddressModal from "../components/AddressModal";
import { selectViewState, setAddressModalView } from "../features/appSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { FaSearchLocation } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  getCoordinatesFromAddress,
  selectWktCoordinates,
  setWktCoordinates,
} from "../features/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGeolocated } from "react-geolocated";

// import useMap from "../hooks/useMap";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
// // let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow
// });
// L.Marker.prototype.options.icon = DefaultIcon;
interface Inputs {
  address: string;
}
function Home() {
  const view = useAppSelector(selectViewState);
  const { coords, getPosition } = useGeolocated({
    suppressLocationOnMount: true,
    isOptimisticGeolocationEnabled: false,
  });
  const coordinates = useAppSelector(selectWktCoordinates);
  const dispatch = useAppDispatch();
  // const mapContainer = useRef<HTMLDivElement>(null!);
  // const map = useMap(mapContainer.current);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(getCoordinatesFromAddress(data.address));
    dispatch(setAddressModalView(true));
  };
  useEffect(() => {
    if (coords) {
      dispatch(
        setWktCoordinates(`POINT(${coords.longitude} ${coords.latitude})`)
      );
    }
  }, [coords, dispatch]);
  console.log(coords);
  console.log(coordinates);
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
              onClick={() => getPosition()}
              className="bg-mainColor text-white text-sm md:text-lg rounded-md px-5 py-3 font-semibold
          inline-block md:w-1/3 hover:bg-altColor duration-500 transition-all"
            >
              <span className="flex gap-2 w-full justify-center items-center">
                <p>Locate me</p> <HiOutlineLocationMarker />
              </span>
            </button>
            <div className="flex gap-x-3  md:w-2/3 relative">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`bg-white flex justify-between items-center w-full p-2
            rounded-md  ${errors.address && " border-4 border-red-500"}`}
              >
                <input
                  type="text"
                  placeholder="Search address"
                  // onChange={(e) => setAddressText(e.target.value)}
                  {...register("address", { required: true })}
                  className={`block p-2 border-none rounded-md  md:w-full focus:bg-transparent focus:outline-none text-mainColor text-base
           `}
                />
                <button
                  className={`bg-transparent md:w-1/1 text-mainColor text-base md:text-xl rounded-full p-2 font-semibold
        absolut right- border border-mainColor`}
                >
                  <FaSearchLocation />
                </button>
              </form>
            </div>
          </article>
        </article>
        <article className="w-full max-w-md ">
          {/* <p>share with your padi</p> */}
          {view === "login" ? (
            <Login />
          ) : view === "password-signup" ? (
            <SignUp />
          ) : (
            <SignUpAlt />
          )}
        </article>
      </section>
      <AddressModal />
    </section>
  );
}

export default Home;
