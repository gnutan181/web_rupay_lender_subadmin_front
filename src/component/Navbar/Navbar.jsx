import { useEffect, useState, useContext } from "react";

// notification icon.
// import { MdNotificationsActive } from "react-icons/md";

// user icon
import { FaUserAlt } from "react-icons/fa";

// search icon
import { IoSearchOutline } from "react-icons/io5";

// add icon
// import { MdAdd } from "react-icons/md";
// import { RiAddLargeFill } from "react-icons/ri";

import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
// import { MdLogout } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import PropTypes from 'prop-types';

import { SearchContext } from "../../context/SearchContext";

const Navbar = ({ displaySideBar, setDisplaySideBar }) => {

  const { addSearch } =  useContext(SearchContext);
  const navigate = useNavigate();

  const [searchInputValue, setSearchInputValue] = useState('')

  useEffect(()=>{
    addSearch(searchInputValue)
  },[searchInputValue,addSearch])

  const handleLogout = ()=>{
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="w-full h-[10vh] bg-[#3B3935]  ">
      <div className="h-full w-[90%] mx-auto flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          {/* searchbar and hambur menu */}
          <RxHamburgerMenu
            onClick={() => {
              setDisplaySideBar(true);
            }}
            className="text-xl lg:hidden text-[#FFFFFF] cursor-pointer"
          />

          {/* search bar */}
          <div
            className="bg-[#FFFFFF] rounded-[34px]
            w-[200px] h-[30px] md:w-[300px] md:h-[40px] overflow-hidden
                        flex mx-4 my-2
                    "
          >
            <div className="flex items-center gap-3 px-3 text-lg lg:text-xl">
              <IoSearchOutline className="text-[#3B3935] bg-[#F89D28]s text-lg md:text-[22px] rounded-[2rem] font-bold" />

              <input
                type="text"
                placeholder="Search here..."
                value={searchInputValue}
                onChange={(e)=>{setSearchInputValue(e.target.value)}}
                className="placeholder-[#3B3935]  text-[#3B3935] font-Inter font-normal outline-none bg-[#FFFFFF] text-base md:text-xl w-[90%]"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          {/* <div
            onClick={() => {
              navigate("/notification");
            }}
            className="cursor-pointer relative w-8 h-8 md:w-10 md:h-10 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center"
          >
            <MdNotificationsActive className="text-xl md:text-2xl text-[#F89D28]" />
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#F89D28] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              15
            </div>
          </div> */}
          <div
          onClick={()=>navigate('/profile')}
            className="cursor-pointer w-8 h-8 md:w-10 md:h-10 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center">
            <FaUserAlt className="text-base md:text-lg text-[#F89D28]" />
          </div>
          <div 
          onClick={handleLogout}
          className="cursor-pointer w-8 h-8 md:w-10 md:h-10 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center">
            <IoLogOut className="text-xl md:text-2xl text-[#F89D28]" />
          </div>
        </div>
      </div>

      {/* <button onClick={()=>{setDisplaySideBar(true)}}>Display</button> */}
    </div>
  );
};
Navbar.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  setDisplaySideBar: PropTypes.func.isRequired,
};

export default Navbar;
