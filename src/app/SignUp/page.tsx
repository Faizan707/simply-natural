"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
function SignUp() {
  const router = useRouter();
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (image) {
        formDataToSend.append("image", image);
      }

      const response = await fetch("/api/signup", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Successful signup
      router.push("/login");
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-auto lg:min-h-screen lg:bg-gray-50 flex flex-col justify-center items-center">
        <div className="w-full lg:w-[1200px] bg-white h-auto p-16 mt-7">
          <h1 className="text-[30px] mb-4">Create Account</h1>
          <h1 className="text-[30px] mb-4 font-bold">SignUp</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="border border-gray-300 p-[20px] rounded-[4px]">
            <label className="text-[20px] text-gray-500 font-bold">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:ring-blue-600 mb-5 mt-5"
              required
            />
            
            <label className="text-[20px] text-gray-500 font-bold">
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:ring-blue-600 mb-5 mt-5"
              required
            />
            
            <label className="text-[20px] text-gray-500 font-bold">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:ring-blue-600 mb-5"
              required
            />
            
            <label className="text-[20px] text-gray-500 font-bold">
              Upload Image:
            </label>
            <input 
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full text-sm text-slate-500 mb-4 mt-2
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-red-500 file:text-white
                hover:file:bg-red-400"
              required
            />

            <div className="flex flex-col items-start gap-4 lg:items-center lg:flex-row">
              <Button 
                type="submit"
                disabled={loading}
                className="bg-red-400 p-6 rounded-[40px] px-10 text-white font-bold hover:bg-red-300 disabled:opacity-50"
              >
                {loading ? "SIGNING UP..." : "SIGN UP"}
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

export default SignUp;