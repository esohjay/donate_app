import SignUp from "../../components/SignUp";
import SignUpAlt from "../../components/SignUpAlt";
import AddressModal from "../../components/AddressModal";
import { selectViewState } from "../../features/appSlice";
import { useAppSelector } from "../../app/hooks";

import Address from "../../components/Address";

function Register() {
  const view = useAppSelector(selectViewState);
  return (
    <section className=" bg-heroBg bg-no-repeat bg-center bg-cover">
      <section
        className="min-h-screen px-5 gap-5 md:gap-10 py-10 flex flex-col bg-black bg-opacity-25 backdrop-blur-sm
    md:flex-row items-center  md:px-10"
      >
        {/* <article className="h-[480px] w-full">
          <Map
            center={[51.505, -0.09]}
            zoom={7}
            geojsonData={{
              type: "Feature",
              id: "",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [51.505, -0.09],
              },
            }}
            allowCoordSelection={true}
          />
          <article className="flex justify-center md:py-2 flex-col md:flex-row h-2/6 md:h-1/6 mt-2 md:mt-5 px-10 gap-3 md:gap-5">
            <button
              onClick={() => getPosition()}
              className="bg-mainColor text-white text-sm md:text-lg rounded-md px-5 py-3 font-semibold
          inline-block md:w-1/3 hover:bg-altColor duration-500 transition-all"
            >
              <span className="flex gap-2 w-full justify-center items-center">
                <p>Use current location</p> <HiOutlineLocationMarker />
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
        </article> */}
        <Address />
        <article className="w-full max-w-md ">
          {/* <p>share with your padi</p> */}
          {view === "password-signup" ? <SignUp /> : <SignUpAlt />}
        </article>
      </section>
      <AddressModal />
    </section>
  );
}

export default Register;
