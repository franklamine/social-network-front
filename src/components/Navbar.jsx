import React, {useState} from "react";
import {FaBars, FaBell, FaGamepad, FaHome, FaSearch, FaUser, FaUserFriends} from "react-icons/fa";
import {FaMessage, FaVideo} from "react-icons/fa6";
import {NavLink} from "react-router-dom";
import ProfileCart from "./ProfileCart.jsx";


export default function Navbar() {

    const [showCart, setShowCart] = useState(false);

    return (

        <nav
            className=" fixed top-0 left-0 right-0 z-50 bg-gray-100 shadow-xl sm:px-6 h-16 sm:h-auto  flex items-center justify-between ">

            <div className="flex items-center ml-4 gap-2">
                <img className="w-10 h-10 rounded-full" src="logo-min.png" alt=""/>
                <div className="flex items-center sm:rounded-full sm:bg-gray-200 gap-2 sm:px-3 text-gray-400">
                    <p className="bg-gray-200 rounded-full p-3  cursor-pointer ">
                        <FaSearch className="w-4 h-4 "/>
                    </p>
                    <input className="hidden sm:block bg-gray-200 border-none outline-none" type="text"
                           placeholder="Search . . ."/>
                </div>
            </div>

            <div className="hidden sm:flex  text-gray-400">
                <NavLink to="/"
                         className="relative group cursor-pointer hover:bg-gray-200  py-3 px-8 rounded transition duration-200">
                    <FaHome className="w-8 h-8 "/>
                    <span
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">
                            Home
                        </span>
                    <hr className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-500 hidden "/>
                </NavLink>
                <NavLink to="/friends"
                         className="relative group cursor-pointer hover:bg-gray-200 py-3 px-8 rounded transition duration-200">
                    <FaUserFriends className="w-8 h-8 "/>
                    <span
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">Friends</span>
                    <hr className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-500 hidden "/>
                </NavLink>
                <NavLink to="/video"
                         className="relative group cursor-pointer hover:bg-gray-200 py-3 px-8 rounded transition duration-200">
                    <FaVideo className="w-8 h-8"/>
                    <span
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">Video</span>
                    <hr className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-500 hidden "/>
                </NavLink>
                <NavLink to="/game"
                         className="relative group cursor-pointer hover:bg-gray-200 py-3 px-8 rounded transition duration-200">
                    <FaGamepad className="w-8 h-8"/>
                    <span
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">Gaming</span>
                    <hr className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-500 hidden "/>
                </NavLink>
            </div>

            <div className="flex gap-4 sm:gap-14 mr-4 text-gray-400">
                <p className="relative group bg-gray-200 rounded-full p-3 cursor-pointer ">
                    <FaBars className="w-4 h-4 sm:w-6 sm:h-6 "/>
                    <span
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">Menu</span>
                </p>
                <p className="relative group bg-gray-200 rounded-full p-3 cursor-pointer ">
                    <FaMessage className="w-4 h-4 sm:w-6 sm:h-6 "/>
                    <span
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">Message</span>
                </p>
                <p className="relative group bg-gray-200 rounded-full p-3 cursor-pointer ">
                    <FaBell className="w-4 h-4 sm:w-6 sm:h-6 "/>
                    <span
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">Notifications</span>
                </p>
                <p onClick={() => setShowCart(!showCart)}
                   className="relative group bg-gray-200 rounded-full p-3 cursor-pointer ">
                    <FaUser className="w-4 h-4 sm:w-6 sm:h-6 "/>
                    <span
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-10">Account</span>

                    {showCart &&
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 ">
                            <ProfileCart/>
                        </div>
                    }
                </p>
            </div>

        </nav>
    );
}
