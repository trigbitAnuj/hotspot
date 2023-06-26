import React from "react";
import { CrousalType } from "../(pages)/page";

import { CROUSAL_CDN_URL } from "../../constants";
import Image from "next/image";
type PropsType = {
  data: CrousalType[];
};

const CrousalComponent: React.FC<PropsType> = ({ data }) => {
  const handleOnClickLeft = () => {
    const box = document.querySelector("#box");
    if (box !== null) {
      box.scrollLeft -= 270;
    }
  };
  const handleOnClickRight = () => {
    const box = document.querySelector("#box");
    if (box !== null) {
      box.scrollLeft += 270;
    }
  };
  return (
    <section className="flex justify-center items-center bg-slate-500 ">
      <button
        onClick={handleOnClickLeft}
        className=" text-black bg-white px-2 py-2   rounded-full "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>

      <div className="w-[75%] h-60  p-2 relative overflow-hidden ">
        <section
          className="flex  w-full  absolute [&::-webkit-scrollbar]:hidden   gap-4  py-2  overflow-x-auto scroll-smooth "
          id="box"
        >
          {data.map((card) => (
            <Image
              key={card.data.bannerId}
              alt={card.data.title}
              src={CROUSAL_CDN_URL + card.data.creativeId}
              width={180}
              height={180}
              className="rounded-sm"
            />
          ))}
        </section>
      </div>

      <button
        onClick={handleOnClickRight}
        className="ml-2 text-black bg-white px-2 py-2  rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </section>
  );
};

export default CrousalComponent;
