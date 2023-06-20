"use client";
import React from "react";
import { ITEM_IMG_CDN_URL } from "../../../../constants";
import Image from "next/image";
import UseFetch from "@/app/Hooks/UseRestaurant";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

type Props = {
  params: {
    resId: string;
  };
};

const Page = ({ params }: Props) => {
  const { resId } = params;

  const { data, loading, error } = UseFetch(resId);

  return (
    <>
      <section className={montserrat.className}>
        {error && <h1 className="text-center">{error.message}</h1>}

        <section className="flex justify-center">
          <ul className="w-[700px]">
            <h1 className="text-center">{data ? "Menu" : null}</h1>
            {loading && <h1 className="text-center">Loading</h1>}
            {!error &&
              data?.map((item) => (
                <>
                  <li key={item.card.info.id}>
                    <section className="flex justify-between items-center border-b-2 border-gray-500 p-4">
                      <section
                        className="flex flex-col gap-1 justify-start p-2 w-[60%]
                      "
                      >
                        <h3 className="font-bold">{item.card.info.name}</h3>
                        <p className="text-xs font-semibold">
                          {item.card.info.price}
                        </p>
                        <p className="text-xs text-gray-500">
                          {" "}
                          {item.card.info.description}
                        </p>
                      </section>
                      <section className="flex flex-col justify-center items-center gap-2 ">
                        <Image
                          alt={item.card.info.name}
                          src={ITEM_IMG_CDN_URL + item.card.info.imageId}
                          width={100}
                          height={100}
                          className="rounded-md "
                        />
                        <button
                          className="p-2 bg-blue-500 rounded-sm text-white"
                          onClick={() => {}}
                        >
                          Add+
                        </button>
                      </section>
                    </section>
                  </li>
                </>
              ))}
          </ul>
        </section>
      </section>
    </>
  );
};

export default Page;
