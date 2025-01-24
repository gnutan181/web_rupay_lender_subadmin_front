import { useCallback, useEffect, useState } from "react";
// import { FaDownload } from "react-icons/tb";
import { useParams } from "react-router-dom";
// import axiosInstance from "../../axiosInstance";
import axiosInstance from "../axiosInstance";
import jsPDF from "jspdf";
import ViewDoc from "../common/ViewDoc";
import EditLoan from "./EditLoan";
// import { FaRegEdit } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { subAdminPermission } from "../../hooks/useGetDepartment";

const LoanDetails = () => {
  const { loanType, loanItemId } = useParams();
  const [loanData, setLoanData] = useState(null);
  const [companyName,setCompanyName] = useState("")
  const [openViewDoc, setOpenViewDoc] = useState(false);
  const [DocImage, setDocImage] = useState();
  const [workHistory, setworkHistory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loanId, setLoanId] = useState("");
  const [companyGrade,setCompanyGrade] = useState("")
  const documentLabel = {
    panCard: "Pan Card",
    aadharfront: "Aadhar Front",
    aadharback: "Aadhar Back",
    payslip1: "Payslip 1",
    payslip2: "Payslip 2",
    payslip3: "Payslip 3",
    sevenMonthStatement: "Seven Month Statement",
    gstMsmeCerificate: "GST Msme Certificate",
    itrComution1: "ITR Comution 1",
    itrComution2: "ITR Comution 2",
    itrComution3: "ITR Comution 3",
    oneBankStatementCurrentAccount: "One Bank Statement Current Account",
    oneYearSavingAccountStatement: "One Year Saving Account Statement",
    propertyChain: "Property Chain",
    map: "Map",
    form16: "Form 16",
    form26: "Form 26",
    closerLetter1: "Closer Letter 1",
    closerLetter2: "Closer Letter 2",
    closerLetter3: "Closer Letter 3",
    sanctionLetter: "Sanction Letter,",
    insurancePolicy: "Insurance Policy",
    rc: "RC",
  };
  // const downLoadFile = async (url) => {
  //   const fileName = url.split("/").pop();

  //   const aTag = document.createElement("a");

  //   aTag.href = url;

  //   aTag.setAttribute("download", fileName);

  //   document.body.appendChild(aTag);

  //   aTag.click();
  //   aTag.remove();
  // };
  const handleApiAfterUpdate = () => {
    fetchLoanData();
  };

  const handleShowModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const showImg = (img) => {
    setDocImage(img);
    setOpenViewDoc(true);
  };
  const fetchworkHistory = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `/subAdmin/get-status-history/${loanItemId}`
      );
      // setLoanData(res.data?.loan?.details);
      setworkHistory(res?.data?.statusHistory);

      setLoanId(res?.data?.loan?._id);
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  },[loanItemId]);
  // console.log(workHistory)
  const fetchLoanData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(
        `/subAdmin/get-single-loan/${loanItemId}`
      );
      setLoanData(res.data?.loan?.details);
      setCompanyName(res.data?.loan?.details?.professionalDetail?.companyName)
      setLoanId(res.data?.loan?._id);
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  },[loanItemId]);

  const getCompanyGrade = useCallback(async()=>{
  //  console.log(companyName);
    const getGrade = await axiosInstance.get(`/subAdmin/get-grade/${companyName}`)
    // console.log(getGrade)
    if(getGrade?.data?.success){
      setCompanyGrade(getGrade?.data?.grade[0]?.companyCategory)
    }
  },[companyName])
  // console.log(companyGrade)
  useEffect(() => {
    fetchLoanData();
    fetchworkHistory();
    if(companyName.length != 0){

      getCompanyGrade();
    }
  }, [fetchLoanData,fetchworkHistory,showModal,companyName,getCompanyGrade]);

  const downloadPDF = async () => {
    try {
      const pdf = new jsPDF();

      const addSectionTitle = (title, y) => {
        pdf.setFontSize(14);
        pdf.setTextColor(0);
        pdf.text(title, 10, y);
        return y + 10;
      };

      const addKeyValueRow = (key1, value1, key2, value2, x, y) => {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold"); // Set font to bold
        pdf.setTextColor(100); // Black color
        pdf.text(`${key1}: ${value1 || "N/A"}`, x, y);
        if (key2 && value2) {
          pdf.text(`${key2}: ${value2 || "N/A"}`, x + 95, y); // Adjust x position for the second column
        }
        return y + 10;
      };

      const addSection = (title, data, x, y) => {
        y = addSectionTitle(title, y);
        Object.keys(data).forEach((key, index) => {
          const value = data[key];
          if (index % 2 === 0) {
            y = addKeyValueRow(
              key,
              value,
              Object.keys(data)[index + 1],
              data[Object.keys(data)[index + 1]],
              x,
              y
            );
            y = checkPageEnd(y);
          }
        });
        return y;
      };

      const checkPageEnd = (y, addPage = true) => {
        if (pdf.internal.pageSize.height - y > 70) {
          return y;
        } else {
          pdf.addPage();
          return 20;
        }
      };

      let y = 10;
      let x = 10;
      if (loanData) {
        pdf.setFontSize(16);
        pdf.setTextColor(0);
        pdf.text("Loan Details", 85, y);

        y += 20; // Space after the main title

        y = addSection(
          "Basic Information",
          {
            "First Name": loanData?.personalDetail?.username,
            "Mobile Number": loanData?.personalDetail?.mobile,
            Email: loanData?.personalDetail?.personalEmail,
            Qualification: loanData?.personalDetail?.state,
            City: loanData?.personalDetail?.city,
            "Pin Code": loanData?.personalDetail?.pinCode,
            Profession: loanData?.personalDetail?.profession,
            "Loan Amount": loanData?.personalDetail?.loanAmount,
            Address: loanData?.personalDetail?.presentAddress,
          },
          x,
          y
        );

        y += 10; // Space after Basic Information

        y = addSection(
          "Professional Details",
          {
            Company: `${splitCamelCase(
              loanData.professionalDetail?.company || "N/A"
            )}`,
            "Company Name": loanData?.professionalDetail?.companyName,
            "Company Email": loanData?.professionalDetail?.officeEmail,
            "Salary Bank Account":
              loanData?.professionalDetail?.salaryBankAccount,
            "Pin Code": loanData?.professionalDetail?.pinCode,
            State: loanData?.professionalDetail?.state,
            City: loanData?.professionalDetail?.city,
            "Net Monthly Salary":
              loanData?.professionalDetail?.monthlyNetCreditSalary,
            "Company Address": loanData?.professionalDetail?.companyAddress,
          },
          x,
          y
        );

        y += 10; // Space after Professional Details

        if (loanData?.propertyDetail) {
          y = addSection(
            "Property Details",
            {
              "Property Type": loanData?.propertyDetail?.propertyType,
              "Market Value": loanData?.propertyDetail?.marketValue,
              "Loan Amount": loanData?.propertyDetail?.loanAmount,
            },
            x,
            y
          );
        }

        y = addSection(
          "Running Loans",
          {
            "No. of Running Loans":
              loanData?.runningLoan.option === "no" ? "-No running loans" : "",
            Bank: loanData?.runningLoan.loans
              ?.map((item) => item.bank)
              .join(", "),
            "Loan Type": loanData?.runningLoan.loans
              ?.map((item) => item.loanType)
              .join(", "),
            "Loan Amount": loanData?.runningLoan.loans
              ?.map((item) => item.loanAmount)
              .join(", "),
            "Monthly EMI": loanData?.runningLoan.loans
              ?.map((item) => item.monthlyEmi)
              .join(", "),
            Vintage: loanData?.runningLoan.loans
              ?.map((item) => item.vintage)
              .join(", "),
          },
          x,
          y
        );

        y = checkPageEnd(y, false); // Last section, don't add a new page
      }

      pdf.save("user_details.pdf");
      // console.log(pdf);
    } catch (error) {
      console.log(error.message);
    }
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
  const splitCamelCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  };
  return (
    <div className="bg-[#FFFFFF] m-4 p-4 font-Inter h-[85vh] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
          {loanType.replace(/-/g, " ")}
        </h2>
        <div className="flex items-center gap-4">
          {
            subAdminPermission?.downloanLoanDetails &&
          <div
            onClick={() => downloadPDF()}
            className="flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaDownload className="text-2xl cursor-pointer text-[#656575]" />
            <button className="text-base md:text-lg text-[#3B3935] cursor-pointer">
              Download PDF
            </button>
          </div>
}

          {loanData &&  (subAdminPermission?.updateLoanStatus || subAdminPermission?.updatePaymentStatus ) && (
            <div
              onClick={handleShowModal}
              className="flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaEdit className="text-2xl cursor-pointer text-[#656575]" />
              <button className="text-base md:text-lg text-[#3B3935] cursor-pointer">
                Edit
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Work History
        </h4>
        {workHistory &&
          workHistory.map((item, i) => (
            <div key={i}>
              <ul className="grid grid-cols-4 gap-4">
                <li className=" col-start-1 col-end-2 ">
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Worked on
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {item?.changeStatus || "N/A"}
                  </p>
                </li>
                <li className=" col-start-2 col-end-3 ">
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Status
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {item?.loanStatus || "N/A"}
                  </p>
                </li>
                {
                  item?.reason && (
                  <li className=" col-start-3 col-end-5">
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Reason
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {item?.reason || "N/A"}
                  </p>
                </li>
                  )
                }
                {
                  item?.bank && (
                    <li className=" col-start-3 col-end-4 ">
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Bank
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {item?.bank || "N/A"}
                  </p>
                </li>
                  )
                }
                {
                  item?.disburstAmount && (
                    <li className=" col-start-4 col-end-5 ">
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Disburst Amount
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {item?.disburstAmount || "N/A"}
                  </p>
                </li>
                  )
                }
                
              </ul>
              <div className="my-[1rem]">
                <hr />
              </div>
            </div>
          ))}
      </div>
      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
        Company catagory
        </h4>
        {companyName &&
            <div >
              <ul className="grid grid-cols-4 gap-4">
                <li className=" col-start-1 col-end-2 ">
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                 Company Name               
                   </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {companyName? companyName  : "N/A"}
                  </p>
                </li>
                <li className=" col-start-2 col-end-3 ">
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Grade
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                  {companyGrade? companyGrade  : "Not found in our list"}
                  </p>
                </li>
             
            
            
                
              </ul>
              <div className="my-[1rem]">
                <hr />
              </div>
            </div>
      }
      </div>
      {loanData && (
        <>
          <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
            <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
              Personal Details
            </h4>

            <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              <li>
                <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                  Name as per Pan
                </h5>
                <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                  {loanData.personalDetail?.username || "N/A"}
                </p>
              </li>
              <li>
                <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                  Phone Number
                </h5>
                <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                  {loanData?.personalDetail?.mobile || "N/A"}
                </p>
              </li>
              <li>
                <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                  Required loan amount
                </h5>
                <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                  {loanData?.personalDetail?.loanAmount || "N/A"}
                </p>
              </li>
              <li>
                <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                  City
                </h5>
                <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                  {loanData?.personalDetail?.city || "N/A"}
                </p>
              </li>
              <li>
                <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                  State
                </h5>
                <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                  {loanData?.personalDetail?.state || "N/A"}
                </p>
              </li>
              <li>
                <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                  Present address
                </h5>
                <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                  {loanData?.personalDetail?.presentAddress || "N/A"}
                </p>
              </li>
              <li>
                <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                  Resident Pin code
                </h5>
                <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                  {loanData?.personalDetail?.pinCode || "N/A"}
                </p>
              </li>
              <li>
                <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                  Personal Email
                </h5>
                <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                  {loanData?.personalDetail?.email || "N/A"}
                </p>
              </li>
            </ul>
          </div>

          {loanData?.carDetail && (
            <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
              <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
                Car details
              </h4>

              <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Car Model
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {splitCamelCase(loanData.carDetail?.carModel || "N/A")}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Market Value(IVD)
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.carDetail?.marketValue_IVD || "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Loan Amount
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.carDetail?.loanAmount || "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Model Year
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.carDetail?.modelYear || "N/A"}
                  </p>
                </li>
              </ul>
            </div>
          )}

          {loanData?.propertyDetail && (
            <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
              <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
                Property Details
              </h4>

              <ul className="grid grid-cols-2  xl:grid-cols-3 gap-4">
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Loan amount
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.propertyDetail?.loanAmount || "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Market value
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.propertyDetail?.marketValue || "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Property type
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.propertyDetail?.propertyType || "N/A"}
                  </p>
                </li>
              </ul>
            </div>
          )}
          {loanData?.professionalDetail && (
            <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
              <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
                Professional details
              </h4>

              <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Company Type
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {splitCamelCase(
                      loanData.professionalDetail?.company || "N/A"
                    )}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Company Name
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.professionalDetail?.companyName || "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Company Address
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.professionalDetail?.companyAddress || "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    State
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.professionalDetail?.state || "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    City
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.professionalDetail?.city || "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Pincode
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.professionalDetail?.pinCode || "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Office email
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.professionalDetail?.officeEmail || "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Monthlynet credit salary
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.professionalDetail?.monthlyNetCreditSalary ||
                      "N/A"}
                  </p>
                </li>
                <li>
                  <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                    Salary Bank Account
                  </h5>
                  <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                    {loanData.professionalDetail?.salaryBankAccount || "N/A"}
                  </p>
                </li>
              </ul>
            </div>
          )}

          {loanData?.runningLoan?.loans && (
            <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
              <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
                Running Loan
              </h4>

              {loanData?.runningLoan && loanData?.runningLoan?.loans.length > 0  ? (
                loanData?.runningLoan?.loans.map((item, i) => {
                  return (
                    <div key={i}>
                      <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                        <li>
                          <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                            Bank Name
                          </h5>
                          <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                            {item.bank}
                          </p>
                        </li>
                        <li>
                          <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                            Type of loan
                          </h5>
                          <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                            {item?.loanType || "N/A"}
                          </p>
                        </li>
                        <li>
                          <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                            Total loan amount
                          </h5>
                          <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                            {item.loanAmount || "N/A"}
                          </p>
                        </li>
                        <li>
                          <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                            Monthly EMI
                          </h5>
                          <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                            {item.monthlyEmi || "N/A"}
                          </p>
                        </li>
                        <li>
                          <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                            Vintage
                          </h5>
                          <p className="font-normal text-xs md:text-sm text-[#3B3935]">
                            {item.vintage || "N/A"}
                          </p>
                        </li>
                      </ul>

                      <hr className="my-2" />
                    </div>
                  );
                })
              ) : (
                <h4 className="font-normal text-sm md:text-base text-[#3B3935] mb-2">
                  No running Loan
                </h4>
              )}
            </div>
          )}

          <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
            <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-4">
              Upload Documents
            </h4>

            <ul className="grid grid-cols-2 xl:grid-cols-3 gap-6">
              {Object.entries(loanData.document).map(([key, value]) => {
                if (key === "_id") return null;
                return (
                  <li key={key} className="m-2">
                    <div
                      onClick={() => downLoadFile(value)}
                      className="flex items-center gap-2 mb-3 cursor-pointer"
                    >
                      <FaDownload className="text-2xl  text-[#656575]" /> 
                      <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
                        {documentLabel[key]}
                      </h5>
                    </div>

                    {value.split(".").pop().toLowerCase() === "pdf" ? (
                      <div className="flex items-center gap-2 mb-3 cursor-pointer">
                        <BsFileEarmarkPdfFill className="text-xl  text-[#656575] shrink-0" />
                        <h5 className=" font-semibold text-sm md:text-base text-[#3B3935] break-all">
                          {value.split("/").pop()}
                        </h5>
                      </div>
                    ) : (
                      <div className="w-full pl-4">
                        <img
                          src={value}
                          className="w-[60px] h-[60px] cursor-pointer"
                          alt={key}
                          onClick={() => showImg(value)}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <ViewDoc
            openViewDoc={openViewDoc}
            setOpenViewDoc={setOpenViewDoc}
            DocImage={DocImage}
          />
        </>
      )}

      <EditLoan
        showModal={showModal}
        setShowModal={setShowModal}
        handleApiAfterUpdate={handleApiAfterUpdate}
      />
    </div>
  );
};

export default LoanDetails;
