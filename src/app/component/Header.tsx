// import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RootState } from "../../GlobalRedux/store";
import { useSelector } from "react-redux";
import { getcartItems } from "@/utils";
import { useRouter } from "next/navigation";

const Title: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="app-logo"
        width={100}
        height={100}
        className="xs:hidden"
      />
    </Link>
  );
};

const Header = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.value);
  const cartItemsLength = getcartItems(cartItems);

  const login = () => {
    router.push("/login");
  };

  return (
    <header className="flex  justify-between  bg-[#1b1b1b] shadow-header min-w-[420px] sm:py-2">
      <Title />

      <section className=" flex px-10 ">
        <ul className="flex items-center gap-10 text-white lg:text-lg md:text-base sm:text-sm xs:text-xs ">
          <li className="hover:text-blue-500 hover:underline active:underline ">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 hover:underline active:text-blue-500">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-blue-500 hover:underline active:underline">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="hover:text-blue-500 ">
            <Link href="/cart">
              <span className="relative inline-block">
                <FaShoppingCart className="sm:text-xs md:text-sm lg:text-lg" />
                <path
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
                {cartItemsLength > 0 ? (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cartItemsLength}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
          <button
            onClick={login}
            className="md:px-3 md:py-2 md:text-base border lg:px-3 lg:py-2 lg:text-lg border-red-500   rounded-md shadow-md shadow-red-500/20 hover:bg-red-600 sm:px-2 sm:py-2 sm:text-sm xs:px-1 xs:py-1 xs:text-xs "
          >
            Login
          </button>
        </ul>
      </section>
    </header>
  );
};

export default Header;
