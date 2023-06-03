import React from "react";
import { useGetSingleItemQuery } from "../../api/items";
import { useParams } from "react-router-dom";
import Map from "../../components/Map";

function ItemDetails() {
  const { itemId } = useParams();
  const { currentData } = useGetSingleItemQuery(itemId);
  console.log(currentData);
  return (
    <section className="">
      <article className="">
        <figure className="w-full h-80 rounded-t-lg mb-5">
          <img
            // src="https://cdn.pixabay.com/photo/2023/05/21/11/54/deer-8008410_1280.jpg"
            src="https://cdn.pixabay.com/photo/2017/06/02/18/44/ice-2367072_1280.jpg"
            alt=""
            className="w-full h-full max-w-full max-h-full rounded-t-lg object-cover object-center"
          />
        </figure>
        <article>
          <div className="flex items-center gap-x-3 mb-7">
            <figure className="w-20 h-20 rounded-full">
              <img
                src="https://cdn.pixabay.com/photo/2023/05/21/11/54/deer-8008410_1280.jpg"
                // src="https://cdn.pixabay.com/photo/2017/06/02/18/44/ice-2367072_1280.jpg"
                alt=""
                className="w-full h-full max-w-full max-h-full rounded-full object-cover object-center"
              />
            </figure>
            <div>
              <p className="">
                {currentData?.properties?.user?.properties?.fname}{" "}
                {currentData?.properties?.transaction_type === "Offer"
                  ? " is giving away"
                  : " is looking for"}
              </p>
              <p className="font-semibold text-lg">
                {currentData?.properties?.name}
              </p>
              <p>Added 3 hours ago</p>
            </div>
          </div>
          <p className="mb-5">{currentData?.properties?.description}</p>
          <p className="mb-5">Pick up time: Anytime</p>
        </article>
      </article>
      {currentData && (
        <Map
          center={[
            currentData.geometry.coordinates[1],
            currentData.geometry.coordinates[0],
          ]}
          zoom={16}
          geojsonData={currentData}
        />
      )}
    </section>
  );
}

export default ItemDetails;
