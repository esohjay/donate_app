import React from "react";
import { useGetItemsQuery } from "../../api/items";

function Free() {
  const { currentData } = useGetItemsQuery();
  console.log(currentData);
  return (
    <section className="space-y-3">
      {currentData?.features && currentData?.features?.length > 1 ? (
        currentData?.features?.map((item) => (
          <article
            key={item.id}
            className="w-full h-[110px] w-full rounded-md grid grid-cols-[1fr_2.5fr]"
          >
            <figure className="bg-white w-full h-full rounded-l-md">
              <img
                src="https://cdn.pixabay.com/photo/2017/06/02/18/44/ice-2367072_1280.jpg"
                alt="item"
                className="h-full w-full max-h-full object-fill max-w-full block relative rounded-l-md"
              />
            </figure>
            <div className="p3">
              <h3>{item.properties.name}</h3>
            </div>
          </article>
        ))
      ) : (
        <div></div>
      )}
    </section>
  );
}

export default Free;
