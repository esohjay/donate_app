import { useState, useEffect } from "react";
import { useGetItemsQuery } from "../../api/items";
import { GeoJSONFeature } from "../../type";

function Wanted() {
  const { currentData } = useGetItemsQuery();
  const [wantedItems, setWantedItems] = useState<GeoJSONFeature[]>();
  useEffect(() => {
    let items = currentData?.features?.filter(
      (item) => item.properties.transaction_type === "Request"
    );
    setWantedItems(items);
  }, [currentData]);
  return (
    <section className="space-y-3">
      {wantedItems && wantedItems.length > 0 ? (
        wantedItems?.map((item) => (
          <article
            key={item.id}
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
        ))
      ) : (
        <div></div>
      )}
    </section>
  );
}

export default Wanted;
