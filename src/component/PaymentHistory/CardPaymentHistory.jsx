import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import ReactPaginate from "react-paginate";
import UpdateRate from "./UpdateRate";
import UpdatePaidStatus from "./UpdatePaidStatus";

const CardPaymentHistory = () => {
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [paymentData, setPaymentData] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 8;
  const [paymentId, setPaymentId] = useState('')


  async function FetchUpdateRate(data) {
    try {
      await axiosInstance.post(`/card/get-edit-commision/${paymentId}`, data);

    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
      }
      console.error("Error Config:", error.config);
    }
  }


    // add utr no and paid date
    async function FetchUpdatepaid(data) {
      try {
        await axiosInstance.post(`/card/card-payout/${paymentId}`, data);
      } catch (error) {
        if (error.response) {
          console.error("Error Response:", error.response.data);
          console.error("Error Status:", error.response.status);
          console.error("Error Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error Request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error Message:", error.message);
        }
        console.error("Error Config:", error.config);
      }
    }
  

  const fetchData = async (status) => {
    let apiUrl = "/admin/get-card-payment"; // Default API for "All"

    // Determine API URL based on payment status
    if (status === "Paid") {
      apiUrl = "/admin/get-paid-card-payment";
    } else if (status === "Unpaid") {
      apiUrl = "/admin/get-unpaid-card-payment";
    }

    const { data } = await axiosInstance.get(apiUrl);
    setPaymentData(data.product); 
  };

  useEffect(() => {
    fetchData(paymentStatus);
  }, [paymentStatus]);

  useEffect(() => {
    if (paymentData.length > 0) {
      setItems(paymentData);
      setPageCount(Math.ceil(paymentData.length / itemsPerPage));
    }
  }, [paymentData]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const downLoadFile = async (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const [showpaymentModal, setShowPaymentModal] = useState(false);

  const submitAmount = async(payOut) => {
    // console.log(payOut)
    await FetchUpdateRate(payOut)

    fetchData();
  };



        // check show generate invoice
        const checkshowGenerateInvoice = (randomDate) => {

          if (randomDate) {
            const dateParts = randomDate?.split(" ");
            const day = parseInt(dateParts[0]);
            const month = new Date(Date.parse(`${dateParts[1]} 1, 2023`)).getMonth(); // Convert month name to number
            const year = parseInt(dateParts[2]);
            const randomDateObj = new Date(year, month, day);
      
            // Get today's date
            const today = new Date();
    
            // Calculate the 3rd of the next month relative to the random date
            const nextMonth = new Date(year, month + 1, 3);
      
            // Calculate one month after the random date
            const oneMonthLater = new Date(randomDateObj);
            oneMonthLater.setMonth(randomDateObj.getMonth() + 1);
      
            // Check if today's date is after or equal to the 3rd of the next month
            if (today >= nextMonth || today >= oneMonthLater) {
              // setShowGenerateInvoice(true);
              return false;
            } else {
              // setShowGenerateInvoice(false);
              return true;
            }
          } else {
            return true;
          }
        };



        const [showPaidStatusModal, setShowPaidStatusModal] = useState(false);


        const updatePaymentStatus = async(values)=>{
    
          await FetchUpdatepaid(values)
    
          fetchData();
        } 

  return (
    <div className="flex flex-col bg-[#FFFFFF] m-2 p-2 font-Inter w-full">
      <div className="flex items-center justify-between mb-2 pr-[2rem]">
        <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
          Card Payment History
        </h2>
        <div className="bg-[#F89D28] px-4 py-1 rounded-lg">
          {["All", "Paid", "Unpaid"].map((val, index) => (
            <button
              key={index}
              onClick={() => {
                setPaymentStatus(val);
                setCurrentPage(0);
              }}
              className={`${
                paymentStatus === val
                  ? "text-white border-white"
                  : "text-slate-800 border-transparent hover:text-[#ffffff72]"
              } font-medium border-b-[3px] mx-2 p-1`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      <div className="-m-1.5 overflow-x-auto h-[70vh] overflow-y-scroll">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="text-xs md:text-sm text-[#656575] font-light">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase"
                  >
                    Application ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase"
                  >
                    Bank Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase"
                  >
                    Referral
                  </th>
                  
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase"
                  >
                    UTR No.
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase"
                  >
                    Paid date
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-start text-xs font-semibold text-gray-500 uppercase"
                  >
                    Payout
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-start text-xs font-semibold text-gray-500 uppercase"
                  >
                    Rate
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-start text-xs font-semibold text-gray-500 uppercase"
                  >
                    Billing
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
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item?.applicationID || "NA"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item?.cardName || "NA"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item?.referral || "NA"}
                        </td>
                       
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item?.utrNo || "NA"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item?.paidDate?.split("T")[0] || "NA"}
                        </td>
                       
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item?.payOut || "NA"}
                        </td>



                        <td className="px-4 py-4 whitespace-nowrap text-sm md:text-xl font-medium text-[#33CC66]">

                          {
                            item?.uploadInvoice?.trim() && item?.payOut.trim() ? 
                            <button
                            onClick={() => {
                              downLoadFile(item?.uploadInvoice);
                            }}
                            className={`w-fit px-2 py-1 text-sm rounded-lg bg-[#F89D28] text-white`}
                          >
                            Download
                          </button>
                          :
                          item?.payOut.trim() ? 
                          <button
                          className={`w-fit px-2 py-1 text-sm rounded-lg bg-[#d55050] text-white`}
                        >
                          Pending
                        </button>
                          :
                          <button
                            onClick={() => {
                              setShowPaymentModal(true);
                              setPaymentId(item?._id);
                            }}
                            disabled={checkshowGenerateInvoice(
                              item?.approvedDate || ""
                            )}
                            className={`w-fit px-2 py-1 text-sm rounded-lg ${
                              checkshowGenerateInvoice(
                                item?.approvedDate || ""
                              )
                                ? "bg-[#33cc6696] cursor-not-allowed text-white"
                                : "bg-[#33CC66] text-white"
                            }`}
                          >
                            Generate
                          </button>
                      }
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm md:text-xl font-medium text-[#33CC66]">
                            <button
                            onClick={() => {
                              setShowPaidStatusModal(true);
                              setPaymentId(item?._id);
                            }}
                            disabled={!(item?.uploadInvoice.trim())}
                            className={`
                              ${item?.uploadInvoice.trim() ? 'bg-[#F89D28]': 'bg-[#f89e28c4] cursor-not-allowed'}
                              w-fit px-2 py-1 text-sm rounded-lg  text-white`}
                          >
                            Pay
                          </button>
                        </td>
                        
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="m-4">
        <ReactPaginate
          breakLabel={"..."}
          nextLabel={"Next"}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel={"Prev"}
          containerClassName={
            "w-fit ml-auto mr-0 flex items-center gap-2"
          }
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
          nextClassName={
            currentPage === pageCount - 1 || pageCount === 0
              ? "hidden"
              : ""
          }
        />
      </div>
      {showpaymentModal && (
        <UpdateRate
        showpaymentModal={showpaymentModal}
          setShowPaymentModal={setShowPaymentModal}
          submitAmount={submitAmount}
        />
      )}

{showPaidStatusModal && (
        <UpdatePaidStatus
          showPaidStatusModal={showPaidStatusModal}
          setShowPaidStatusModal={setShowPaidStatusModal}
          updatePaymentStatus={updatePaymentStatus}
        />
      )}
    </div>
  );
};

export default CardPaymentHistory;
