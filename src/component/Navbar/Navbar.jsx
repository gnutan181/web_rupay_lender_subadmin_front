// import { useEffect, useState, useContext } from "react";

// // notification icon.
// // import { MdNotificationsActive } from "react-icons/md";

// // user icon
// import { FaUserAlt } from "react-icons/fa";

// // search icon
// import { IoSearchOutline } from "react-icons/io5";

// // add icon
// // import { MdAdd } from "react-icons/md";
// // import { RiAddLargeFill } from "react-icons/ri";

// import { RxHamburgerMenu } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// // import { MdLogout } from "react-icons/md";
// import { IoLogOut } from "react-icons/io5";
// import PropTypes from 'prop-types';

// import { SearchContext } from "../../context/SearchContext";
// import { MdNotificationsActive } from "react-icons/md";

// const Navbar = ({ displaySideBar, setDisplaySideBar }) => {

//   const { addSearch } =  useContext(SearchContext);
//   const navigate = useNavigate();

//   const [searchInputValue, setSearchInputValue] = useState('')

//   useEffect(()=>{
//     addSearch(searchInputValue)
//   },[searchInputValue,addSearch])

//   const handleLogout = ()=>{
//     sessionStorage.removeItem('token')
//     navigate('/login')
//   }

//   return (
//     <div className="w-full h-[10vh] bg-[#3B3935]  ">
//       <div className="h-full w-[90%] mx-auto flex items-center justify-between">
//         <div className="flex items-center justify-start gap-4">
//           {/* searchbar and hambur menu */}
//           <RxHamburgerMenu
//             onClick={() => {
//               setDisplaySideBar(true);
//             }}
//             className="text-xl lg:hidden text-[#FFFFFF] cursor-pointer"
//           />

//           {/* search bar */}
//           <div
//             className="bg-[#FFFFFF] rounded-[34px]
//             w-[200px] h-[30px] md:w-[300px] md:h-[40px] overflow-hidden
//                         flex mx-4 my-2
//                     "
//           >
//             <div className="flex items-center gap-3 px-3 text-lg lg:text-xl">
//               <IoSearchOutline className="text-[#3B3935] bg-[#F89D28]s text-lg md:text-[22px] rounded-[2rem] font-bold" />

//               <input
//                 type="text"
//                 placeholder="Search here..."
//                 value={searchInputValue}
//                 onChange={(e)=>{setSearchInputValue(e.target.value)}}
//                 className="placeholder-[#3B3935]  text-[#3B3935] font-Inter font-normal outline-none bg-[#FFFFFF] text-base md:text-xl w-[90%]"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center justify-center gap-4">
//           {/* <div
//             onClick={() => {
//               navigate("/notification");
//             }}
//             className="cursor-pointer relative w-8 h-8 md:w-10 md:h-10 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center"
//           >
//             <MdNotificationsActive className="text-xl md:text-2xl text-[#F89D28]" />
//             <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#F89D28] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
//               15
//             </div>
//           </div> */}


//           <div
//           onClick={()=>navigate('/profile')}
//             className="cursor-pointer w-8 h-8 md:w-10 md:h-10 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center">
//             <FaUserAlt className="text-base md:text-lg text-[#F89D28]" />
//           </div>
//           <div 
//           onClick={handleLogout}
//           className="cursor-pointer w-8 h-8 md:w-10 md:h-10 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center">
//             <IoLogOut className="text-xl md:text-2xl text-[#F89D28]" />
//           </div>
//         </div>
//       </div>

//       {/* <button onClick={()=>{setDisplaySideBar(true)}}>Display</button> */}
//     </div>
//   );
// };
// Navbar.propTypes = {
//   displaySideBar: PropTypes.bool.isRequired,
//   setDisplaySideBar: PropTypes.func.isRequired,
// };

// export default Navbar;


import { useEffect, useState, useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoSearchOutline, IoLogOut } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import debounce from "lodash.debounce";
import axiosInstance from "../axiosInstance";

const Navbar = ({ displaySideBar, setDisplaySideBar }) => {
  const { addSearch } = useContext(SearchContext);
  const navigate = useNavigate();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [showBox1, setShowBox1] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [productType, setProductType] = useState("");
  const [rightBoxData, setRightBoxData] = useState(null);

  useEffect(() => {
    addSearch(searchInputValue);
  }, [searchInputValue, addSearch]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const fetchRightBoxData = debounce(async (pinCode) => {
    if (pinCode.length === 6 && /^\d+$/.test(pinCode)) {
      try {
        const response = await axiosInstance.get(`/subAdmin/search`, {
          params: { pincode: pinCode, type: productType || "personal loan" },
        });
        // console.log(response)
        if ((response?.data?.success)) {
          setRightBoxData(response?.data?.results);
        } else {
          console.error("Unexpected API response format:", response?.data);
          setRightBoxData(null);
        }
      } catch (error) {
        console.error("Error fetching right box data:", error);
        setRightBoxData(null);
      }
    } else {
      setRightBoxData(null);
    }
  }, 1000);

  const handleToggleBox = () => {
    setShowBox1(!showBox1);
    setRightBoxData(null);
  };

  const handleSearch = () => {
    if (pinCode && productType) {
      fetchRightBoxData(pinCode);
    }

    setTimeout(() => {
      setShowBox1(!showBox1);
      setRightBoxData(null);
      setPinCode("")
      setProductType("")

    }, 30000);
  };

  return (
    <div className="w-full h-[10vh] bg-[#3B3935]">
      <div className="h-full w-[90%] mx-auto flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <RxHamburgerMenu
            onClick={() => setDisplaySideBar(true)}
            className="text-xl lg:hidden text-[#FFFFFF] cursor-pointer"
          />
          <div
            className="bg-[#FFFFFF] rounded-[34px]
            w-[200px] h-[30px] md:w-[300px] md:h-[40px] overflow-hidden
            flex mx-4 my-2"
          >
            <div className="flex items-center gap-3 px-3 text-lg lg:text-xl">
              <IoSearchOutline className="text-[#3B3935] text-lg md:text-[22px]" />
              <input
                type="text"
                placeholder="Search here..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                className="placeholder-[#3B3935] text-[#3B3935] font-Inter font-normal outline-none bg-[#FFFFFF] text-base md:text-xl w-[90%]"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">

          <button
            onClick={handleToggleBox}
            className="px-4 py-2 bg-[#F89D28] text-white rounded-md"
          >
            {showBox1 ? "Close Banks" : "Search Pincode"}
          </button>
          
          <div
            onClick={() => {
              navigate("/create-career");
            }}
            className="w-8 h-8 md:w-10 md:h-10 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center cursor-pointer"
          >
            <p className="text-[#F89D28]">Job</p>
          </div>

          <div
            onClick={() => navigate("/profile")}
            className="cursor-pointer w-8 h-8 md:w-10 md:h-10 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center"
          >
            <FaUserAlt className="text-base md:text-lg text-[#F89D28]" />
          </div>

          <div
            onClick={handleLogout}
            className="cursor-pointer w-8 h-8 md:w-10 md:h-10 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center"
          >
            <IoLogOut className="text-xl md:text-2xl text-[#F89D28]" />
          </div>



        </div>
      </div>

      {/* Rectangular Box 1 */}
      {showBox1 && (
        <div className="mt-4 p-4 bg-[#d6d6d6] rounded-md shadow-md transition-all duration-500 ease-in-out absolute z-10 right-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-4">Search for Banks</h3>
            {/* <button
              onClick={handleToggleBox}
              className="text-sm text-red-500 hover:underline"
            >
              Close
            </button> */}
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="border p-2 rounded-md w-1/2"
            />
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="border p-2 rounded-md w-1/2"
            >
              <option value="">Select Product</option>
              <option value="personal loan">Personal Loan</option>
              {/* <option value="personal loan balance transfer">Personal Loan BT</option> */}
              <option value="home loan">Home Loan</option>
              {/* <option value="home loan balance transfer">Home Loan BT</option> */}
              <option value="business loan">Business Loan</option>
              <option value="loan against property">Loan Against Property</option>
              {/* <option value="loan against property bt">Loan Against Property BT</option> */}
              <option value="used car loan">Used Car Loan</option>
              {/* <option value="used car loan bt">Used Car Loan BT</option> */}
              {/* <option value="home loan">Motor Insurance</option> */}
              {/* Add more options as needed */}
            </select>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-[#F89D28] text-white rounded-md"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Rectangular Box 2 */}
      {rightBoxData && (
        <div className="mt-4 p-4 bg-[#d6d6d6] rounded-md shadow-md transition-transform duration-500 ease-in-out absolute z-10 right-1 top-[12.1rem] w-[34.85rem]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-4">Available Banks</h3>
            {/* <button
              onClick={handleToggleBox}
              className="text-sm text-red-500 hover:underline"
            >
              Close
            </button> */}
          </div>
          <div className="flex flex-wrap gap-2">
            {rightBoxData.map((bank) => (
              <span
                key={bank._id}
                className="px-3 py-1 bg-white text-[#3B3935] rounded-md shadow-sm"
              >
                {bank.bankName}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Navbar.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  setDisplaySideBar: PropTypes.func.isRequired,
};

export default Navbar;
