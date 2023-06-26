import { useEffect, useState } from "react";

import { SWIGGY_MENU_API_URL } from "../constants";
import React from "react";

type CardType = {
  card: {
    info: {
      id: string;
      name: string;
      price: number;
      description: string;
      imageId: string;
    };
  };
};
export const dynamic = "force-static";

const UseFetch = (resId: string) => {
  const [data, setData] = React.useState<CardType[]>([]);
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (resId) {
      const fetchData = async () => {
        setData([]);
        setError(null);
        setLoading(true);
        try {
          const resData = await fetch(SWIGGY_MENU_API_URL + resId);
          if (!resData.ok) {
            throw new Error();
          }
          const data = await resData.json();
          console.log(data);
          const Data: CardType[] =
            data.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
              ?.card?.card?.itemCards;
          setData(Data);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [resId]);

  return { data, loading, error };
};
export default UseFetch;
