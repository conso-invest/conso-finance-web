"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from '../public/logo.png';
import { SearchIcon, UserRound, MenuIcon } from "lucide-react";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed w-full z-10 shadow-md bg-white px-5 py-2">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                    <button onClick={toggleMenu} className="text-gray-600 focus:outline-none lg:hidden">
                        <MenuIcon size={24} />
                    </button>
                    <Link href="/" className="hidden lg:flex">
                        <Image src={logo} width={70} height={10} alt="logo" className="cursor-pointer py-2" />
                    </Link>

                    <Link href="/" className="hidden lg:flex text-xs font-bold hover:text-blue-400">LANCER UN PROJET</Link>
                    <Link href="/" className="hidden lg:flex text-xs font-bold hover:text-blue-400">
                        PARTICIPER
                    </Link>
                </div>
                <Link href="/" className="ml-8 lg:hidden">
                    <Image src={logo}  alt="logo" className="w-16 cursor-pointer py-2" />
                </Link>
                <div className="flex items-center space-x-6">
                    <Link href="/search" className="text-xs font-bold hover:text-blue-400 flex items-center">
                        <SearchIcon width={20} className="lg:mr-2" />
                        <span className="hidden lg:flex"> RECHERCHER UN PROJET</span>
                    </Link>
                    <div className="hidden lg:flex h-10 border-r border-gray-300"></div>
                    <Link href="/login" className="text-xs font-bold hover:text-blue-400 flex items-center">
                        <UserRound width={20} className="lg:mr-2" />
                        <span className="hidden lg:flex">SE CONNECTER</span>
                    </Link>
                </div>
            </div>

            {
                isMenuOpen && (
                    <div className="lg:hidden h-screen bg-white absolute pt-5 left-0 right-0 shadow-md">
                        <div className="px-4 py-2">
                            <Link href="/" className="block py-2 border-b border-gray-200">LANCER UN PROJET</Link>
                            <Link href="/" className="block py-2">PARTICIPER</Link>
                        </div>
                    </div>
                )
            }
        </header >
    );
}

export default Header;
