import { Providers } from "@/GlobalRedux";
import { CheckUserLogInProvider } from "@/GlobalRedux/Providers";
import CartComponent from "@/app/component/CartComponent";
import { Metadata, NextPage } from "next";
import { Roboto_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Cart",
};

const Cart: NextPage = () => {
  return (
    <CheckUserLogInProvider>
      <CartComponent />;
    </CheckUserLogInProvider>
  );
};

export default Cart;
