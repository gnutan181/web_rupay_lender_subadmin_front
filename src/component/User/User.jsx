

import { useEffect, useState, useCallback, useContext } from "react";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { MdOutlineRemoveRedEye, MdEdit, MdClose } from 'react-icons/md';

import { SearchContext } from "../../context/SearchContext";
import dayjs from "dayjs";

const User = () => {
  const { searchValue } = useContext(SearchContext);
  const [searchvendor, setSearchvendor] = useState([]);

  const navigate = useNavigate();
  const [vendor, setVendor] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedRemark, setSelectedRemark] = useState('');
  const [customRemark, setCustomRemark] = useState('');
  const [isCustomRemark, setIsCustomRemark] = useState(false);
   const predefinedRemarks = [
    'Excellent performance',
    'Good vendor',
    'Average performance',
    'Needs improvement',
    'Payment issues',
    'Communication problems',
    'Quality concerns',
    'Delivery delays',
    'Highly recommended',
    'Under review',
    'Other reason'
  ];
   const handleRemarksUpdate = (vendor) => {
    setSelectedVendor(vendor);
    setSelectedRemark(vendor.remarks || '');
    setCustomRemark('');
    setIsCustomRemark(false);
    setIsModalOpen(true);
  };

  const handleRemarkChange = (value) => {
    setSelectedRemark(value);
    setIsCustomRemark(value === 'Other reason');
    if (value !== 'Other reason') {
      setCustomRemark('');
    }
  };

  const handleSaveRemarks = async() => {
    if (!selectedVendor) return;

    const finalRemark = isCustomRemark ? customRemark : selectedRemark;
    
    if (!finalRemark.trim()) {
      alert('Please select or enter a remark');
      return;
    }

    // Update the items array
    const updatedItems = items.map(item => 
      item._id === selectedVendor._id 
        ? { ...item, remarks: finalRemark }
        : item
    );
    
    setItems(updatedItems);

    // Here you would typically make an API call to update the backend
   await axiosInstance.post(`/subAdmin/update-remarks/${selectedVendor._id}`, {
      remarks: finalRemark
    });

    // Close modal and reset state
    setIsModalOpen(false);
    setSelectedVendor(null);
    setSelectedRemark('');
    setCustomRemark('');
    setIsCustomRemark(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVendor(null);
    setSelectedRemark('');
    setCustomRemark('');
    setIsCustomRemark(false);
  };
  const fetchData = async () => {
    const { data } = await axiosInstance.get("/subAdmin/all-vendors");
    setVendor(data?.vendors);
    return data;
  };

  useEffect(() => {
    fetchData();  
  }, []);


  useEffect(() => {
    if (vendor && !searchValue) {
      setItems(vendor);
      setPageCount(Math.ceil(vendor.length / itemsPerPage));
    }
  }, [vendor, searchValue, itemsPerPage]);

  useEffect(() => {
    if (vendor) {
      setItems(vendor);
      setPageCount(Math.ceil(vendor.length / itemsPerPage));
    }
  }, [vendor, itemsPerPage]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const fetchSearchdata = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `/subAdmin/search-vendor/${searchValue}`
      );
      setSearchvendor(res.data);
      setItems(res.data);
      setPageCount(Math.ceil(res.data.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  }, [searchValue, itemsPerPage]);

  useEffect(() => {
    if (searchValue) {
      let timeout = setTimeout(() => {
        fetchSearchdata();
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [searchValue, fetchSearchdata]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0); // Reset to the first page when changing items per page
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pageCount) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-col bg-[#FFFFFF]  m-2 p-2 font-Inter w-full">
      <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
        Vendors
      </h2>
      <div className="-m-1.5 overflow-x-auto h-[70vh] overflow-y-scroll">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
           
             <table className="w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {/* <th className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                      
                    </label>
                  </th> */}
                  <th className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Vendor ID
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Referral
                  </th>
     
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    State
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Active Status
                  </th>
                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                   Join date
                  </th>
                                 <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Remarks
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
               
                </tr>
              </thead>
              {items
                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                .map((item, i) => (
                  <tbody key={i} className="divide-y divide-gray-200">
                    <tr className="bg-white border-b text-[#3B3935] font-normal text-xs md:text-sm">
                      {/* <td className="px-3 py-4">
                        <input
                          type="checkbox"
                          checked={selectedVendors.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                        />
                      </td> */}
                      <td className="px-3 py-4">{item?.venderID || "NA"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.basicInfo?.username || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.basicInfo?.mobile || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.basicInfo?.referral || "N/A"}
                      </td>
                   
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.basicInfo?.state || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        <button
                          className={`px-3 py-1 rounded-lg ${item?.activeStatus === "active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                            }`}
                          onClick={() => {
                            const confirmation = window.prompt(
                              "Do you want to change the status? Type 'yes' to confirm."
                            );
                            if (confirmation === "yes") {
                              const updatedStatus =
                                item?.activeStatus === "active"
                                  ? "inactive"
                                  : "active";
                              const updatedVendor = [...items];
                              updatedVendor[i].activeStatus = updatedStatus;
                              setItems(updatedVendor);

                              // Update on backend
                              axiosInstance.put(
                                `/admin/update-vendor-status/${item._id}`,
                                {
                                  activeStatus: updatedStatus,
                                }
                              );
                            }
                          }}
                        >
                          {item?.activeStatus || "N/A"}
                        </button>
                        <div className="pt-2">
  <button  className={`px-3 py-1 rounded-lg ${item?.paymentStatus === "paid"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                            }`}>

                         {item?.paymentStatus || "N/A"}
                        </button>
                        </div>
                      
                      </td>
                      
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {/* <button
                          className={`px-3 py-1 rounded-lg ${item?.activeStatus === "active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                            }`}
                          onClick={() => {
                            const confirmation = window.prompt(
                              "Do you want to change the status? Type 'yes' to confirm."
                            );
                            if (confirmation === "yes") {
                              const updatedStatus =
                                item?.activeStatus === "active"
                                  ? "inactive"
                                  : "active";
                              const updatedVendor = [...items];
                              updatedVendor[i].activeStatus = updatedStatus;
                              setItems(updatedVendor);

                              // Update on backend
                              axiosInstance.put(
                                `/admin/update-vendor-status/${item._id}`,
                                {
                                  activeStatus: updatedStatus,
                                }
                              );
                            }
                          }}
                        > */}
                          {item?.basicInfo?.plan || "N/A"}
                        {/* </button> */}
                        <div className="pt-2">
  {/* <button  className={`px-3 py-1 rounded-lg `}> */}

                          { dayjs(item?.createdAt).format("DD-MM-YYYY")  || "N/A"}
                        {/* </button> */}
                        </div>
                      
                      </td>
                         {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.remarks || "N/A"}
                      </td> */}
                         <td className={`px-6 py-4 ${item?.duplicateInquiry ? 'text-red-600' : ''}`}>
  {item?.remarks?.slice(0,25) || "N/A"}
  
<div className="flex flex-column items-center gap-2">
  {item?.remarks?.length > 25 && (


    <span 
      onClick={() => {
     () => 
      console.log(item,"werf")
      handleRemarksUpdate(item)
      }} 
      className="text-blue-900 cursor-pointer hover:text-blue-600 ml-1">
      ...more
    </span>)}
  <button
                        onClick={() => handleRemarksUpdate(item)}
                        className="p-4 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        title="Update remarks"
                      >
                        <MdEdit className="text-sm" />
                      </button>
  </div>
</td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <div className="flex items-center gap-2 w-4">
                      <span className="flex-1">{item?.remarks?.slice(0,20) || "N/A"}</span> */}
                    
                    {/* </div>
                  </td> */}
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800">
                        <MdOutlineRemoveRedEye
                          className="text-2xl cursor-pointer"
                          onClick={() => {
                            navigate(`/user-details/${item._id}`);
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
 {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Update Remarks
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Vendor: <span className="font-medium">{selectedVendor?.basicInfo?.username}</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Remarks: <span className="font-medium">{selectedVendor?.remarks}</span>
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Remark
              </label>
              <select
                value={selectedRemark}
                onChange={(e) => handleRemarkChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose a remark...</option>
                {predefinedRemarks.map((remark, index) => (
                  <option key={index} value={remark}>
                    {remark}
                  </option>
                ))}
              </select>
            </div>

            {isCustomRemark && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Remark
                </label>
                <textarea
                  value={customRemark}
                  onChange={(e) => setCustomRemark(e.target.value)}
                  placeholder="Enter your custom remark..."
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRemarks}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {vendor && (
        <div className="m-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              className="border rounded px-2 py-1"
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
            <span>
              Page {currentPage + 1} of {pageCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 rounded-lg bg-[#FFFFFF] no-underline border border-[#F1F1F1] text-[#333333] text-base font-semibold font-DMSans cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Prev
            </button>
            <button
              className="px-3 py-2 rounded-lg bg-[#FFFFFF] no-underline border border-[#F1F1F1] text-[#333333] text-base font-semibold font-DMSans cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pageCount - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}


    </div>
  );
};

export default User;