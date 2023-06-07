import {
  selectCoordinates,
  setWktCoordinates,
  setMapCenter,
  setLocationSelectStatus,
} from "../features/authSlice";
import { VscChromeClose } from "react-icons/vsc";

import {
  setAddressModalView,
  selectAddressModalView,
} from "../features/appSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

function AddressModal() {
  const coords = useAppSelector(selectCoordinates);
  const modal = useAppSelector(selectAddressModalView);
  const dispatch = useAppDispatch();
  const handleLocationSelect = (lat: number, lon: number) => {
    dispatch(setWktCoordinates(`POINT(${lon} ${lat})`));
    dispatch(setAddressModalView(false));
    dispatch(setMapCenter([lat, lon]));
    console.log(lon, lat);
    dispatch(setLocationSelectStatus(true));
  };

  return (
    <section
      className={` fixed top-0 w-full z-[53] h-screen  px-5 md:px-16 bg-black  bg-opacity-50 backdrop-blur-sm backdrop-filter
${modal ? "grid" : "hidden"} place-items-center`}
    >
      <article className="bg-white w-full scrollbar  max-w-2xl  mx-auto rounded-md relative  max-h-full h-4/6">
        <button
          onClick={() => dispatch(setAddressModalView(false))}
          className="block p-3 rounded-full text-lg text-red-500 md:text-2xl hover:bg-hoverColor"
        >
          <VscChromeClose />
        </button>
        {coords && coords.length > 0 ? (
          <ul className="w-full bg-white p-2 h-full scrollbar overflow-y-scroll">
            {coords?.map((addressProperties) => (
              <li
                key={addressProperties.placeId}
                className="p-2  border-b hover:bg-mainColor hover:text-white cursor-pointer mb-2"
                onClick={() =>
                  handleLocationSelect(
                    addressProperties.latitude,
                    addressProperties.longitude
                  )
                }
              >
                {addressProperties.address}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center font-semibold text-mainColor p-4">
            Address not found. Kindly insert your full address and try again.
          </p>
        )}
      </article>
    </section>
  );
}

export default AddressModal;
