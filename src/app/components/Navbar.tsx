"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";
import { FaShoppingBag } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { getAuthToken, removeAuthToken } from "../auth/auth";
import jwt from "jsonwebtoken";
interface DecodedToken {
  role: string;
  name: string;
  image:string
}

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = () => {
    const token = getAuthToken();
    if (token) {
      try {
        const decoded = jwt.decode(token) as DecodedToken;
        setUser(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
    router.push('/login');
  };

  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Store",
      href: "/store",
      hasDropdown: true,
    },
    {
      name: "About US",
      href: "/about",
    },
    // Conditionally show Login or user info
    ...(user ? [] : [{
      name: "My Account",
      href: "/login",
    }]),
  ];

  return (
    <nav className="container mx-auto max-w-7xl flex p-4 justify-between relative">
      <div className="flex items-center gap-4">
        <Image
          src="https://websitedemos.net/plant-store-02/wp-content/uploads/sites/410/2020/06/plants-store-logo-green.svg"
          width={50}
          height={50}
          alt="Logo"
        />
        <p className="text-[20px]">Simple Natural</p>
      </div>

      <div className="hidden md:flex items-center gap-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <div
              key={item.name}
              className="relative flex items-center gap-1"
              onMouseEnter={() => item.hasDropdown && setShowDropdown(true)}
              onMouseLeave={() => item.hasDropdown && setShowDropdown(false)}
            >
              <Link
                href={item.href}
                className={`hover:cursor-pointer hover:text-red-500 text-[15px] ${
                  isActive ? "text-red-500 font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
              {item.hasDropdown && <ChevronDown className="h-4 w-4 relative" />}

              {item.hasDropdown && showDropdown && (
                <div className="absolute w-[200px] h-auto top-full right-0 bg-white shadow-lg flex flex-col gap-4 p-4 border-t-2 border-red-500">
                  <p className="hover:text-red-600 cursor-pointer">Plant</p>
                  <p className="hover:text-red-600 cursor-pointer">Cactus</p>
                </div>
              )}
            </div>
          );
        })}


        <div className="relative">
          <FaShoppingBag className="text-red-500 text-[20px]" />
          <div className="absolute top-[-9px] right-[-14px] w-[20px] h-[20px] bg-red-500 border rounded-full font-bold text-[14px] text-center">
            0
          </div>
        </div>
                {user?.role==="user" && (
          <div className="flex items-center  gap-4">
            <div className="flex items-center flex-col gap-3">
              <div className="rounded-full h-[60px] w-[60px] overflow-hidden">
                <Image 
                  src={user.image} 
                  width={60} 
                  height={60} 
                  alt={user.name}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <span className="text-[15px] text-gray-700">
                Welcome, {user.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[15px] text-red-500 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}

      </div>
      
    </nav>
  );
}

export default Navbar;