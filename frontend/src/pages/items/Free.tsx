import React from "react";
import { useGetItemsQuery } from "../../api/items";

function Free() {
  const { currentData = [] } = useGetItemsQuery();
  console.log(currentData);
  return <div>Free</div>;
}

export default Free;
