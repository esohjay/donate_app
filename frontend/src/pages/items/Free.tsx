import React from "react";
import { useGetItemsQuery } from "../../api/items";

function Free() {
  const { currentData = [] } = useGetItemsQuery();
  return <div>Free</div>;
}

export default Free;
