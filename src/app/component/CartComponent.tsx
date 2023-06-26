"use client";
// import "../app/globals.css";
import React from "react";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import { ITEM_IMG_CDN_URL } from "../../constants";
import Link from "next/link";
import {
  CartItem,
  addToCart,
  clearCart,
  removeFromCart,
} from "@/GlobalRedux/features/cart-slice";
import { useDispatch } from "react-redux";
import { getSubTotal } from "../../utils";
import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});

const CartComponent: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { item, quantity }: CartItem
  ) => {
    const updatedQuantity = e.target.valueAsNumber;
    if (updatedQuantity < quantity) {
      dispatch(removeFromCart({ item, quantity: 1 }));
    } else {
      dispatch(addToCart({ item, quantity: 1 }));
    }
  };

  const DeleteCartItems = () => {
    dispatch(clearCart());
  };

  return (
    <section className="flex justify-center  flex-col">
      <h1
        className={roboto.className}
        style={{ fontSize: "40px", textAlign: "center" }}
      >
        Cart
      </h1>
      <section className="grid sm:grid-cols-[1fr_auto]  mx-[20px] max-w-4xl mt-10">
        <section className="items w-[60%]">
          {cartItems.length ? (
            cartItems.map(({ item, quantity }) => {
              const { description, id, imageId, name } = item?.card?.info;
              return (
                <section key={id} className="grid grid-cols-[200px_1fr_auto] ">
                  <section className="py-4 ">
                    <Image
                      className="rounded"
                      src={ITEM_IMG_CDN_URL + imageId}
                      alt={name}
                      width={150}
                      height={150}
                    />
                  </section>
                  <section className=" flex justify-between">
                    <section className="flex flex-col p-4">
                      <h1 className={roboto.className}>{name}</h1>
                      <p className="text-gray-400 line-clamp-3">
                        {description}
                      </p>

                      <label htmlFor="quantity">Quantity</label>
                      <input
                        className="border-2  w-[200px] "
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => {
                          handleQuantityChange(e, { item, quantity });
                        }}
                      />
                    </section>

                    <section className="py-4">
                      <h1 className={roboto.className}>Price</h1>
                      <p>
                        {getSubTotal([{ item, quantity }]) > 0
                          ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(getSubTotal([{ item, quantity }]) / 100)
                          : 0.0}
                      </p>
                    </section>
                  </section>
                </section>
              );
            })
          ) : (
            <section className="flex flex-col justify-center items-center">
              <Image
                src="/burger-image.png"
                alt="burger-image"
                width={150}
                height={150}
              />
              <h1 className="text-3xl text-center">
                Make me happy by Adding Item to cart
              </h1>
              <Link
                href="/"
                className="border-2  border-blue-400 p-2 rounded-md hover:bg-blue-400 hover:text-white"
              >
                Eat with Hotspot
              </Link>
            </section>
          )}
        </section>
        <section className="subtotal mr-7">
          <section className="flex flex-col justify-center items-center ">
            <h1 className="font-semibold text-2xl">SubTotal</h1>
            <p>
              {getSubTotal(cartItems) > 0
                ? new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(getSubTotal(cartItems) / 100)
                : (0.0).toFixed(1)}
            </p>
          </section>
          {cartItems.length > 0 ? (
            <section className="text-center mt-5">
              <button
                className="p-4 bg-red-400 hover:bg-red-500 text-white"
                onClick={DeleteCartItems}
              >
                Clear Cart
              </button>
            </section>
          ) : null}
        </section>
      </section>
    </section>
  );
};

export default CartComponent;
