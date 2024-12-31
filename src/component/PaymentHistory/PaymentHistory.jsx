import  { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { FaRegEdit } from "react-icons/fa";
import axiosInstance from "../axiosInstance";

import ReactPaginate from "react-paginate";

const PaymentHistory = () => {
//   const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState('paid')

  const [paymentData, setPaymentData] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 8;

  const fetchData = async () => {
    const { data } = await axiosInstance.get("/admin/payment-history");
    setPaymentData(data.payments);
    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (paymentData) {
      setItems(paymentData);
      setPageCount(Math.ceil(paymentData.length / itemsPerPage));
    }
  }, [paymentData]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

//   const editPayment = (item) => {
//     navigate(`/edit-payment/${item._id}`, { state: item });
//   };

  return (
    <div className="bg-[#FFFFFF] m-4 p-2 font-Inter">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
          Payment History
        </h2>
        <div className="bg-[#3B3935] px-4 py-1 rounded-lg">
          <button onClick={()=>{setPaymentStatus('paid')}} className={`${paymentStatus === 'paid' ? 'text-white border-white': 'text-black border-transparent hover:text-[#ffffff72] '} border-b-[3px] mx-2 p-1`}>Paid</button>
          <button onClick={()=>{setPaymentStatus('unpaid')}} className={`${paymentStatus === 'unpaid' ? 'text-white border-white': 'text-black border-transparent hover:text-[#ffffff72]'} border-b-[3px] mx-2 p-1`}>Unpaid</button>
        </div>
        <Link
          to="/add-payment"
          className={`bg-[#F89D28] block py-2 px-4 text-[#FFFFFF] font-medium text-sm rounded-md hover:bg-[#f6bb45] md:text-base`}
        >
          + Add new payment
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <div className="relative overflow-x-auto w-full min-h-[65vh] h-[70vh] overflow-y-scroll">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed">
            <thead className="text-xs md:text-sm text-[#656575] font-light">
              <tr>
              <th scope="col" className="px-3 py-3 text-start text-xs font-semibold text-gray-500 uppercase">
                  Transaction <br /> id
                </th>
                <th scope="col" className="px-3 py-3 text-start text-xs font-semibold text-gray-500 uppercase">
                  Name
                </th>
                <th scope="col" className="px-3 py-3 text-start text-xs font-semibold text-gray-500 uppercase">
                  Mobile
                </th>
                <th scope="col" className="px-3 py-3 text-start text-xs font-semibold text-gray-500 uppercase">
                  Referral
                </th>
                <th scope="col" className="px-3 py-3 text-start text-xs font-semibold text-gray-500 uppercase">
                  Type
                </th>
                <th scope="col" className="px-3 py-3 text-start text-xs font-semibold text-gray-500 uppercase">
                  Amount
                </th>
                <th scope="col" className="px-3 py-3 text-start text-xs font-semibold text-gray-500 uppercase">
                  Transaction date
                </th>
                <th scope="col" className="px-3 py-3 text-start text-xs font-semibold text-gray-500 uppercase">
                  Mode
                </th>
                <th scope="col" className="px-3 py-3 text-start text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentData &&
                items
                  .slice(
                    currentPage * itemsPerPage,
                    (currentPage + 1) * itemsPerPage
                  )
                  .map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[#3B3935] font-normal text-xs md:text-sm"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.transactionId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.mobile}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.referral}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item?.transactionDate?.split('T')[0]}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#33CC66]">{item.mode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Pending</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

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
    </div>
  );
};

export default PaymentHistory;
