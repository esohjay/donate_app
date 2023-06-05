import { useState, useEffect } from "react";
import { useGetItemsQuery } from "../../api/items";
import { useGetSingleUserQuery } from "../../api/auth";
import { GeoJSONFeature } from "../../type";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Map from "../../components/Map";
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
  return (
    <section>
      {currentData && user && (
        <article>
          {freeItems && freeItems.length > 0 ? (
            <article className="flex flex-col">
              <button
                onClick={() => setMapView(!mapView)}
                className={`inline-block self-end rounded px-6 pt-2.5 pb-2 text-xs  font-medium uppercase leading-normal hover:bg-lightGreen hover:text-mainColor shadow-[0_4px_6px_-4px_#334B11] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:bg-altColor focus:text-white focus:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:outline-none focus:ring-0 active:bg-altColor active:text-white active:shadow-[0_8px_9px_-4prgba(51, 75, 17,0.3)x_,0_4px_18px_0_rgba(51, 75, 17,0.2)] 
     bg-mainColor text-white `}
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
                      <p className="text-sm line-clamp-1 first-letter:uppercase">
                        {item.properties.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        Description of what you are sharing
                      </p>

                      <span className="flex items-center justify-start text-gray-500">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        stackdiary.com
                      </span>
                    </div>
                  </article>
                ))}
              </article>
              <article className={`${!mapView ? "hidden" : "block"}`}>
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
          ) : (
            <div></div>
          )}
        </article>
      )}
    </section>
  );
}

export default Free;
