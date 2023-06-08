import { useState, useEffect } from "react";
import { useGetItemsQuery } from "../../api/items";
import { useGetSingleUserQuery } from "../../api/auth";
import { GeoJSONFeature } from "../../type";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Map from "../../components/Map";

import { HiOutlineLocationMarker, HiOutlineEye } from "react-icons/hi";
// import Btn from "../../components/Btn";

function Free() {
  const { user: authUser } = useAuth();
  const { currentData } = useGetItemsQuery();
  const { currentData: user } = useGetSingleUserQuery(authUser?.uid);
  const [freeItems, setFreeItems] = useState<GeoJSONFeature[]>();
  const [mapView, setMapView] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let offers = currentData?.features?.filter(
      (item) => item.properties.transaction_type === "Offer"
    );
    setFreeItems(offers);
  }, [currentData]);
  console.log(freeItems);
  return (
    <section>
      {currentData && user && (
        <article>
          {freeItems && freeItems.length > 0 ? (
            <article className="flex flex-col">
              <button
                onClick={() => setMapView(!mapView)}
                className={`inline-block self-end rounded px-6 pt-2.5 pb-2 text-xs  font-medium uppercase leading-normal hover:bg-lightGreen hover:text-mainColor shadow-[0_4px_6px_-4px_#334B11] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:bg-altColor focus:text-white focus:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:outline-none focus:ring-0 active:bg-altColor active:text-white active:shadow-[0_8px_9px_-4prgba(51, 75, 17,0.3)x_,0_4px_18px_0_rgba(51, 75, 17,0.2)] 
     bg-mainColor text-white mb-3`}
              >
                {mapView ? "list view" : "map view"}
              </button>
              <article className={`${mapView ? "hidden" : "block"} space-y-3`}>
                {freeItems?.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => navigate(`${item.id}`)}
                    className="flex bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start"
                  >
                    <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0">
                      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                        <img
                          alt=""
                          className="absolute left-0 top-0 w-full h-full max-h-full max-w-full object-cover object-center transition duration-50"
                          loading="lazy"
                          src="https://cdn.pixabay.com/photo/2017/06/02/18/44/ice-2367072_1280.jpg"
                        />
                      </div>
                    </div>

                    <div className="p-2">
                      <p className="text-lg font-medium line-clamp-1 first-letter:uppercase mb-2">
                        {item.properties.name}
                      </p>

                      <div className="flex items-center gap-x-2 mb-2">
                        <figure className="h-5 w-5 rounded-full">
                          <img
                            src="https://cdn.pixabay.com/photo/2017/06/02/18/44/ice-2367072_1280.jpg"
                            alt=""
                            className="h-full w-full max-h-full max-w-full rounded-full"
                          />
                        </figure>
                        <p className="text-sm font-medium">
                          {item.properties.user.properties.fname}
                        </p>
                      </div>

                      <div className="flex items-center gap-x-2">
                        <span className="flex items-center gap-x-[2px]">
                          <button>
                            <HiOutlineLocationMarker />
                          </button>
                          <p>
                            {parseFloat(item.properties.distance).toFixed(2)}km
                          </p>
                        </span>
                        <span className="flex items-center gap-x-[2px]">
                          <button>
                            <HiOutlineEye />
                          </button>
                          <p>1000</p>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </article>
              <article
                className={`${
                  !mapView ? "hidden" : "block"
                } w-full h-[480px] grid place-items-center`}
              >
                <article className="w-full lg:w-2/3 h-full">
                  <Map
                    center={[
                      user.geometry.coordinates[1],
                      user.geometry.coordinates[0],
                    ]}
                    zoom={10}
                    geojsonData={{
                      type: "FeatureCollection",
                      features: freeItems,
                    }}
                  />
                </article>
              </article>
            </article>
          ) : (
            <div></div>
          )}
        </article>
      )}
    </section>
  );
}

export default Free;
