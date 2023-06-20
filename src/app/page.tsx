"use client";
import { NextPage } from "next";
import { restaurantList } from "../../constants";
import { useState, useEffect } from "react";
import RestaurantCard from "./component/RestaurantCard";
import Link from "next/link";
import axios from "axios";
import { SWIGGY_API_URL } from "../../constants";

type restaurantType = {
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
type restaurantListType = Array<restaurantType>;

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState<restaurantListType>([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState<restaurantListType>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(SWIGGY_API_URL);

      setRestaurants(data.data.cards[2]["data"]["data"]["cards"]);
      setFilteredRestaurants(data.data.cards[2]["data"]["data"]["cards"]);
    } catch (e) {}
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onchnage event ");
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
      console.log(filterData);
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
      <section className="flex justify-center items-center mt-9 ">
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
      {errorMsg && <p className="text-center">{errorMsg}</p>}
      {restaurants.length === 0 ? (
        <h1 className="text-center">Loading</h1>
      ) : (
        <section className="flex justify-center flex-wrap gap-5 ">
          {filteredRestaurants.map((restaurant) => (
            <>
              <Link
                href={`/restaurant/${restaurant.data.id}`}
                key={restaurant.data.id}
              >
                <RestaurantCard {...restaurant.data} />
              </Link>
            </>
          ))}
        </section>
      )}
    </>
  );
};
export default Home;
//
