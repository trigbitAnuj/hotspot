import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const Title = () => {
  return (
    <Link href="/">
      <Image src="/logo.png" alt="app-logo" width={100} height={100} />
    </Link>
  );
};

const Header = () => {
  return (
    <header className="flex  justify-between  bg-[#1b1b1b] shadow-header">
      <Title />

      <section className=" flex px-10">
        <ul className="flex items-center gap-10 text-white text-lg">
          <li className="hover:text-blue-500 hover:underline">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 hover:underline">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-blue-500 hover:underline">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="hover:text-blue-500">
            <Link href="/cart">
              <FaShoppingCart />
            </Link>
          </li>
          <button className="px-3 py-2 border border-red-500  rounded-md shadow-md shadow-red-500/20 hover:bg-red-600 ">
            Login
          </button>
        </ul>
      </section>
    </header>
  );
};

export default Header;
