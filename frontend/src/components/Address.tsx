import { useEffect } from "react";
import AddressModal from "./AddressModal";

import { FaSearchLocation, FaRegArrowAltCircleRight } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  getCoordinatesFromAddress,
  selectWktCoordinates,
  setWktCoordinates,
  setMapCenter,
  setLocationSelectStatus,
} from "../features/authSlice";
import { selectMapCenter } from "../features/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGeolocated } from "react-geolocated";
import Map from "./Map";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setAddressModalView, changeView } from "../features/appSlice";

interface Inputs {
  address: string;
}
function Address() {
  const dispatch = useAppDispatch();
  const { coords, getPosition } = useGeolocated({
    suppressLocationOnMount: true,
    isOptimisticGeolocationEnabled: false,
  });
  const coordinates = useAppSelector(selectWktCoordinates);
  const center = useAppSelector(selectMapCenter);
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
        // The coordinates are stored in LongLat format because Geos which handles coordinates in backend uses longlat
        // same with leaflet.
        //But LatLng is the general standard
        setWktCoordinates(`POINT(${coords.longitude} ${coords.latitude})`)
      );
      dispatch(setMapCenter([coords.latitude, coords.longitude]));
      dispatch(setLocationSelectStatus(true));
    }
  }, [coords, dispatch]);
  console.log(coords);
  console.log(coordinates);
  return (
    <article className="w-full p-5 h-full flex flex-col lg:flex-row gap-x-5 lg:justify-center lg:items-center">
      <article className="w-full  h-3/5 mb-2 lg:mb-0  lg:w-1/2  lg:h-3/4 max-h-full">
        <Map
          center={center}
          zoom={7}
          geojsonData={{
            type: "Feature",
            id: "",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: center,
            },
          }}
          allowCoordSelection={true}
        />
      </article>
      <article className="w-full lg:w-1/2 h-3/5 lg:3/4 max-h-full ">
        <article className="h-full flex flex-col justify-center items-center">
          <button
            onClick={() => getPosition()}
            className="bg-mainColor text-white text-sm md:text-lg rounded-md px-5 py-3 font-semibold
          inline-block  hover:bg-altColor duration-500 transition-all mb-3"
          >
            <span className="flex gap-2 w-full justify-center items-center">
              <p>Use current location</p> <HiOutlineLocationMarker />
            </span>
          </button>
          <article className="flex items-center mb-3">
            <div className="w-12 h-[2px] bg-white"></div>
            <div className="border-2 border-white rounded-full">
              <p className="p-[6px] md:p-4 text-white text-base md:text-xl font-semibold">
                OR
              </p>
            </div>
            <div className="w-12 h-[2px] bg-white"></div>
          </article>
          <article className="flex gap-x-3  md:w-2/3 relative">
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
          </article>
          <button
            disabled={!coordinates}
            onClick={() => dispatch(changeView("password-signup"))}
            className="bg-mainColor text-white text-sm md:text-lg rounded-md px-5 py-3 font-semibold
          inline-block  hover:bg-altColor duration-500 transition-all mt-6 "
          >
            <span className="flex gap-2 w-full justify-center items-center">
              <p>Next</p> <FaRegArrowAltCircleRight />
            </span>
          </button>
        </article>
      </article>
      <AddressModal />
    </article>
  );
}

export default Address;
