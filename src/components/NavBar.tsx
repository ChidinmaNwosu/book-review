import React, {useState} from 'react';
import Link from 'next/link'
import { GiBookshelf, GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";


function NavBar():JSX.Element {
const[isOpen, setIsOpen] = useState<boolean>(false);
const toggleMenu =():void => setIsOpen(!isOpen);

  return (
    <header className="w-full h-auto fixed top-0 z-30 bg-gray-700">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex gap-2 items-center">
              <GiBookshelf className="text-4xl text-white"/> 
               <p className="text-4xl font-medium text-white">Bookshelf</p>
          </div>
             <ul className="hidden lg:flex space-x-4">
              <li className="border border-white p-2 rounded-lg">
                <Link href="/home" className="text-white font-medium text-2xl">Home</Link>
              </li>
             <li className="border border-white p-2 rounded-lg">
                <Link href="/search" className="text-white font-medium text-2xl">Search</Link>
              </li>
            </ul>
          <button className="lg:hidden text-white" onClick={toggleMenu}>
                    {isOpen ? (
                    <GiHamburgerMenu  size={30}/>
                    ) : (
                    <MdOutlineClose  size={30}/>
                    )}
          </button>
        {isOpen && (
            <ul className="lg:hidden flex flex-col gap-4 absolute top-16 right-4 bg-gray-600 p-4 rounded-lg shadow-lg">
              <li className="border border-white p-2 rounded-lg">
                <Link href="/home" className="text-white font-medium text-2xl">Home</Link>
              </li>
              <li className="border border-white p-2 rounded-lg">
                <Link href="/search" className="text-white font-medium text-2xl">Search</Link>
              </li>
            </ul>
          )}
 
      </nav>
    </header>
  )
}

export default NavBar;