import React, { useState } from 'react';
import logo from '../../logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import pic from '../../logo/account.png';

const Header = () => {
    const [icon, setIcon] = useState(faBars);
    const [navOpen, setNavOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
    const navigate = useNavigate();

    const userName = localStorage.getItem("userName"); // Get the user's name from localStorage

    const toggleNav = () => {
        setIcon((prevIcon) => (prevIcon === faBars ? faX : faBars));
        setNavOpen((prevNavOpen) => !prevNavOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove auth token
        localStorage.removeItem("userName"); // Remove user name
        navigate("/login"); // Navigate to the login page
    };

    const goToDashboard = () => {
        navigate("/dashboard"); // Navigate to the dashboard page
    };

    return (
        <>
            <header className="bg-[#041014]">
                <nav className="flex justify-between items-center w-[92%] mx-auto py-2">
                    {/* Logo */}
                    <div>
                        <Link to="/">
                            <img src={logo} alt="logo" className="w-[20vh]" />
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <div
                            className={`lg:static absolute lg:w-auto w-full lg:min-h-fit min-h-[60vh] left-0 ${
                                navOpen ? 'top-[10%]' : 'top-[-100%]'
                            }`}
                        >
                            <ul className="flex lg:flex-row flex-col items-center lg:gap-[4.5vw] gap-10 text-[1.3rem]">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `block py-1 pr-4 pl-3 duration-200 ${
                                                isActive ? 'text-[#00a8e8]' : 'text-[#ffffff]'
                                            } border-b text-38px border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#007ea7] lg:p-0`
                                        }
                                    >
                                        HOME
                                    </NavLink>
                                </li>
                                {!userName && (
                                    <>
                                        <li>
                                            <NavLink
                                                to="Signup"
                                                className={({ isActive }) =>
                                                    `block py-2 pr-4 pl-3 duration-200 ${
                                                        isActive
                                                            ? 'text-[#00a8e8]'
                                                            : 'text-[#ffffff]'
                                                    } border-b text-38px border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#007ea7] lg:p-0`
                                                }
                                            >
                                                SIGN UP
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="Login"
                                                className={({ isActive }) =>
                                                    `block py-2 pr-4 pl-3 duration-200 ${
                                                        isActive
                                                            ? 'text-[#00a8e8]'
                                                            : 'text-[#ffffff]'
                                                    } border-b text-38px border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#007ea7] lg:p-0`
                                                }
                                            >
                                                LOGIN
                                            </NavLink>
                                        </li>
                                    </>
                                )}
                                {userName && (
                                    <li className="relative">
                                        {/* Profile Picture */}
                                        <button
                                            onClick={goToDashboard}
                                            className="flex items-center gap-2"
                                        >
                                            <img
                                                src={pic} // Profile picture
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full border-2 border-white hover:border-gray-300"
                                            />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {dropdownOpen && (
                                            <div className="absolute bg-white text-black rounded-md mt-2 shadow-lg right-0 z-10">
                                                <button
                                                    onClick={handleLogout}
                                                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Hamburger Icon for Mobile */}
                        <div onClick={toggleNav}>
                            <FontAwesomeIcon
                                icon={icon}
                                style={{ cursor: 'pointer', color: '#ffffff' }}
                                className="lg:hidden h-6 flex items-center justify-center pt-1"
                            />
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
