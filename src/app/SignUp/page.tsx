"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 

function Page() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="h-auto lg:min-h-screen  lg:bg-gray-50 flex flex-col justify-center items-center">
        <div className="w-full lg:w-[1200px] bg-white h-auto p-16 mt-7">
          <h1 className="text-[30px] mb-4">Crete Account</h1>
          <h1 className="text-[30px] mb-4 font-bold">SignUp</h1>
          <form className="border border-gray-300 p-[20px] rounded-[4px]">
          <label className="text-[20px] text-gray-500 font-bold">
              Name:
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:ring-blue-600 mb-5 mt-5"
            />
            <label className="text-[20px] text-gray-500 font-bold">
              Email Address:
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:ring-blue-600 mb-5 mt-5"
            />
            <label className="text-[20px] text-gray-500 font-bold">
              Password:
            </label>
            <input
              type="password"
              className="w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:ring-blue-600 mb-5"
            />
            <label className="text-[20px] text-gray-500 font-bold ">Upload Image:</label>
                <input type="file" className="block w-full text-sm text-slate-500 mb-4 mt-2
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-red-500 file:text-white
      hover:file:bg-red-400
    "/>

            <div className="flex flex-col items-start gap-4 lg:items-center lg:flex-row  ">
              <Button className="bg-red-400 p-6 rounded-[40px] px-10 text-white font-bold hover:bg-red-300">
                SIGN UP
              </Button>
              <p
                className="underline text-red-600 hover:cursor-pointer hover:text-red-400"
                onClick={() => router.push("/login")}
              >
                Already have an account
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Page;
