"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FaShoppingBag } from "react-icons/fa";
import { usePathname } from "next/navigation";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
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
    {
      name: "My Account",
      href: "/login",
    },
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
      </div>
    </nav>
  );
}

export default Navbar;
