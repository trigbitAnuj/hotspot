import { CheckUserLogInProvider } from "@/GlobalRedux/Providers";
import CartComponent from "@/components/CartComponent";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

const Cart: NextPage = () => {
  return (
    // <CheckUserLogInProvider>
    <CartComponent />
    // </CheckUserLogInProvider>
  );
};

export default Cart;
