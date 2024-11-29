"use client"
import React from 'react'
import Navbar from '../components/Navbar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
function page() {
const router =useRouter()
  return (
    <>
    <Navbar/>
    <div className="h-auto lg:min-h-screen lg:bg-gray-50 flex flex-col justify-center items-center">
    <div className='w-full lg:w-[1200px] bg-white h-auto p-16 '>
        <h1 className='text-[30px] mb-4'>My Account</h1>
        <h1 className='text-[30px] mb-4 font-bold'>Login</h1>
        <form className='border border-gray-300 p-[20px] rounded-[4px] '>
            <label className=' text-[20px] text-gray-500 font-bold'>Email Address:</label>
            <input type="text" className='w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:to-blue-600 mb-5 mt-5'  />
            <label className='text-[20px] text-gray-500 font-bold'>Password:</label>
            <input type="text" className='w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:to-blue-600 mb-5 '/>
            <div className='flex gap-4 items-center'>
            <Button className='bg-red-400 p-6 rounded-[40px] px-10 text-white font-bold hover:bg-red-300'>LOG IN</Button>
            <p className='underline text-red-600 hover:cursor-pointer hover:text-red-400' onClick={()=> router.push("/SignUp")}>Register</p>
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default page