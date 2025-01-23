import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import ReactPaginate from "react-paginate";
import UpdatePaymentAmount from "./UpdatePaymentAmount";

import UpdatePaidStatus from "./UpdatePaidStatus";

const LoanPaymentHistory = () => {
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [paymentData, setPaymentData] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 8;
  const [paymentId, setPaymentId] = useState("");


  // add rate
  async function FetchUpdateRate(data) {
    try {
      await axiosInstance.put(`/admin/update-loan-commission/${paymentId}`, data);
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
      await axiosInstance.post(`/admin/loan-payout/${paymentId}`, data);
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
    let apiUrl = "/admin/get-loan-payment"; // Default API for "All"

    // Determine API URL based on payment status
    if (status === "Paid") {
      apiUrl = "/admin/get-paid-loan-payment";
    } else if (status === "Unpaid") {
      apiUrl = "/admin/get-unpaid-loan-payment";
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
//   const generateInvoice = async () => {
//     try {
//       const pdf = new jsPDF();
  
//       const addSectionTitle = (title, y) => {
//         pdf.setFontSize(14);
//         pdf.setTextColor(0);
//         pdf.text(title, 10, y);
//         return y + 10;
//       };
  
//       const drawTableBorders = (x, y, colWidths, rowHeight, rows) => {
//         const tableWidth = colWidths.reduce((a, b) => a + b, 0);
//         rows.forEach((_, rowIndex) => {
//           colWidths.reduce((xPos, colWidth, colIndex) => {
//             pdf.rect(xPos, y + rowIndex * rowHeight, colWidth, rowHeight);
//             return xPos + colWidth;
//           }, x);
//         });
//         return y + rows.length * rowHeight;
//       };
//       const addTable = (rows, x, y) => {
//         pdf.setFontSize(8);
//     pdf.setFont("helvetica", "normal");
//     const colWidth = [30, 30,40,40,40]; // Width for each column
//     const rowHeights = 30; // Height for each row
//   rows.forEach((row, rowIndex) => {
//     row.forEach((cell, colIndex) => {
//       pdf.text(cell, x + 5 + colIndex * colWidth[colIndex], y + rowIndex * rowHeights + 7); // Add some padding to the text
//     });
//   });
//   y = drawTableBorders(x, y, colWidth, rowHeights, rows);
//   return y;
// };

//       const addTableRow = (rows, x, y) => {
//               pdf.setFontSize(8);
//           pdf.setFont("helvetica", "normal");
//           const colWidths = [90,90]; // Width for each column
//           const rowHeight = 10; // Height for each row
//         rows.forEach((row, rowIndex) => {

//           console.log("r",pdf.getTextWidth(row[rowIndex]))
//           // console.log(row[rowIndex].startWith("Address"),rowIndex)
//           row.forEach((cell, colIndex) => {
//             pdf.text(cell, x + 5 + colIndex * colWidths[colIndex], y + rowIndex * rowHeight + 7); // Add some padding to the text
//           });
//         });
  
//         // Draw table borders
//         y = drawTableBorders(x, y, colWidths, rowHeight, rows);
//         return y;
//       };
  
//       const addSectionWithTable = (title, data, x, y) => {
//         y = addSectionTitle(title, y +10);
  
//         const rows = Object.keys(data).reduce((acc, key, index) => {
//           if (index % 2 === 0) {
//             const value1 = `${key}: ${data[key] || "N/A"}`;
//             const key2 = Object.keys(data)[index + 1];
//             const value2 = key2 ? `${key2}: ${data[key2] || "N/A"}` : "";
//             acc.push([value1, value2]);
//           }
//           return acc;
//         }, []);
  
//         y = addTableRow(rows, x, y);
//         y = checkPageEnd(y);
  
//         return y;
//       };
  
//       const checkPageEnd = (y) => {
//         if (pdf.internal.pageSize.height - y > 70) {
//           return y;
//         } else {
//           pdf.addPage();
//           return 20;
//         }
//       };
  
//       let y = 10;
//       // if (loanData) 
//         pdf.setFontSize(16);
//         pdf.setTextColor(0);
//         pdf.text("Loan Details", 85, y);
//         y += 20;
  
//         y = addSectionWithTable(
//                   "details of service Provider",
//                   {
//                     "GSTIN": "07AAHCC1087B1Z0",
//                     "Name": "CORHAVEN TECHNOLOGIES PRIVATE LIMITED",
//                     "State": "Delhi",
//                     "State Code": "07",
//                     "Address": "DELHI 405 DEEPSHIKHA,BUILDING DEEPSHIKHA,BUILDING RAJENDRA PLACE",
               
//                   },
//                   10,
//                   y
//                 );
          
//                 y = addSectionWithTable(
//                   "details of service Provider",
//                   {
//                     "GSTIN": "09AABCB1518L1ZQ",
//                     "Name": "Bajaj Finance Limited",
//                     "Address": "Unit No. 201 to 205, 2nd Floor",
//                     "State": "UTTAR PRADESH",
//                     "State Code": "09",
               
//                   },
//                   10,
//                   y
//                 );
  
//       //   if (loanData?.propertyDetail) {
//       //     y = addSectionWithTable(
//       //       "Property Details",
//       //       {
//       //         "Property Type": loanData?.propertyDetail?.propertyType,
//       //         "Market Value": loanData?.propertyDetail?.marketValue,
//       //         "Loan Amount": loanData?.propertyDetail?.loanAmount,
//       //       },
//       //       10,
//       //       y
//       //     );
//       //   }
//       //  if(loanData?.runningLoan.option == 'yes'){
//       //   y = addSectionWithTable(
//       //     `Running Loans : ${loanData?.runningLoan.loans.length}`,
//       //     {
         
//       //       Bank: loanData?.runningLoan.loans?.map((item) => item.bank).join(", "),
//       //       "Loan Type": loanData?.runningLoan.loans?.map((item) => item.loanType).join(", "),
//       //       "Loan Amount": loanData?.runningLoan.loans?.map((item) => item.loanAmount).join(", "),
//       //       "Monthly EMI": loanData?.runningLoan.loans?.map((item) => item.monthlyEmi).join(", "),
//       //       Vintage: loanData?.runningLoan.loans?.map((item) => item.vintage).join(", "),
//       //     },
//       //     10,
//       //     y
//       //   );
//       //  }
       
      
  
//       pdf.save("user_details.pdf");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };

// Function to calculate the maximum number of lines for a given text width
// const calculateMaxLines = (text, maxWidth, pdf) => {
//   const lines = pdf.splitTextToSize(text, maxWidth);
// console.log("te",text.length)
//   console.log("lines-k",lines) // Split text into multiple lines based on maxWidth
//   console.log("lines-l",lines.length) // Split text into multiple lines based on maxWidth

//   return lines.length; // Return the number of lines
// };

// const generateInvoice = async () => {
//   try {
//     const pdf = new jsPDF('landscape');

//     // Function to add section titles with extra spacing
//     const addSectionTitle = (title, y) => {
//       pdf.setFontSize(8);
//       pdf.setTextColor(0);
//       pdf.text(title, 10, y);
//       return y + 8;
//     };

//     // Function to draw table borders and handle text wrapping
//     const drawTableBordersAndText = (x, y, colWidths, rows) => {
//       rows.forEach((row, rowIndex) => {
//         // Determine the maximum row height based on text overflow
//         const maxRowHeight = Math.max(
//           ...row.map((cell, colIndex) => {
//             const cellText = cell || ''; // Fallback to empty string if cell is undefined or null
//             const maxLines = calculateMaxLines(cellText, colWidths[colIndex] - 5, pdf); // Calculate max lines needed for text
//             return maxLines * 10; // Estimate row height needed for text (7 is an approximate line height)
//           })
//         );
//         console.log("maxRowHeight",maxRowHeight)

//         row.forEach((cell, colIndex) => {
//           const cellText = cell || ''; // Fallback to empty string if cell is undefined or null
//           const lines = pdf.splitTextToSize(cellText, colWidths[colIndex] - 5); // Split text into multiple lines to fit column width
//           console.log(" x + 2 + colIndex * colWidths[colIndex]",x + 2 + colIndex * colWidths[colIndex])
// console.log(" y + 7 + rowIndex * maxRowHeight", y + 7 + rowIndex * maxRowHeight)
//           pdf.text(lines, x + 2 + colIndex * colWidths[colIndex], y + 7 + rowIndex * 10); // Draw text inside cell with adjusted y

//           // Draw cell borders
//           pdf.rect(x + colIndex * colWidths[colIndex], y + rowIndex * 10, colWidths[colIndex], maxRowHeight);
//         });
//       });

//       // Return updated y position after table rows
//       const totalHeight = rows.reduce((totalHeight, row) => {
//         const maxLines = Math.max(...row.map(cell => calculateMaxLines(cell || '', 80, pdf))); // Recalculate row height based on the number of lines in each row
//         return totalHeight + maxLines * 7; // Return total height of table
//       }, 0);

//       return y + totalHeight; // Update y position after table
//     };

//     const addTableRow = (rows, x, y) => {
//       pdf.setFontSize(8);
//       pdf.setFont("helvetica", "normal");
//       const colWidths = [90, 90]; // Set column widths
//       y = drawTableBordersAndText(x, y, colWidths, rows); // Draw the table
//       return y; // Return updated y position
//     };

//     const addSectionWithTable = (title, data, x, y) => {
//       y = addSectionTitle(title, y); // Add the section title

//       // Convert data into rows for the table
//       const rows = Object.keys(data).reduce((acc, key, index) => {
//         console.log(acc, key, index)
//         if (index % 2 === 0) {
//           const value1 = `${key}: ${data[key] || "N/A"}`;
//           const key2 = Object.keys(data)[index + 1];
//           const value2 = key2 && `${key2}: ${data[key2] || "N/A"}` ;
//           acc.push([value1, value2]); // Add a row with two cells
//         }
//         return acc;
//       }, []);
// // console.log("rows",rows)
//       y = addTableRow(rows, x, y); // Add the table rows with borders
//       // y = checkPageEnd(y); // Check if a new page is needed
// // console.log("y",y)
//       return y; // Return updated y position
//     };

//     // const checkPageEnd = (y) => {
//     //   if (pdf.internal.pageSize.height - y > 20) { // Check if there's enough space on the page
//     //     return y;
//     //   } else {
//     //     pdf.addPage(); // Add a new page if needed
//     //     return 20; // Reset y position for new page
//     //   }
//     // };

//     let y = 10; // Start y position
//     // if (loanData) {
//       // pdf.setFontSize(8);
//       // pdf.setTextColor(0);
//       // pdf.text("Loan Details", 85, y);
//       // y += 10; // Add space after the main title

//       // Example of how to add service provider details
//       y = addSectionWithTable(
//         "Details of Service Giver",
//         {
//           "GSTIN": "07AAHCC1087B1Z0",
//           "Name": "CORHAVEN TECHNOLOGIES PRIVATE LIMITED",
//           "State": "Delhi",
//           "State Code": "07",
//           "Address": "DELHI 405 DEEPSHIKHA, BUILDING DEEPSHIKHA, BUILDING RAJENDRA PLACE"
//         },
//         10,
//         y
//       );

//       y = addSectionWithTable(
//         "Details of Service Provider",
//         {
//           "GSTIN": "09AABCB1518L1ZQ",
//           "Name": "Bajaj Finance Limited",
//           "State": "UTTAR PRADESH",
//           "State Code": "09",
//           "Address": "Unit No. 201 to 205, 2nd Floor",
//         },
//         10,
//         y+20
//       );
//   //  
    

//     pdf.save("user_details.pdf"); // Save the generated PDF
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//   }
// };

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

  const submitAmount = async (rate) => {
    await FetchUpdateRate(rate);

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
          Loan Payment History
        </h2>
        <div className="bg-[#F89D28] px-4 py-1 rounded-lg">
          {["All", "Paid", "Unpaid"].map((val, index) => (
            <button
              key={index}
              onClick={() => {
                setPaymentStatus(val);
                setCurrentPage(0); // Reset to the first page when switching tabs
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
                    Type
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
                    Disbursed Amount
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
                          {item?.status?.bank || "NA"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item?.type || "NA"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.vendorInfo?.referral || "NA"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item?.status?.disburstAmount || "NA"}
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
                            item?.uploadInvoice.trim() && item?.payOut ? 
                            <button
                            onClick={() => {
                              downLoadFile(item?.uploadInvoice);
                            }}
                            className={`w-fit px-2 py-1 text-sm rounded-lg bg-[#F89D28] text-white`}
                          >
                            Download
                          </button>
                          :
                          item?.payOut ? 
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
                              item?.disbursedDate || ""
                            )}
                            className={`w-fit px-2 py-1 text-sm rounded-lg ${
                              checkshowGenerateInvoice(
                                item?.disbursedDate || ""
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
          nextClassName={
            currentPage === pageCount - 1 || pageCount === 0 ? "hidden" : ""
          }
        />
      </div>
      {showpaymentModal && (
        <UpdatePaymentAmount
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

export default LoanPaymentHistory;
