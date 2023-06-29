import { CartItem } from "@/GlobalRedux/features";
import { UserType } from "./firebase/auth";
import { useEffect, useState } from "react";

interface User {
  user: {
    displayName: string | null;
    email: string;
  };
}

export function getcartItems(cartItems: CartItem[]) {
  return cartItems.reduce((count, cartItem) => {
    return count + cartItem.quantity;
  }, 0);
}

export const getSubTotal = (cart: CartItem[]) => {
  return cart.reduce((sum, { item, quantity }) => {
    return item.card.info.price * quantity + sum;
  }, 0);
};

export const GetUserfromLocalStorage = () => {
  const [user, setUser] = useState<User | null>(null);
  // if (typeof window !== "undefined") {
  //   const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  //   return user;
  // }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);
  return user;
};
