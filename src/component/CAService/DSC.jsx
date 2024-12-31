// import axios from "axios";
import { useEffect, useState, useCallback, useContext } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import ReactPaginate from "react-paginate";

const DSC = () => {

  const navigate = useNavigate();
  const [dSC, setDSC] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 8;

  const fetchData = async () => {
    const { data } = await axiosInstance.get("/ca/dsc");

    // adjust this response
    setDSC(data.details);

    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (dSC) {
      setItems(dSC);
      setPageCount(Math.ceil(dSC.length / itemsPerPage));
    }
  }, [dSC]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const viewServiceDetails = (serviceItemId)=>{
    navigate(`/ca-service-details/DSC/${serviceItemId}`)
  }


  return (
    <div className="flex flex-col bg-[#FFFFFF]  m-2 p-2 font-Inter w-full">
      <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
        DSC
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
                    No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    DOB
                  </th> */}
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Gender
                  </th> */}
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
                    pan Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Pin
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
                    Amount
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
                dSC ?
                items
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((item, i) => (
                    <tbody key={i} className="divide-y divide-gray-200">
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[#3B3935] font-normal text-xs md:text-sm">
                      <td className="px-3 py-4">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.name || "N/A"}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.dateOfBirth.split('T')[0] || "N/A"}
                      </td> */}
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.gender || "N/A"}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.mobile || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.panNumber || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.pinCode || "N/A"}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.city || "N/A"}
                      </td> */}
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.state || "N/A"}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.amount || "N/A"}
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


                  : 
                  <div>no data found</div>
              }
            </table>
          </div>
        </div>
      </div>

      {dSC ? (
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

export default DSC;
