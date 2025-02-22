
// // Updated Loan.js
// import { useCallback, useEffect, useState, useContext, useMemo } from "react";
// import axiosInstance from "../axiosInstance";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import { SearchContext } from "../../context/SearchContext";
// import PropTypes from 'prop-types';

// const Loan = ({ loanType }) => {
//   const { searchValue } = useContext(SearchContext);
//   const navigate = useNavigate();
//   const [loanData, setLoanData] = useState(null);
//   const [searchLoanData, setSearchLoanData] = useState([]);
//   const [items, setItems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageCount, setPageCount] = useState(0);
//   const [managers, setManagers] = useState([]);
//   const [loadingManager, setLoadingManager] = useState(false);
//   const [loadingMove, setLoadingMove] = useState({});
//   const itemsPerPage = 6;

//   const apiEndpoints = useMemo(
//     () => ({
//       home: "home-loan",
//       business: "business-loan",
//       personal: "personal-loan",
//       plbt: "personal-loan-balance-transfer",
//       lap: "loan-against-property",
//       hlbt: "home-loan-balance-transfer",
//       usedcarbt: "used-car-loan-bt",
//       usedcar: "used-car-loan",
//       lapbt: "loan-against-property-bt",
//     }),
//     []
//   );

//   const fetchSearchdata = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get(`/subAdmin/search/${searchValue}`);
//       setSearchLoanData(res.data);
//     } catch (error) {
//       console.error("Error fetching loan data:", error);
//     }
//   }, [searchValue]);

//   useEffect(() => {
//     if (searchValue) {
//       let timeout = setTimeout(() => {
//         fetchSearchdata();
//       }, 800);

//       return () => clearTimeout(timeout);
//     }
//   }, [searchValue, fetchSearchdata]);

//   const fetchLoanData = useCallback(async () => {
//     try {
//       const res = await axiosInstance.get(`/subAdmin/manager-loans/${apiEndpoints[loanType]}`);
//       setLoanData(res?.data?.loans);
//     } catch (error) {
//       console.error("Error fetching loan data:", error);
//     }
//   }, [apiEndpoints, loanType]);

//   useEffect(() => {
//     fetchLoanData();
//   }, [loanType]);

//   const fetchManagers = useCallback(async () => {
//     setLoadingManager(true);
//     try {
//       const res = await axiosInstance.get(`/subAdmin/get-manager`);
//       setManagers(res.data.subAdmin);
//     } catch (error) {
//       console.error("Error fetching managers:", error);
//     } finally {
//       setLoadingManager(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchManagers();
//   }, [fetchManagers]);

//   const handleMoveTo = async (leadId, movedTo) => {
//     setLoadingMove((prev) => ({ ...prev, [leadId]: true }));
//     try {
//       await axiosInstance.patch(`/subAdmin/move-to/${leadId}`, { movedTo });
//       alert(`Lead moved to ${movedTo}`);
//       fetchLoanData();
//     } catch (error) {
//       console.error("Error moving lead:", error);
//       alert("Lead not moved");
//     } finally {
//       setLoadingMove((prev) => ({ ...prev, [leadId]: false }));
//     }
//   };

//   const handleViewDetails = (id) => {
//     navigate(`/${loanType}-loan-details/${id}`);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Process":
//         return "#33CC66";
//       case "Completed":
//         return "#FEDB3F";
//       case "Pending":
//         return "#F48C7F";
//       case "Cancel":
//       case "on-hold":
//         return "#ED2037";
//       default:
//         return "inherit";
//     }
//   };

//   useEffect(() => {
//     if (loanData && !searchValue) {
//       setItems(loanData);
//       setPageCount(Math.ceil(loanData.length / itemsPerPage));
//     }
//   }, [loanData, searchValue]);

//   useEffect(() => {
//     if (loanData) {
//       setItems(loanData);
//       setPageCount(Math.ceil(loanData.length / itemsPerPage));
//     }
//   }, [loanData]);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   return (
//     <div className="flex flex-col bg-[#FFFFFF]  m-2 p-2 font-Inter w-full">
//       <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2 capitalize">
//         {loanType}
//       </h2>

//       <div className="-m-1.5 overflow-x-auto h-[70vh] overflow-y-scroll">
//         <div className="p-1.5 min-w-full inline-block align-middle">
//           <div className="overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase">
//                     Application Id
//                   </th>
//                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
//                     Vendor Name
//                   </th>
//                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
//                     Vendor No.
//                   </th>
//                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
//                     Created loan
//                   </th>
//                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
//                     Required loan
//                   </th>
//                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
//                     Action
//                   </th>
//                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
//                     Moved To
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(searchValue ? searchLoanData : items)
//                   .slice(
//                     currentPage * itemsPerPage,
//                     (currentPage + 1) * itemsPerPage
//                   )
//                   .map((item, i) => (
//                     <tr
//                       key={i}
//                       className="bg-white border-b text-[#3B3935] font-normal text-xs md:text-sm"
//                     >
//                       <td className="px-3 py-4">{item.applicationID}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {item.vendorInfo?.username || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {item.vendorInfo?.mobile || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
//                         {item?.createdLoan || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {`Rs.${item.details?.personalDetail?.loanAmount || "N/A"}`}
//                       </td>
//                       <td
//                         style={{ color: getStatusColor(item?.status) }}
//                         className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
//                       >
//                         {item?.status?.loanStatus || "N/A"}
//                       </td>
//                       <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800">
//                         <MdOutlineRemoveRedEye
//                           className="text-2xl cursor-pointer"
//                           onClick={() => handleViewDetails(item._id)}
//                         />
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {loadingManager ? (
//                           <div className="spinner">Loading...</div>
//                         ) : (
//                           <div className="flex items-center gap-2">
//                             <select
//                               className="border rounded px-2 py-1"
//                               onChange={(e) => handleMoveTo(item._id, e.target.value)}
//                               defaultValue=""
//                             >
//                               <option value="" disabled>
//                                 Move To
//                               </option>
//                               {managers.map((manager) => (
//                                 <option key={manager?._id} value={manager?.username}>
//                                   {manager?.username}
//                                 </option>
//                               ))}
//                             </select>
//                             {loadingMove[item._id] && <div className="spinner">...</div>}
//                           </div>
//                         )}
//                         {item?.movedTo || "Not moved To anyone"}
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {loanData && (
//         <div className="m-4">
//           <ReactPaginate
//             breakLabel={"..."}
//             nextLabel={"Next"}
//             onPageChange={handlePageClick}
//             pageCount={pageCount}
//             previousLabel={"Prev"}
//             containerClassName={"w-fit ml-auto mr-0 flex items-center gap-2"}
//             pageLinkClassName={
//               "px-3 py-2 rounded-lg bg-[#FFFFFF] no-underline border border-[#F1F1F1] text-[#333333] text-base font-semibold font-DMSans cursor-pointer"
//             }
//             previousLinkClassName={
//               "px-3 py-2 text-[#333333] no-underline text-base font-semibold font-DMSans cursor-pointer"
//             }
//             nextLinkClassName={
//               "px-3 py-2 text-[#333333] no-underline text-base font-semibold font-DMSans cursor-pointer"
//             }
//             breakClassName="px-3 rounded-lg bg-[#FFFFFF] no-underline border border-[#F1F1F1] text-[#333333] text-base font-semibold font-DMSans"
//             activeLinkClassName="px-3 py-2 rounded-lg no-underline bg-amber-500 bg-orange-500 border border-[#F1F1F1] text-base font-semibold font-DMSans cursor-pointer"
//             previousClassName={currentPage === 0 ? "hidden" : ""}
//             nextClassName={currentPage === pageCount - 1 ? "hidden" : ""}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
// Loan.propTypes = {
//   loanType: PropTypes.string, 
// };
// export default Loan;


// upadte pagination page 

import { useCallback, useEffect, useState, useContext, useMemo } from "react";
import axiosInstance from "../axiosInstance";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";
import { SearchContext } from "../../context/SearchContext";
import PropTypes from 'prop-types';

const Loan = ({ loanType }) => {
  const { searchValue } = useContext(SearchContext);
  const navigate = useNavigate();
  const [loanData, setLoanData] = useState(null);
  const [searchLoanData, setSearchLoanData] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [managers, setManagers] = useState([]);
  const [loadingManager, setLoadingManager] = useState(false);
  const [loadingMove, setLoadingMove] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(6); // New state for items per page

  const apiEndpoints = useMemo(
    () => ({
      home: "home-loan",
      business: "business-loan",
      personal: "personal-loan",
      plbt: "personal-loan-balance-transfer",
      lap: "loan-against-property",
      hlbt: "home-loan-balance-transfer",
      usedcarbt: "used-car-loan-bt",
      usedcar: "used-car-loan",
      lapbt: "loan-against-property-bt",
    }),
    []
  );

  const fetchSearchdata = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/subAdmin/search/${searchValue}`);
      setSearchLoanData(res.data);
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue) {
      let timeout = setTimeout(() => {
        fetchSearchdata();
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [searchValue, fetchSearchdata]);

  const fetchLoanData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/subAdmin/manager-loans/${apiEndpoints[loanType]}`);
      setLoanData(res?.data?.loans);
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  }, [apiEndpoints, loanType]);

  useEffect(() => {
    fetchLoanData();
  }, [loanType]);

  const fetchManagers = useCallback(async () => {
    setLoadingManager(true);
    try {
      const res = await axiosInstance.get(`/subAdmin/get-manager`);
      setManagers(res.data.subAdmin);
    } catch (error) {
      console.error("Error fetching managers:", error);
    } finally {
      setLoadingManager(false);
    }
  }, []);

  useEffect(() => {
    fetchManagers();
  }, [fetchManagers]);

  const handleMoveTo = async (leadId, movedTo) => {
    setLoadingMove((prev) => ({ ...prev, [leadId]: true }));
    try {
      await axiosInstance.patch(`/subAdmin/move-to/${leadId}`, { movedTo });
      alert(`Lead moved to ${movedTo}`);
      fetchLoanData();
    } catch (error) {
      console.error("Error moving lead:", error);
      alert("Lead not moved");
    } finally {
      setLoadingMove((prev) => ({ ...prev, [leadId]: false }));
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/${loanType}-loan-details/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Process":
        return "#33CC66";
      case "Completed":
        return "#FEDB3F";
      case "Pending":
        return "#F48C7F";
      case "Cancel":
      case "on-hold":
        return "#ED2037";
      default:
        return "inherit";
    }
  };

  useEffect(() => {
    if (loanData && !searchValue) {
      setItems(loanData);
      setPageCount(Math.ceil(loanData.length / itemsPerPage));
    }
  }, [loanData, searchValue, itemsPerPage]); // Add itemsPerPage to dependency array

  useEffect(() => {
    if (loanData) {
      setItems(loanData);
      setPageCount(Math.ceil(loanData.length / itemsPerPage));
    }
  }, [loanData, itemsPerPage]); // Add itemsPerPage to dependency array

  // const handlePageClick = ({ selected }) => {
  //   setCurrentPage(selected);
  // };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0); // Reset to the first page when changing items per page
  };

  return (
    <div className="flex flex-col bg-[#FFFFFF]  m-2 p-2 font-Inter w-full">
      <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2 capitalize">
        {loanType}
      </h2>

      <div className="-m-1.5 overflow-x-auto h-[70vh] overflow-y-scroll">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Application Id
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Vendor Name
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Vendor No.
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Created loan
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Required loan
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                    Moved To
                  </th>
                </tr>
              </thead>
              <tbody>
                {(searchValue ? searchLoanData : items)
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((item, i) => (
                    <tr
                      key={i}
                      className="bg-white border-b text-[#3B3935] font-normal text-xs md:text-sm"
                    >
                      <td className="px-3 py-4">{item.applicationID}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.vendorInfo?.username || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.vendorInfo?.mobile || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.createdLoan || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {`Rs.${item.details?.personalDetail?.loanAmount || "N/A"}`}
                      </td>
                      <td
                        style={{ color: getStatusColor(item?.status) }}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                      >
                        {item?.status?.loanStatus || "N/A"}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800">
                        <MdOutlineRemoveRedEye
                          className="text-2xl cursor-pointer"
                          onClick={() => handleViewDetails(item._id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {loadingManager ? (
                          <div className="spinner">Loading...</div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <select
                              className="border rounded px-2 py-1"
                              onChange={(e) => handleMoveTo(item._id, e.target.value)}
                              defaultValue=""
                            >
                              <option value="" disabled>
                                Move To
                              </option>
                              {managers.map((manager) => (
                                <option key={manager?._id} value={manager?.username}>
                                  {manager?.username}
                                </option>
                              ))}
                            </select>
                            {loadingMove[item._id] && <div className="spinner">...</div>}
                          </div>
                        )}
                        {item?.movedTo || "Not moved To anyone"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {loanData && (
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
          {/* <ReactPaginate
            breakLabel={"..."}
            nextLabel={"Next"}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel={"Prev"}
            containerClassName={"w-fit ml-auto mr-0 flex items-center gap-2"}
            pageLinkClassName={
              "px-3 py-2 rounded-lg bg-[#FFFFFF] no-underline border border-[#F1F1F1] text-[#333333] text-base font-semibold font-DMSans cursor-pointer"
            }
            previousLinkClassName={
              "px-3 py-2 text-[#333333] no-underline text-base font-semibold font-DMSans cursor-pointer"
            }
            nextLinkClassName={
              "px-3 py-2 text-[#333333] no-underline text-base font-semibold font-DMSans cursor-pointer"
            }
            breakClassName="px-3 rounded-lg bg-[#FFFFFF] no-underline border border-[#F1F1F1] text-[#333333] text-base font-semibold font-DMSans"
            activeLinkClassName="px-3 py-2 rounded-lg no-underline bg-amber-500 bg-orange-500 border border-[#F1F1F1] text-base font-semibold font-DMSans cursor-pointer"
            previousClassName={currentPage === 0 ? "hidden" : ""}
            nextClassName={currentPage === pageCount - 1 ? "hidden" : ""}
          /> */}
        </div>
      )}
    </div>
  );
};
Loan.propTypes = {
  loanType: PropTypes.string,
};
export default Loan;