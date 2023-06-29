import { CartItem } from "@/GlobalRedux/features";
import { User } from "firebase/auth";

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

export const getUserfromLocalStorage = () => {
  const user: User = JSON.parse(localStorage.getItem("user") ?? "{}");
  return user;
};

export const login = () => {
  console.log("user logged in");
};
export const logout = () => {
  console.log("user logged out");
};
