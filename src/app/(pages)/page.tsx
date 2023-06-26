"use client";
import { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SWIGGY_API_URL } from "../../constants";
import Shimmer from "@/app/component/Shimmer";
import RestaurantCard from "@/app/component/RestaurantCard";
import ErrorComponent from "@/app/component/Error";
import CrousalComponent from "../component/CrousalComponent";

export type restaurantType = {
  type: string;
  data: {
    id: string;
    name: string;

    city: string;
    area: string;
    totalRatingsString: string;
    cloudinaryImageId: string;
    cuisines: string[];
    tags: any[];
    costForTwo: number;
    costForTwoString: string;
    deliveryTime: number;
    minDeliveryTime: number;
    maxDeliveryTime: number;
    slaString: string;
    lastMileTravel: number;
    slugs: {
      restaurant: string;
      city: string;
    };
    cityState: string;
    address: string;
    locality: string;
    veg: boolean;
    lastMileTravelString: string;

    sla: {
      restaurantId: string;
      deliveryTime: number;
      minDeliveryTime: number;
      maxDeliveryTime: number;
      lastMileTravel: number;
      lastMileDistance: number;
    };

    avgRating: string;
    totalRatings: number;
  };
};
export type restaurantListType = Array<restaurantType>;
export interface CrousalType {
  data: {
    creativeId: string;
    bannerId: number;
    title: string;
  };
}

export const dynamic = "force-static";

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState<restaurantListType>([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState<restaurantListType>([]);
  const [crousalData, setCrousalData] = useState<CrousalType[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(SWIGGY_API_URL);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Data not found");
      } else if (res.status === 400) {
        throw new Error("invalid Request");
      } else if (res.status === 500) {
        throw new Error("Internal Server Error");
      }
      const data = await res.json();
      console.log(data);
      setRestaurants(data.data.cards[2]["data"]["data"]["cards"]);
      setFilteredRestaurants(data.data.cards[2]["data"]["data"]["cards"]);
      setCrousalData(data.data.cards[0].data.data.cards);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleOnSearch = (
    searchText: string,
    restaurants: restaurantListType
  ) => {
    if (searchText !== "") {
      const filterData: restaurantListType = restaurants.filter((restaurant) =>
        restaurant.data.name.toLowerCase().includes(searchText.toLowerCase())
      );

      setErrorMsg("");
      setFilteredRestaurants(filterData);
      if (filterData.length === 0) {
        setErrorMsg("Match not found");
      }
    } else {
      setErrorMsg("");
      setFilteredRestaurants(restaurants);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!restaurants) {
    return null;
  }

  return (
    <>
      <section className="flex justify-center items-center mt-9 mb-9  ">
        <input
          type="text"
          placeholder="Search for restaurant..."
          className="p-2 rounded-l-md border border-slate-800 w-[40%] outline-none text-sm box-border shadow-custom"
          value={searchText}
          onChange={handleOnChange}
        />
        <button
          onClick={() => handleOnSearch(searchText, restaurants)}
          className="rounded-r-md bg-blue-500 text-white p-2  ml-[-5px] hover:bg-green-800 border-none outline-none  shadow-custom "
        >
          Search
        </button>
      </section>
      <CrousalComponent data={crousalData} />
      {errorMsg && <p className="text-center">{errorMsg}</p>}
      {error && <ErrorComponent error={error} />}
      {restaurants.length === 0 && !error ? (
        <Shimmer />
      ) : (
        <section className="flex justify-center flex-wrap gap-5 ">
          {filteredRestaurants.map((restaurant) => (
            <Link
              href={`/restaurant/${restaurant.data.id}`}
              key={restaurant.data.id}
            >
              <RestaurantCard {...restaurant.data} />
            </Link>
          ))}
        </section>
      )}
    </>
  );
};
export default Home;
//
