// Loan.js
import { useCallback, useEffect, useState, useContext, useMemo } from "react";
import axiosInstance from "../axiosInstance";

// import { TbDownload } from "react-icons/tb";
// import { FaRegEdit } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { SearchContext } from "../../context/SearchContext";

const Loan = ({ loanType }) => {
  // console.log(loanType)
  const { searchValue } = useContext(SearchContext);
  // console.log(searchValue)

  const navigate = useNavigate();

  const [loanData, setLoanData] = useState(null);
  const [searchLoanData, setSearchLoanData] = useState([]);

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 6;

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
    [] // Dependencies: empty array means this will only be created once
  );

  // get search loans

  const fetchSearchdata = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/subAdmin/search/${searchValue}`);
      setSearchLoanData(res.data);
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  },[searchValue]);
  useEffect(() => {
    if (searchValue) {
      let timeout = setTimeout(() => {
        fetchSearchdata();
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [searchValue,fetchSearchdata]);

  // get all loans
  const fetchLoanData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/subAdmin/manager-loans/${apiEndpoints[loanType]}`);
      setLoanData(res.data.loans);
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  },[apiEndpoints,loanType]);
  useEffect(() => {
    fetchLoanData();
  }, [loanType]);

  const handleViewDetails = async (id) => {
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
        return "#ED2037";
      case "on-hold":
        return "#ED2037";
      default:
        return "inherit";
    }
  };



    // if have to use search them un comment it
    useEffect(() => {
      if (loanData && !searchValue) {
        setItems(loanData);
        setPageCount(Math.ceil(loanData.length / itemsPerPage));
      }
    }, [loanData, searchValue]);
  
     useEffect(() => {
      if (loanData) {
        setItems(loanData);
        setPageCount(Math.ceil(loanData.length / itemsPerPage));
      }
    }, [loanData]);
 
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
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
                  <th
                    scope="col"
                    className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Application Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                   Vendor Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                   Vendor No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Created loan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Required loan
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    City
                  </th> */}
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    State
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              {
              searchValue ? (
                (searchLoanData && searchLoanData.length) > 0 ? (
                  searchLoanData.map((item, i) => {
                    return (
                      <tbody key={i} className="divide-y divide-gray-200">
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[#3B3935] font-normal text-xs md:text-sm">
                        <td className="px-3 py-4">{item?.applicationID}</td>
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
                            {` Rs.${
                              item.details?.personalDetail?.loanAmount || "N/A"
                            }`}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {item.vendorInfo?.city || "N/A"}
                          </td> */}

                          <td
                            style={{ color: getStatusColor(item?.status) }}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                          >
                            {item?.status?.loanStatus || "N/A"}
                          </td>

                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            <MdOutlineRemoveRedEye
                              className="text-2xl cursor-pointer"
                              onClick={() => handleViewDetails(item._id)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                ) : (
                  <div className="w-full h-[20rem] flex items-center justify-center">
                    <h1>No Data Found</h1>
                  </div>
                )
              ) : (
                loanData &&
                items
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((item, i) => (
                    <tbody key={i} className="divide-y divide-gray-200">
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[#3B3935] font-normal text-xs md:text-sm">
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
                          {` Rs.${
                            item.details?.personalDetail?.loanAmount || "N/A"
                          }`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.vendorInfo?.city || "N/A"}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.vendorInfo?.state || "N/A"}
                        </td> */}

                        <td
                          style={{ color: getStatusColor(item?.status) }}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                        >
                          {item?.status?.loanStatus || "N/A"}
                        </td>

                        <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800 ">
                          <MdOutlineRemoveRedEye
                            className="text-2xl cursor-pointer"
                            onClick={() => handleViewDetails(item._id)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))
                )
              
            }
            </table>
          </div>
        </div>
      </div>

      {loanData && (
        <div className="m-4">
          <ReactPaginate
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
          />
        </div>
      )}
    </div>
  );
};

export default Loan;
