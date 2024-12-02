"use client"
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { getAuthToken, setAuthToken } from '../auth/auth'
import jwt from "jsonwebtoken"

interface DecodedToken {
  role: string;
  userId: number;
  email: string;
  name: string;
}

function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  // Fix 1: Move router.push outside of useEffect
  const redirectBasedOnRole = (role: string) => {
    if (role === 'admin') {
      router.push('/admin-dashboard')
    } else {
      router.push('/')
    }
  }

  // Fix 2: Add proper dependency array and handle auth check
  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken()
      if (token) {
        try {
          const decoded = jwt.decode(token) as DecodedToken
          if (decoded) {
            redirectBasedOnRole(decoded.role)
          }
        } catch (error) {
          localStorage.removeItem('token')
        }
      }
    }

    checkAuth()
  }, []) // Empty dependency array since we only want this to run once

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("email", formData.email)
      formDataToSend.append("password", formData.password)
      
      const response = await fetch("/api/login", {
        method: "POST",
        body: formDataToSend
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Save token and handle redirect
      setAuthToken(data.token)
      const decoded = jwt.decode(data.token) as DecodedToken

      if (!decoded) {
        throw new Error('Invalid token')
      }

      // Store user info
      sessionStorage.setItem('user', JSON.stringify({
        id: decoded.userId,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      }))

      // Handle redirect
      redirectBasedOnRole(decoded.role)

    } catch (error: any) {
      console.error('Login error:', error.message)
      alert(error.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="h-auto lg:min-h-screen lg:bg-gray-50 flex flex-col justify-center items-center">
        <div className='w-full lg:w-[1200px] bg-white h-auto p-16'>
          <h1 className='text-[30px] mb-4'>My Account</h1>
          <h1 className='text-[30px] mb-4 font-bold'>Login</h1>
          <form className='border border-gray-300 p-[20px] rounded-[4px]' onSubmit={handleSubmit}>
            <label className='text-[20px] text-gray-500 font-bold'>Email Address:</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              className='w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:to-blue-600 mb-5 mt-5' 
              onChange={handleChange} 
              required
            />
            <label className='text-[20px] text-gray-500 font-bold'>Password:</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              className='w-full border-2 border-gray p-2 focus:outline-none focus:ring focus:to-blue-600 mb-5' 
              onChange={handleChange}
              required
            />
            <div className='flex gap-4 items-center'>
              <Button type="submit" className='bg-red-400 p-6 rounded-[40px] px-10 text-white font-bold hover:bg-red-300'>LOG IN</Button>
              <p className='underline text-red-600 hover:cursor-pointer hover:text-red-400' onClick={() => router.push("/SignUp")}>Register</p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login