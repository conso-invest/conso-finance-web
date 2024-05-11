"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../public/logo.png";
import { SearchIcon, UserRound, MenuIcon } from "lucide-react";
import { UserData } from "@/lib/const";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isConnected = () => {
    const userData = localStorage.getItem("UserData");
    return userData !== null;
  };

  const getUserName = () => {
    const userData = localStorage.getItem("UserData");
    if (userData !== null) {
      return JSON.parse(userData).name;
    }
    return null;
  };

  return (
    <header className="fixed z-10 w-full px-5 py-2 bg-white shadow-md">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none lg:hidden"
          >
            <MenuIcon size={24} />
          </button>
          <Link href="/" className="hidden lg:flex">
            <Image
              src={logo}
              width={70}
              height={10}
              alt="logo"
              className="py-2 cursor-pointer"
            />
          </Link>

          <Link
            href="/publishproject"
            className="hidden text-xs font-bold lg:flex hover:text-blue-400"
          >
            LANCER UN PROJET
          </Link>
          <Link
            href="/"
            className="hidden text-xs font-bold lg:flex hover:text-blue-400"
          >
            PARTICIPER
          </Link>
        </div>
        <Link href="/" className="ml-8 lg:hidden">
          <Image src={logo} alt="logo" className="w-16 py-2 cursor-pointer" />
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="/search"
            className="flex items-center text-xs font-bold hover:text-blue-400"
          >
            <SearchIcon width={20} className="lg:mr-2" />
            <span className="hidden lg:flex"> RECHERCHER UN PROJET</span>
          </Link>
          <div className="hidden h-10 border-r border-gray-300 lg:flex"></div>
          {isConnected() ? (
            <Link
              href="/account"
              className="flex items-center text-xs font-bold hover:text-blue-400"
            >
              <UserRound width={20} className="lg:mr-2" />
              <span className="hidden lg:flex">{getUserName()}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center text-xs font-bold hover:text-blue-400"
            >
              <UserRound width={20} className="lg:mr-2" />
              <span className="hidden lg:flex">SE CONNECTER</span>
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 h-screen pt-5 bg-white shadow-md lg:hidden">
          <div className="px-4 py-2">
            <Link href="/publishproject" className="block py-2 border-b border-gray-200">
              LANCER UN PROJET
            </Link>
            <Link href="/" className="block py-2">
              PARTICIPER
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
