"use client";
import Link from "next/link";
import React from "react";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { NextPage } from "next";

const Login: NextPage = () => {
  const router = useRouter();

  const handlelogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/");
  };
  return (
    <section className=" flex justify-center items-center flex-col  mt-5 min-w-[400px]">
      <h1 className="font-bold text-3xl mb-2">Login</h1>
      <div className="bg-blue-500 p-4 rounded-[100%] ">
        <FaLock style={{ fontSize: "40px" }} />
      </div>

      <section className=" grid w-2/5 min-w-[400px] ">
        <form
          action=""
          onSubmit={handlelogin}
          className="grid gap-2  min-w-[400px]"
        >
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            className="p-2 border border-gray-600 rounded"
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            className="p-2 border border-gray-600 rounded "
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            autoComplete="off"
            required
          />
          <button
            className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md mt-2"
            type="submit"
          >
            LOGIN
          </button>
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            Don<span>&apos;</span>t have an account?
            <Link href="/sign-up" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </section>
    </section>
  );
};

export default Login;
