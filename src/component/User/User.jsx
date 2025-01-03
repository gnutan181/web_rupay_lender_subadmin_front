// import axios from "axios";
import { useEffect, useState, useCallback, useContext } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import ReactPaginate from "react-paginate";
import { SearchContext } from "../../context/SearchContext";

const User = () => {
  const { searchValue } = useContext(SearchContext);
  const [searchvendor, setSearchvendor] = useState([]);

  const navigate = useNavigate();
  const [vendor, setVendor] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 8;

  const fetchData = async () => {
    const { data } = await axiosInstance.get("/subAdmin/all-vendors");
    setVendor(data.vendors);

    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);

  // if have to use search them un comment it
  useEffect(() => {
    if (vendor && !searchValue) {
      setItems(vendor);
      setPageCount(Math.ceil(vendor.length / itemsPerPage));
    }
  }, [vendor, searchValue]);

  useEffect(() => {
    if (vendor) {
      setItems(vendor);
      setPageCount(Math.ceil(vendor.length / itemsPerPage));
    }
  }, [vendor]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // get search loans

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
  }, [searchValue]);
  useEffect(() => {
    if (searchValue) {
      let timeout = setTimeout(() => {
        fetchSearchdata();
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [searchValue, fetchSearchdata]);


  return (
    <div className="flex flex-col bg-[#FFFFFF]  m-2 p-2 font-Inter w-full">
      <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
        Vendors
      </h2>
      <div className="-m-1.5 overflow-x-auto h-[70vh] overflow-y-scroll">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {/* <th
                    scope="col"
                    className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    No.
                  </th> */}
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
                    Email
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
                    Referral
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    State
                  </th>
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
                (searchvendor && searchvendor.length) > 0 ? (
                  items
                    .slice(
                      currentPage * itemsPerPage,
                      (currentPage + 1) * itemsPerPage
                    )
                    .map((item, i) => {
                      return (
                        <tbody key={i} className="divide-y divide-gray-200">
                          <tr className="bg-white border-b  text-[#3B3935] font-normal text-xs md:text-sm">
                            <td className="px-3 py-4">{i + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {item.basicInfo?.username || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {item.basicInfo?.email || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                              {item.basicInfo?.mobile || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {item?.referral || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {item.basicInfo?.city || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              {item.basicInfo?.state || "N/A"}
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800 ">
                              <MdOutlineRemoveRedEye
                                className="text-2xl cursor-pointer"
                                onClick={() => {
                                  navigate(`/user-details/${item._id}`);
                                }}
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
                vendor &&
                items
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((item, i) => (
                    <tbody key={i} className="divide-y divide-gray-200">
                      <tr className="bg-white border-b  text-[#3B3935] font-normal text-xs md:text-sm">
                        {/* <td className="px-3 py-4">{i + 1}</td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.basicInfo?.username || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item.basicInfo?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item.basicInfo?.mobile || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.basicInfo?.referral || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item?.basicInfo?.city || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item?.basicInfo?.state || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {item?.activeStatus || "N/A"}
                        </td>
                        <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800 ">
                          <MdOutlineRemoveRedEye
                            className="text-2xl cursor-pointer"
                            onClick={() => {
                              navigate(`/user-details/${item._id}`);
                            }}
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

      {vendor ? (
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
      ) : null}
    </div>
  );
};

export default User;
