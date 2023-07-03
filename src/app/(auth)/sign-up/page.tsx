"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { UseAuthProvider } from "@/firebase/auth";
import ErrorComponent from "@/app/component/Error";

const SignUp = () => {
  const router = useRouter();
  const { signUp } = UseAuthProvider();
  const [error, setError] = useState<Error | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const displayName = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await signUp(email, password, displayName);
      router.push("/login");
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    }
  };
  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <section className=" flex justify-center items-center flex-col  mt-5 min-w-[400px]">
      <h1 className="font-bold text-3xl mb-2">Signup</h1>
      <div className="bg-blue-500 p-4 rounded-[100%] ">
        <FaLock style={{ fontSize: "40px" }} />
      </div>

      <section className=" grid w-2/5 min-w-[400px] ">
        <form
          action=""
          onSubmit={(e) => handleSignup(e)}
          className="grid gap-2 min-w-[400px]"
        >
          <label htmlFor="email" className="font-semibold">
            Username
          </label>
          <input
            className="p-2 border border-gray-600 rounded"
            type="text"
            name="username"
            id="text"
            placeholder="Enter Username"
            autoComplete="off"
            required
          />
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
            SIGNUP
          </button>
          <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
            Already registered?
            <Link href="/login" className="text-blue-500">
              login
            </Link>
          </p>
        </form>
      </section>
    </section>
  );
};

export default SignUp;
