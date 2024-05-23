"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import logo from "../public/logo.png";
import { SearchIcon, UserRound, MenuIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  const openPage = (link: any) => {
    router.push(`/details/${link}`);
    toggleMenu();
  }


  useEffect(() => {
    const userData = localStorage.getItem("UserData");
    if (userData !== null) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("UserData");
    setUserData(null);
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
          <Link href="/" className="hidden text-xs font-bold lg:flex hover:text-primarycolor">
            ACCUEIL
          </Link>
          <Link
            href="/request"
            className="hidden text-xs font-bold lg:flex hover:text-primarycolor"
          >
            LANCER UN PROJET
          </Link>
        </div>
        <Link href="/" className="ml-12 lg:hidden" onClick={() => closeMenu()}>
          <Image src={logo} alt="logo" className="w-16 py-2 cursor-pointer" />
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="/search" onClick={() => closeMenu()}
            className="hidden lg:flex items-center text-xs font-bold hover:text-primarycolor"
          >
            <SearchIcon width={20} className="lg:mr-2" />
            <span> RECHERCHER UN PROJET</span>
          </Link>
          <Link
            href="/search" onClick={() => closeMenu()}
            className="flex lg:hidden items-center text-xs font-bold hover:text-primarycolor"
          >
            <SearchIcon width={20} className="lg:mr-2" />
          </Link>
          <div className="hidden h-10 border-r border-gray-300 lg:flex"></div>
          {userData ? (
            <Link href={`/account`} onClick={() => closeMenu()}>
              <div className="flex items-center text-xs font-bold hover:text-primarycolor">
                <UserRound width={20} className="lg:mr-2" />
                <span className="hidden lg:flex">{userData.name}</span>
              </div>
            </Link>
          ) : (
            <Link
              href="/login" onClick={() => closeMenu()}
              className="flex items-center text-xs font-bold hover:text-primarycolor"
            >
              <UserRound width={20} className="lg:mr-2" />
              <span className="hidden lg:flex">SE CONNECTER</span>
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 h-screen pt-5 bg-white shadow-md lg:hidden">
          <div className="space-y-5 px-4 py-2">
            <Link href="/" onClick={() => closeMenu()} className="block py-2 ">
              ACCUEIL
            </Link>
            <Link href="/request" onClick={() => closeMenu()} className="block py-2">
              LANCER UN PROJET
            </Link>
            {!userData ?
              <>
                <Link href="/login" onClick={() => closeMenu()} className="block py-2">
                  ME CONNECTER
                </Link>

                <Link href="/register" onClick={() => closeMenu()} className="block py-2">
                  M'INSCRIRE
                </Link>
              </> :
              <>
                <Link href="/account" onClick={() => closeMenu()} className="block py-2">
                  MON COMPTE
                </Link>
              </>
            }
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
