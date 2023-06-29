import { CartItem } from "@/GlobalRedux/features";
type User = {
  user: {
    displayName: string;
    email: string;
  };
};

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
