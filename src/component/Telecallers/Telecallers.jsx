


import { useEffect, useState, useCallback, useContext } from "react";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { MdOutlineRemoveRedEye, MdEdit, MdClose } from 'react-icons/md';
import {  format } from "date-fns";

import { SearchContext } from "../../context/SearchContext";
import dayjs from "dayjs";

const Telecallers = () => {
  const { searchValue } = useContext(SearchContext);
  const [searchvendor, setSearchvendor] = useState([]);

  const navigate = useNavigate();
  const [vendor, setVendor] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
 



  const fetchData = async () => {
    const { data } = await axiosInstance.get("/subAdmin/get-telecallers");
    setVendor(data?.telecallers);
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


 
  

  

  return (
    <div className="flex flex-col bg-[#FFFFFF]  m-2 p-2 font-Inter w-full">
      <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
        Telecallers
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
                    Telecaller ID
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Referral
                  </th>
       <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    City
                  </th>
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    State
                  </th>
                
                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                   Join date
                  </th>
                  
               
                </tr>
              </thead>
            
                {/* // .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) */}
                 {vendor?.map((item, i) => (
                  <tbody key={i} className="divide-y divide-gray-200">
                    <tr className="bg-white border-b text-[#3B3935] font-normal text-xs md:text-sm">
                   
                      <td className="px-3 py-4">{item?.venderID || "NA"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.name || "N/A"}
                      </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.mobile || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.referral || "N/A"}
                      </td>
                   
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.state || "N/A"}
                      </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.city || "N/A"}
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.product || "N/A"}
                      </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {format(new Date(item?.createdAt), "yyyy-MM-dd")  || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Telecallers;