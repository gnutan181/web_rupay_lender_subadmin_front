import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
// import { FaDownload } from "react-icons/fa";

// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import ViewDoc from "../common/ViewDoc";
// import { Document, Page } from "@react-pdf/renderer";

// import { Document,Page } from 'react-pdf';
// import { pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// console.log(pdfjs.version)
// Set the workerSrc dynamically based on the version of PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.
// pdfjs.GlobalWorkerOptions.workerSrc =
// `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
const UserDetails = () => {
  const [openViewDoc, setOpenViewDoc] = useState(false);
  const [DocImage, setDocImage] = useState();
  const showImg = (img) => {
    setDocImage(img);
    setOpenViewDoc(true);
  };

  // const downloadPDF = async () => {
  //   try {
  //     const pdf = new jsPDF();

  //     const addSectionTitle = (title, y) => {
  //       pdf.setFontSize(14);
  //       pdf.setTextColor(0); // Set text color to black
  //       pdf.text(title, 10, y);
  //       return y + 10;
  //     };

  //     const addTextRow = (label, text, x, y) => {
  //       pdf.setFontSize(12);
  //       pdf.setTextColor(0); // Set text color to black
  //       pdf.setFont("helvetica", "bold");
  //       const labelWidth = pdf.getTextWidth(`${label}: `);
  //       pdf.text(`${label}: `, x, y);
  //       pdf.setFont("helvetica", "normal");
  //       pdf.text(`${text || "N/A"}`, x + labelWidth, y);
  //       return y + 10;
  //     };

  //     const addTextColumn = (label, text, x, y) => {
  //       pdf.setFontSize(12);
  //       pdf.setTextColor(0); // Set text color to black
  //       pdf.setFont("helvetica", "bold");
  //       const labelWidth = pdf.getTextWidth(`${label}: `);
  //       pdf.text(`${label}: `, x, y);
  //       pdf.setFont("helvetica", "normal");
  //       pdf.text(`${text || "N/A"}`, x + labelWidth, y);
  //       return y + 10;
  //     };

  //   //   const addImage = (label, imageUrl, x, y) => {
  //   //     pdf.setFontSize(12);
  //   //     pdf.setTextColor(0); // Set text color to black
  //   //     pdf.text(`${label}:`, x, y);
  //   //     if (imageUrl) {
  //   //       pdf.addImage(imageUrl, "JPEG", x, y + 5, 50, 50);
  //   //     } else {
  //   //       pdf.text("N/A", x + 20, y + 5);
  //   //     }
  //   //     return y + 60;
  //   //   };

  //     const checkPageEnd = (y, addPage = true) => {
  //       if (pdf.internal.pageSize.height - y > 10) {
  //         return y;
  //       } else {
  //         if (addPage) {
  //           pdf.addPage();
  //           return 10;
  //         } else {
  //           return y;
  //         }
  //       }
  //     };

  //     const addSectionBox = (title, contentCallback, x, y) => {
  //       // const startY = y;
  //       y = addSectionTitle(title, y);
  //       y = checkPageEnd(y);
  //       y = contentCallback(x, y);
  //       // Remove the rectangle border
  //       return y + 10;
  //     };

  //     let y = 20;
  //     const x1 = 10;
  //     const x2 = 105; // Adjust x2 for the second column to evenly space the columns

  //     if (userDetails) {
  //       pdf.setFontSize(16);
  //       pdf.setTextColor(30);
  //       pdf.text("User Details", 85, y);
  //       y += 10;

  //       y = addSectionBox(
  //         "Basic Information",
  //         (x, y) => {
  //           y = addTextRow(
  //             "First Name",
  //             userDetails?.basicInfo?.username,
  //             x,
  //             y
  //           );
  //           y = addTextColumn(
  //             "Mobile Number",
  //             userDetails?.basicInfo?.phone,
  //             x2,
  //             y - 10
  //           );
  //           y = checkPageEnd(y);
  //           y = addTextRow("Email", userDetails?.basicInfo?.email, x, y);
  //           y = addTextColumn(
  //             "Qualification",
  //             userDetails?.basicInfo?.qualification,
  //             x2,
  //             y - 10
  //           );
  //           y = checkPageEnd(y);
  //           y = addTextRow("City", userDetails?.basicInfo?.city, x, y);
  //           y = addTextColumn(
  //             "Pin Code",
  //             userDetails?.basicInfo?.pinCode,
  //             x2,
  //             y - 10
  //           );
  //           y = checkPageEnd(y);
  //           y = addTextRow("Address", userDetails?.basicInfo?.address, x, y);
  //           return y;
  //         },
  //         x1,
  //         y
  //       );

  //       y = addSectionBox(
  //         "Company Details",
  //         (x, y) => {
  //           y = addTextRow(
  //             "Company Name",
  //             userDetails?.companyDetail?.companyName,
  //             x,
  //             y
  //           );
  //           y = addTextColumn(
  //             "Company Email",
  //             userDetails?.companyDetail?.companyEmail,
  //             x2,
  //             y - 10
  //           );
  //           y = checkPageEnd(y);
  //           y = addTextRow(
  //             "Company Address",
  //             userDetails?.companyDetail?.companyAddress,
  //             x,
  //             y
  //           );
  //           y = addTextColumn(
  //             "Pin Code",
  //             userDetails?.companyDetail?.companyPinCode,
  //             x2,
  //             y - 10
  //           );
  //           return y;
  //         },
  //         x1,
  //         y
  //       );

  //       y = addSectionBox(
  //         "Bank Details",
  //         (x, y) => {
  //           y = addTextRow(
  //             "Bank Name",
  //             userDetails?.bankDetail?.bankName,
  //             x,
  //             y
  //           );
  //           y = addTextColumn(
  //             "IFSC",
  //             userDetails?.bankDetail?.ifscCode,
  //             x2,
  //             y - 10
  //           );
  //           y = checkPageEnd(y);
  //           y = addTextRow(
  //             "Account Number",
  //             userDetails?.bankDetail?.accountNumber,
  //             x,
  //             y
  //           );
  //           y = addTextColumn(
  //             "Bank Address",
  //             userDetails?.bankDetail?.bankAddress,
  //             x2,
  //             y - 10
  //           );
  //           return y;
  //         },
  //         x1,
  //         y
  //       );

  //       y = checkPageEnd(y, false);
  //     }

  //     pdf.save("user_details.pdf");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const { userId } = useParams();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // console.log(pdfjs.version)

    const fetchLoanData = async () => {
      try {
        const res = await axiosInstance.get(
          `/subAdmin/vendor-profile/${userId}`
        );
        //  console.log(res.data.vendor)
        // set here user details
        setUserDetails(res.data.vendor);
      } catch (error) {
        console.error("Error fetching loan data:", error);
      }
    };

    fetchLoanData();
  }, [ userId]);
  //    console.log(userDetails)

  return (
    <div className="bg-[#FFFFFF] m-4 p-4 font-Inter h-[85vh] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
          User Details
        </h2>
     
      </div>
      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Basic Information
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              First Name
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.basicInfo?.username || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Mobile Number
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.basicInfo?.mobile || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Email
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.basicInfo?.email || "NA"}
            </p>
          </li>
          {/* <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Qualification
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.basicInfo?.qualification || "NA"}
            </p>
          </li> */}
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Image
            </h5>
            <img
              onClick={() => showImg(userDetails?.userdocs?.pic)}
              src={userDetails?.userdocs?.pic}
              alt="user-image"
              className="w-20 h-20 cursor-pointer"
            />
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Referral code
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.basicInfo?.referral  || "NA"}
            </p>
          </li>
        </ul>
      </div>

      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Resident Information
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              City
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.basicInfo?.city || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              State
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.basicInfo?.state || "NA"}{" "}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Pin Code
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.basicInfo?.pinCode || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Address
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.basicInfo?.address || "NA"}
            </p>
          </li>
        </ul>
      </div>

      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Company Details
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Company Name
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.gstDetails?.legal_name_of_business || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Company Address
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.gstDetails?.principal_place_address || "NA"}
            </p>
          </li>
        
        </ul>
      </div>

      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Account Details
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Bank Name
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.bankDetail?.name_at_bank || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              IFSC
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.bankDetail?.ifsc || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Account No
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.bankDetail?.bank_account || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Bank Address
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.bankDetail?.branch || "NA"}
            </p>
          </li>
        </ul>
      </div>
      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Aadhar Details
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
               Name
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.aadharDetails?.name || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Aadhar Number
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.aadharDetails?.aadhaar_number || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Address
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.aadharDetails?.address || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Aadhar pic
            </h5>
            <img
                src={userDetails?.aadharDetails?.imageUrl}
                className="w-[120px] h-fit"
                alt="pan-card-img"
                onClick={() => showImg(userDetails?.aadharDetails?.imageUrl)}
              />
          </li>
          {/* imageUrl */}
        </ul>
      </div>
      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Pan Details
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
            Pan
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.panDetails?.pan || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Pan Number
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {userDetails?.panDetails?.panType || "NA"}
            </p>
          </li>
        
          
        </ul>
      </div>
      {/* <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Upload Documents
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Pan Card
            </h5>
            {userDetails?.userdocs?.panCard?.split(".").pop() === "pdf" ? (
              <Document file={userDetails?.userdocs?.panCard}>
                <Page pageNumber={1} />
              </Document>
            ) : (
              <img
                src={userDetails?.userdocs?.panCard}
                onClick={() => showImg(userDetails?.userdocs?.panCard)}
                className="w-[120px] h-[60px]"
                alt="pan-card-img"
              />
            )}
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Aadhar card front
            </h5>
            {userDetails?.userdocs?.aadharfront?.split(".").pop() === "pdf" ? (
              <Document file={userDetails?.userdocs?.panCard}>
                <Page pageNumber={1} />
              </Document>
            ) : (
              <img
                src={userDetails?.userdocs?.aadharfront}
                className="w-[120px] h-[60px]"
                alt="pan-card-img"
                onClick={() => showImg(userDetails?.userdocs?.aadharfront)}
              />
            )}
           
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Gst Certificate
            </h5>
            <img
              src={userDetails?.userdocs?.gstMsmeCerificate}
              onClick={() => showImg(userDetails?.userdocs?.gstMsmeCerificate)}
              className="w-[120px] h-[60px]"
              alt="gst-Cerificate"
            />
          </li>
        </ul>
      </div> */}

      <ViewDoc
        openViewDoc={openViewDoc}
        setOpenViewDoc={setOpenViewDoc}
        DocImage={DocImage}
      />
    </div>
  );
};

export default UserDetails;
