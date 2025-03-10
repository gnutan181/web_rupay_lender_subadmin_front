import { useEffect, useState, useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoSearchOutline, IoLogOut } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import debounce from "lodash.debounce";
import axiosInstance from "../axiosInstance";
import { subAdminPermission } from "../../hooks/useGetDepartment";
import './Navbar.css';

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
  //  const subAdminPermission = subAdminPermission()
  // console.log(subAdminPermission)
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

  const [pendingNumbers, setPendingNumbers] = useState(0);
  const [reworkNumbers, setReworkNumbers] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const fetchPendingInquiries = async () => {
      try {
        const response = await axiosInstance.get('/subAdmin/get-pendings');
        const data = response.data;
        setPendingNumbers(data.totalPending); // Use `totalPending` from the API response
        setIsBlinking(data.totalPending > 0); // Blink if there are pending inquiries
      } catch (error) {
        console.error('Error fetching pending inquiries:', error);
      }
    };

    fetchPendingInquiries();
    // Optionally, set up an interval to periodically fetch the pending inquiries
    const interval = setInterval(fetchPendingInquiries, 60000); // Fetch every 60 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const fetchPendingRework = async () => {
      try {
        const response = await axiosInstance.get('/subAdmin/get-rework');
        const data = response.data;
        setReworkNumbers(data.totalrework); // Use `totalPending` from the API response
        setIsBlinking(data.totalrework > 0); // Blink if there are pending Rework
      } catch (error) {
        console.error('Error fetching pending Rework:', error);
      }
    };

    fetchPendingRework();
    // Optionally, set up an interval to periodically fetch the pending Rework
    const interval = setInterval(fetchPendingRework, 60000); // Fetch every 60 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to update filter status in Loan.jsx
  const handleFilter = (status) => {
    // Assuming you have a way to pass the filter status to Loan.jsx
    // For example, using context or a shared state management library
    // Here, we'll use a simple example with localStorage
    localStorage.setItem("filterStatus", status);
    window.dispatchEvent(new Event("filterStatusChanged")); // Trigger an event to update Loan.jsx
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

          {/* <div className="flex items-center gap-2 px-4 py-2 bg-[#F89D28] text-white rounded-md">
            <span>Rework:-</span>
            <span
              className={`w-8 h-8 md:w-6 md:h-6 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center cursor-pointer ${isBlinking ? 'animate-blink' : ''
                }`}
            >
              <span className="text-[#F89D28]">{reworkNumbers}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-[#F89D28] text-white rounded-md">
            <span>Pending:-</span>
            <span
              className={`w-8 h-8 md:w-6 md:h-6 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center cursor-pointer ${isBlinking ? 'animate-blink' : ''
                }`}
            >
              <span className="text-[#F89D28]">{pendingNumbers}</span>
            </span>
          </div> */}

          <div
            className="flex items-center gap-2 px-4 py-2 bg-[#F89D28] text-white rounded-md cursor-pointer"
            onClick={() => handleFilter("Rework")} // Trigger filter for Rework
          >
            <span>Rework:-</span>
            <span
              className={`w-8 h-8 md:w-6 md:h-6 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center ${isBlinking ? 'animate-blink' : ''
                }`}
            >
              <span className="text-[#F89D28]">{reworkNumbers}</span>
            </span>
          </div>

          {/* Pending Button */}
          <div
            className="flex items-center gap-2 px-4 py-2 bg-[#F89D28] text-white rounded-md cursor-pointer"
            onClick={() => handleFilter("pending")} // Trigger filter for Pending
          >
            <span>Pending:-</span>
            <span
              className={`w-8 h-8 md:w-6 md:h-6 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center ${isBlinking ? 'animate-blink' : ''
                }`}
            >
              <span className="text-[#F89D28]">{pendingNumbers}</span>
            </span>
          </div>



          <button
            onClick={handleToggleBox}
            className="px-4 py-2 bg-[#F89D28] text-white rounded-md"
          >
            {showBox1 ? "Close Banks" : "Search Pincode"}
          </button>

          {subAdminPermission?.createJob &&
            <div
              onClick={() => {
                navigate("/create-career");
              }}
              className="w-8 h-8 md:w-10 md:h-10 border border-[#F89D28] rounded-full bg-[#FFFFFF] flex items-center justify-center cursor-pointer"
            >
              <p className="text-[#F89D28]">Job</p>
            </div>}



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
