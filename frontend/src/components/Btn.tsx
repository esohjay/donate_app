import React from "react";

type PropType = {
  size?: string;
  color?: number;
  text: string;
  onClick: (e: string) => void;
  path: string;
  // restProps?: Record<string, any>;
};

function Btn({ text, color, size, path, onClick }: PropType) {
  return (
    <button
      type="button"
      className={`inline-block rounded ${size}   font-medium uppercase leading-normal hover:bg-lightGreen hover:text-mainColor shadow-[0_4px_6px_-4px_#334B11] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:bg-altColor focus:text-white focus:shadow-[0_8px_9px_-4px_rgba(51, 75, 17,0.3),0_4px_18px_0_rgba(51, 75, 17,0.2)] focus:outline-none focus:ring-0 active:bg-altColor active:text-white active:shadow-[0_8px_9px_-4prgba(51, 75, 17,0.3)x_,0_4px_18px_0_rgba(51, 75, 17,0.2)] 
      ${color === 1 ? "bg-mainColor text-white " : "bg-white text-mainColor"}`}
      onClick={() => onClick(path)}
    >
      {text}
    </button>
  );
}

Btn.prototype = {
  size: "px-6 pt-2.5 pb-2 text-xs",
  color: 1,
};
export default Btn;
