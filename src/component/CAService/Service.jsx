// Loan.js
import { useCallback, useEffect, useState, useContext, useMemo } from "react";
import axiosInstance from "../axiosInstance";
import PropTypes from 'prop-types';

// import { TbDownload } from "react-icons/tb";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { SearchContext } from "../../context/SearchContext";

const Service = ({ serviceType }) => {

    console.log('we are in services pages')
  const { searchValue } = useContext(SearchContext);

  console.log(serviceType)

  const navigate = useNavigate();

  const [loanData, setLoanData] = useState(null);
  const [searchLoanData, setSearchLoanData] = useState([]);

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 6;

//   element={isToken ? <Service serviceType="GST-Registration" /> : <Navigate to='/login'/>}

//       element={isToken ? <Service serviceType="GST-IncomeTax-Return" /> : <Navigate to='/login'/>}

//       element={isToken ? <Service serviceType="New-Pancard" /> : <Navigate to='/login'/>}
//       element={isToken ? <Service serviceType="Duplicate-Pan" /> : <Navigate to='/login'/>}
//       element={isToken ? <Service serviceType="Correction-Pan" /> : <Navigate to='/login'/>}
//       element={isToken ? <Service serviceType="Food-License" /> : <Navigate to='/login'/>}

//       element={isToken ? <Service serviceType="Trademark" /> : <Navigate to='/login'/>}
//       element={isToken ? <Service serviceType="DSC" /> : <Navigate to='/login'/>}
//       element={isToken ? <Service serviceType="MSME" /> : <Navigate to='/login'/>}

  const apiEndpoints =useMemo(() => ({
    'GST-Registration' : "/ca/gst",
    "GST-IncomeTax-Return": "/gst/gst-return",
    "Company-Registration" : '/ca/business-Registration',
    "New-Pancard": "/ca/pancard",
    "Duplicate-Pan": "/ca/duplicate-Pan",
    "Correction-Pan": "/ca/correction-Pan",
    "Food-License": "/ca/food-License",
    "Trademark": "/ca/trademark",
    "DSC": "/ca/dsc",
    "MSME": "/ca/msme",
  }), [])
 

  // get search loans

  const fetchSearchdata = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/admin/search/${searchValue}`);
      setSearchLoanData(res.data);
      setItems(res.data)
      setPageCount(Math.ceil(res.data.length / itemsPerPage));
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
  },[searchValue, fetchSearchdata]);

  // get all loans
  const fetchLoanData = useCallback(async () => {
    try {
      // const res = await axiosInstance.get(apiEndpoints[serviceType]);
      const res = await axiosInstance.get(`${apiEndpoints[serviceType]}`);
    // const res = await axiosInstance.get(`/admin/get-loans/${apiEndpoints[loanType]}`);
    //   const res = await axiosInstance.get(`/ca/${serviceType}`);
      console.log(res)
      setLoanData(res.data.details);
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  },[apiEndpoints,serviceType]);



  useEffect(() => {
    fetchLoanData();
  }, [fetchLoanData]);

//   const handleViewDetails = async (id) => {
//     navigate(`/${serviceType}-loan-details/${id}`);
//   };

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


  const viewServiceDetails = (serviceItemId)=>{
    navigate(`/ca-service-details/${serviceType}/${serviceItemId}`)
  }


//   /ca-service-details/trademark/43434sfsfd

  return (
    <div className="flex flex-col bg-[#FFFFFF]  m-2 p-2 font-Inter w-full">
      <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2 capitalize">
        {serviceType?.replaceAll('-',' ')}
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
                   Application Id.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Phone
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
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    City
                  </th>
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
              {searchValue ? (
                (searchLoanData && searchLoanData.length) > 0 ? (
                  items
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((item, i) => {
                    return (
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
                              onClick={() => viewServiceDetails(item._id)}
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
                        {/* <td className="px-3 py-4">{item.vendorId}</td> */}
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
                            onClick={() => viewServiceDetails(item._id)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))
              )}
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
Service.propTypes = {
  serviceType: PropTypes.oneOf([
    'GST-Registration',
    'GST-IncomeTax-Return',
    'Company-Registration',
    'New-Pancard',
    'Duplicate-Pan',
    'Correction-Pan',
    'Food-License',
    'Trademark',
    'DSC',
    'MSME'
  ]).isRequired,
};
export default Service;
