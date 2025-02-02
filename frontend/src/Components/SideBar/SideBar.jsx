import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const SideBar = ({ isSidebarOpen, setIsSidebarOpen, onFieldClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
        
    };

    const handleTabClick = (field) => {
        onFieldClick(field); // Call the parent function to handle tab functionality
        setIsSidebarOpen(false); // Close the sidebar
      };

    return (
        <>
            <aside id="sidebar-multi-level-sidebar"
                className={`fixed top-16  w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:translate-x-0 bg-gray-800`} aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-800  ">
                    <ul class="space-y-2 font-medium">
                        {/* <li>
                            <a href="#" onClick={() => handleTabClick('Dashboard')} class="flex items-center p-2 rounded-lg text-white  dark:hover:bg-gray-700 group">
                                <MdDashboard className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 e' />

                                <span class="ms-3">Dashboard</span>
                            </a>
                        </li> */}
                        <li >
                            <button type="button" onClick={toggleDropdown} class="flex items-center w-full p-2 text-base text-white " aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <FaUsers className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-white' />
                                <span id='driverTab' class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Funds</span>
                                <IoIosArrowForward id='driverTabIcon' />
                            </button>
                            <ul id="dropdown-example" className={`py-2 space-y-2 duration-300  ${isDropdownOpen ? 'block' : 'hidden'}`}>
                                <li >
                                    <a onClick={() => handleTabClick('DriverList')} href="#" class="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group ">TRC20-AUTOPAYMENT</a>
                                </li>
                                <li>
                                    <a onClick={() => handleTabClick('AddDriver')} href="#" class="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group  ">INR Modes</a>
                                </li>

                            </ul>
                        </li>
                       
                    </ul>
                </div>
            </aside>

            <div class="p-4 sm:ml-64">

            </div>

        </>
    )
}

export default SideBar