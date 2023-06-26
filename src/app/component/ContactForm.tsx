"use client";
// import "../app/globals.css";
import React from "react";
import Image from "next/image";

type UserType = {
  fullName: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const [user, setUser] = React.useState<UserType>({
    fullName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = React.useState<"success" | "failed" | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("api/contact", {
        method: "POST",

        body: JSON.stringify({
          full: user.fullName,
          email: user.email,
          message: user.message,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setUser({
          fullName: "",
          email: "",
          message: "",
        });
        setStatus("success");
      } else {
        setStatus("failed");
      }
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  return (
    <section className="flex justify-center mt-4 gap-2">
      <section className="left">
        <Image
          src={"/Contact-Us.png"}
          alt="contact-img"
          width={350}
          height={350}
        />
      </section>
      <section className=" flex  flex-col items-center ml-8  ">
        <h1
          className="text-3xl font-bold text-[#98a7ff] "
          style={{ fontFamily: "PT Sans, Lato, Calibri, sans-serif" }}
        >
          Contact
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2  items-center p-3 "
        >
          <input
            required
            type="text"
            name="fullName"
            placeholder="Full Name"
            id="FullName"
            value={user.fullName}
            onChange={handleChange}
            className="border border-[#98a7ff] p-2 m-2 w-[30vw]  rounded-md shadow-md shadow-[#98a7ff]/50"
          />

          <input
            required
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder=" Enter email"
            className="border border-[#98a7ff] p-2 m-2 w-[30vw]  rounded-md shadow-md shadow-[#98a7ff]/50"
          />

          <textarea
            required
            cols={5}
            rows={5}
            minLength={5}
            name="message"
            value={user.message}
            onChange={handleChange}
            placeholder="Enter message"
            className="border border-[#98a7ff] p-2  m-2 w-[30vw]   rounded-sm shadow-md shadow-[#98a7ff]/50"
          />
          {status && status === "success" && (
            <p>Thank you for Submitting your message</p>
          )}
          {status && status === "failed" && (
            <p>There is an error Submitting your message</p>
          )}
          <button
            type="submit"
            className="p-2 border border-[#98a7ff] text-[#98a7ff] bg-[#FAF9F6] rounded-md hover:bg-[#98a7ff] shadow-md shadow-[#98a7ff]/50 hover:text-white"
          >
            Submit
          </button>
        </form>
      </section>
    </section>
  );
};

export default ContactForm;
