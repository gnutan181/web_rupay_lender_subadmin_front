import { useCallback, useEffect, useState } from "react";
// import { FaDownload } from "react-icons/tb";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import jsPDF from "jspdf";
import ViewDoc from "../common/ViewDoc";
// import EditLoan from "./EditLoan";
import { FaEdit } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

const TextDisplay = ({ label, value }) => {
  if (!value) return null;

  return (
    <li className="">
      <h5 className="font-semibold text-sm md:text-base text-[#3B3935]">
        {label}
      </h5>
      <p className="font-normal text-xs md:text-sm text-[#3B3935]">
        {value || "N/A"}
      </p>
    </li>
  );
};

// display document
const FileDisplay = ({ label, fileUrl, showImg, downLoadFile }) => {
  if (!fileUrl) return null;

  const fileName = fileUrl.split("/").pop();
  const fileExtension = fileUrl.split(".").pop().toLowerCase();

  return (
    <li className="m-2">
      <div
        onClick={() => downLoadFile(fileUrl)}
        className="flex items-center gap-2 mb-3 cursor-pointer"
      >
        <FaDownload className="text-2xl  text-[#656575]" />
        <h5 className="font-semibold text-sm md:text-base text-[#3B3935]">
          {label}
        </h5>
      </div>

      {fileExtension === "pdf" ? (
        <div className="flex items-center gap-2 mb-3 cursor-pointer">
          <BsFileEarmarkPdfFill className="text-xl text-[#656575] shrink-0" />
          <h5 className="font-semibold text-sm md:text-base text-[#3B3935] break-all">
            {fileName}
          </h5>
        </div>
      ) : (
        <div className="w-full pl-4">
          <img
            src={fileUrl}
            className="w-[60px] h-[60px] cursor-pointer"
            alt={label}
            onClick={() => showImg(fileUrl)}
          />
        </div>
      )}
    </li>
  );
};

const ServiceDetails = () => {
  const { serviceType, serviceItemId } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openViewDoc, setOpenViewDoc] = useState(false);

  const [DocImage, setDocImage] = useState();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        let response;

        switch (serviceType) {
          case "GST-Registration":
            response = await axiosInstance.get(`/ca/gst/${serviceItemId}`);
            break;
          case "GST-IncomeTax-Return":
            response = await axiosInstance.get(
              `/ca/gst-Return/${serviceItemId}`
            );
            break;
          case "Company-Registration":
            response = await axiosInstance.get(
              `/ca/business-Registration/${serviceItemId}`
            );
            break;
          case "New-Pancard":
            response = await axiosInstance.get(`/ca/pancard/${serviceItemId}`);
            break;
          case "Duplicate-Pan":
            response = await axiosInstance.get(
              `/ca/duplicate-Pan/${serviceItemId}`
            );
            break;
          case "Correction-Pan":
            response = await axiosInstance.get(
              `/ca/correction-Pan/${serviceItemId}`
            );
            break;
          case "Food-License":
            response = await axiosInstance.get(
              `/ca/food-License/${serviceItemId}`
            );
            break;
          case "Trademark":
            response = await axiosInstance.get(
              `/ca/trademark/${serviceItemId}`
            );
            break;
          case "DSC":
            response = await axiosInstance.get(`/ca/dsc/${serviceItemId}`);
            break;
          case "MSME":
            response = await axiosInstance.get(`/ca/msme/${serviceItemId}`);
            break;
          default:
            throw new Error("InvalserviceItemId service type");
        }

        setServiceDetails(response?.data?.details);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceType, serviceItemId]);

  const downLoadFile = async (url) => {
    const fileName = url.split("/").pop();

    const aTag = document.createElement("a");

    aTag.href = url;

    aTag.setAttribute("download", fileName);

    document.body.appendChild(aTag);

    aTag.click();
    aTag.remove();
  };

  const showImg = (img) => {
    setDocImage(img);
    setOpenViewDoc(true);
  };

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-[#FFFFFF] m-4 p-4 font-Inter h-[85vh] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
          {serviceType.replaceAll("-", " ")}
        </h2>
      </div>

      {serviceDetails && (
        <>
          <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
            <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
              Personal Details
            </h4>

            <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              <TextDisplay
                label="Person Or Business Name"
                value={serviceDetails?.personOrBusinessName}
              />
              <TextDisplay label="Name" value={serviceDetails?.name} />
              <TextDisplay label="I am a" value={serviceDetails?.iAma} />

              <TextDisplay
                label="Customer Name"
                value={serviceDetails?.customerName}
              />
              <TextDisplay label="DOB" value={serviceDetails?.dateOfBirth} />
              <TextDisplay label="Gender" value={serviceDetails?.gender} />

              <TextDisplay label="Email" value={serviceDetails?.email} />
              <TextDisplay
                label="Phone Number"
                value={serviceDetails?.mobile}
              />
              <TextDisplay
                label="Residential Address"
                value={serviceDetails?.residentialAddress}
              />

              {serviceDetails?.address &&
                typeof serviceDetails?.address === "string" && (
                  <TextDisplay
                    label="Address"
                    value={serviceDetails?.address}
                  />
                )}
              <TextDisplay label="Pin Code" value={serviceDetails?.pinCode} />
              <TextDisplay label="City" value={serviceDetails?.city} />
              <TextDisplay label="State" value={serviceDetails?.state} />
              <TextDisplay
                label="Pan Number"
                value={serviceDetails?.panNumber}
              />
              <TextDisplay label="Pan Number" value={serviceDetails?.pan_no} />
              <TextDisplay label="Business" value={serviceDetails?.business} />
              <TextDisplay
                label="Business Name"
                value={serviceDetails?.businessName}
              />
              <TextDisplay
                label="Nature Of Business"
                value={serviceDetails?.natureOfBusiness}
              />
              <TextDisplay
                label="Designation"
                value={serviceDetails?.designation}
              />
              <TextDisplay
                label="GST Return Type"
                value={serviceDetails?.gstReturnType}
              />
              <TextDisplay label="Company" value={serviceDetails?.company} />
              <TextDisplay
                label="Company Name"
                value={serviceDetails?.companyName}
              />
              <TextDisplay
                label="Trademark Name"
                value={serviceDetails?.trademarkName}
              />
              <TextDisplay label="Amount" value={serviceDetails?.amount} />
            </ul>

            {serviceDetails?.address &&
              typeof serviceDetails?.address === "object" && (
                <h4 className="font-semibold text-base md:text-lg text-[#3B3935] my-4">
                  Address
                </h4>
              )}

            <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              <TextDisplay
                label="Show/Flat Door No"
                value={serviceDetails?.address?.shopFlatDoorNo}
              />
              <TextDisplay
                label="Near By"
                value={serviceDetails?.address?.nearBy}
              />
              <TextDisplay
                label="Email"
                value={serviceDetails?.address?.email}
              />
              <TextDisplay
                label="Phone Number"
                value={serviceDetails?.address?.mobile}
              />
              <TextDisplay
                label="Pin Code"
                value={serviceDetails?.address?.pinCode}
              />
              <TextDisplay label="City" value={serviceDetails?.address?.city} />
              <TextDisplay
                label="State"
                value={serviceDetails?.address?.state}
              />
              <TextDisplay
                label="Road Street"
                value={serviceDetails?.address?.roadStreet}
              />
              <TextDisplay
                label="Area Locality"
                value={serviceDetails?.address?.areaLocality}
              />
              <TextDisplay
                label="Road Street"
                value={serviceDetails?.addreess?.roadStreet}
              />
            </ul>

            {serviceDetails?.applicantDetails && (
              <>
                <h4 className="font-semibold text-base md:text-lg text-[#3B3935] my-4">
                  Applicant Details
                </h4>

                <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                  <TextDisplay
                    label="Name"
                    value={serviceDetails?.applicantDetails?.name}
                  />
                  <TextDisplay
                    label="Contact No"
                    value={serviceDetails?.applicantDetails?.contactNo}
                  />
                  <TextDisplay
                    label="Personal Email"
                    value={serviceDetails?.applicantDetails?.email}
                  />
                  <TextDisplay
                    label="Personal Email"
                    value={serviceDetails?.applicantDetails?.personalEmail}
                  />
                </ul>
              </>
            )}
          </div>

          <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
            <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-4">
              Upload Documents
            </h4>

            <ul className="grid grid-cols-2 xl:grid-cols-3 gap-6">
              <FileDisplay
                label="Pan Card"
                fileUrl={serviceDetails?.photo}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Pan Card"
                fileUrl={serviceDetails?.panCard}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Pan Card"
                fileUrl={serviceDetails?.pan}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Aadhaar Card"
                fileUrl={serviceDetails?.aadhaarCard}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Certificate Of Registration"
                fileUrl={serviceDetails?.certificateOfRegistration}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Address Proof"
                fileUrl={serviceDetails?.addressProof}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Logo"
                fileUrl={serviceDetails?.logo}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Photo ID"
                fileUrl={serviceDetails?.photoId}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Business Address Proof"
                fileUrl={serviceDetails?.businessAddressProof}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Business Premises Proof"
                fileUrl={serviceDetails?.businessPremisesProof}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Business Constitution"
                fileUrl={serviceDetails?.businessConstitution}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Food Safety Plan"
                fileUrl={serviceDetails?.foodSafetyPlan}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Food Product List"
                fileUrl={serviceDetails?.foodProductList}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Bank Account Information"
                fileUrl={serviceDetails?.bankAccountInformation}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="PassPort"
                fileUrl={serviceDetails?.passport}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Digital Signature Certificate"
                fileUrl={serviceDetails?.digitalSignatureCertificate}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Director Identification Number"
                fileUrl={serviceDetails?.directorIdentificationNumber}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Registered Office Proof"
                fileUrl={serviceDetails?.registeredOfficeProof}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Declaration"
                fileUrl={serviceDetails?.declaration}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Memorandum Of Association"
                fileUrl={serviceDetails?.memorandumOfAssociation}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Articles Of Association"
                fileUrl={serviceDetails?.articlesOfAssociation}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Proof Of Identity"
                fileUrl={serviceDetails?.proofOfIdentity}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Proof Of Address"
                fileUrl={serviceDetails?.proofOfAddress}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Attestation Officer Proof"
                fileUrl={serviceDetails?.attestationOfficerProof}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Proof Of Birth"
                fileUrl={serviceDetails?.userDocs?.proofOfBirth}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Proof of Identity"
                fileUrl={serviceDetails?.userDocs?.proofofIdentity}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Proof Of Address"
                fileUrl={serviceDetails?.userDocs?.proofOfAddress}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Proof Of Pan"
                fileUrl={serviceDetails?.userDocs?.proofOfPan}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />

              <FileDisplay
                label="Identity Proof"
                fileUrl={serviceDetails?.userDocs?.identityProof}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Address Proof"
                fileUrl={serviceDetails?.userDocs?.addressProof}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Age Proof"
                fileUrl={serviceDetails?.userDocs?.ageProof}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
              <FileDisplay
                label="Previously Issued PAN"
                fileUrl={serviceDetails?.userDocs?.previouslyIssuedPAN}
                showImg={showImg}
                downLoadFile={downLoadFile}
              />
            </ul>
          </div>

          <ViewDoc
            openViewDoc={openViewDoc}
            setOpenViewDoc={setOpenViewDoc}
            DocImage={DocImage}
          />
        </>
      )}
    </div>
  );
};

export default ServiceDetails;
