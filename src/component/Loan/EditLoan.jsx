import {  useState } from "react";
import axiosInstance from "../axiosInstance";
import DropDownSearch from "../common/DropDownSearch";
import { LoanDocument } from "../common/LoanDocument";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { subAdminPermission } from "../../hooks/useGetDepartment";
import PropTypes from "prop-types";

const EditLoan = ({ showModal, setShowModal, handleApiAfterUpdate }) => {
  const [selectedLoan, setSelectedLoan] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState("");

  console.log(subAdminPermission);

  const { loanItemId } = useParams();

  const [statusComplete, setStatusComplete] = useState({
    disbustAmount: null,
    bank: null,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select an option");
  const [isStatusSelected, setStatusSelect] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState([]);

  async function FetchUpdateStatus(data) {
    console.log(data)
    try {
      const response = await axiosInstance.put(
        `/subAdmin/update-status/${loanItemId}`,
        data
      );

      // console.log("Response:", response.data);
      handleApiAfterUpdate();
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setStatusSelect(true);
    setIsOpen(false);
  };

  const handlesubmit = async () => {
    if (isStatusSelected) {
      let data;

      if (selectedValue === "Completed") {
        data = {
          loanStatus: selectedValue,
          disbustAmount: statusComplete.disbustAmount,
          bank: statusComplete.bank,
        };
      } else if (selectedValue === "Cancel" || selectedValue === "Process") {
        data = {
          loanStatus: selectedValue,
          reason: textFieldValue,
        };
      } else if (selectedValue === "on-hold") {
        data = {
          loanStatus: selectedValue,
          reason: textFieldValue,
          reuploadDocs: selectedLoan,
        };
      }

      await FetchUpdateStatus(data);
      clearData();
      setShowModal(false);
    }
  };

  const submitRequiredDocs = (selectedOption) => {
    setSelectedLoan(selectedOption);
  };

  const clearData = () => {
    setSelectedLoan([]);
    setTextFieldValue("");

    setStatusComplete({
      disbustAmount: null,
      bank: null,
    });

    setSelectedValue("Select an option");

    setSelectedOptions([]);

    setStatusSelect(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="bg-[#000000] bg-opacity-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[90%] my-6 mx-auto max-w-3xl lg:max-w-4xl">
              <div className="border-0 p-6 rounded-lg shadow-lg relative flex flex-col w-full bg-[#FFFFFF] outline-none focus:outline-none overflow-scroll">
                <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
                  Edit Pesonal Loan
                </h2>

                <div className="text-left border border-[#A3A3A380] rounded-md my-[1rem] p-4 h-[60vh] flex flex-col justify-between ">
                  <div className="w-full md:w-1/2">
                    <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
                      Status
                    </h4>

                    <div className="relative">
                      <button
                        type="button"
                        className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B3935]"
                        onClick={toggleDropdown}
                      >
                        {selectedValue}
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {isOpen && (
                        <div className="origin-top-right border z-30 border-black absolute mt-3 w-[92%] md:w-[100%] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            {subAdminPermission?.updateLoanStatus &&
                              // (subAdminPermission?.updatePaymentStatus && 
                                (
                                <div>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleOptionClick("Process")}
                                  >
                                    Process
                                  </a>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleOptionClick("on-hold")}
                                  >
                                    On Hold
                                  </a>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleOptionClick("Cancel")}
                                  >
                                    Cancel
                                  </a>
                                </div>
                              )
                              }
                            {subAdminPermission?.updatePaymentStatus && (
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleOptionClick("Completed")}
                              >
                                Completed
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedValue === "on-hold" && (
                    <div className="w-full md:w-[90%] mt-[2rem] ">
                      <textarea
                        value={textFieldValue}
                        onChange={(e) => setTextFieldValue(e.target.value)}
                        name=""
                        placeholder="Enter you reason of On Hold..."
                        className="w-full outline-none border border-black rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2"
                        id=""
                      ></textarea>

                      <div className="w-full cursor-pointer mt-[1rem]">
                        <DropDownSearch
                          options={LoanDocument}
                          onSubmit={submitRequiredDocs}
                          selectedOptions={selectedOptions}
                          setSelectedOptions={setSelectedOptions}
                        />
                      </div>
                    </div>
                  )}
                  {selectedValue === "Cancel" && (
                    <div className="w-[50%] mt-[2rem] ">
                      <textarea
                        value={textFieldValue}
                        onChange={(e) => setTextFieldValue(e.target.value)}
                        name=""
                        placeholder={` Enter you reason of Cancel Loan  ...`}
                        className="w-full outline-none border border-black rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2"
                        id=""
                      ></textarea>
                    </div>
                  )}

                  {selectedValue === "Process" && (
                    <div className="w-[50%] mt-[2rem] ">
                      <textarea
                        value={textFieldValue}
                        onChange={(e) => setTextFieldValue(e.target.value)}
                        name=""
                        placeholder={` Enter you reason of Process Loan  ...`}
                        className="w-full outline-none border border-black rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2"
                        id=""
                      ></textarea>
                    </div>
                  )}

                  {selectedValue === "Completed" && (
                    <div className="w-[50%] mt-[2rem] flex flex-col gap-4">
                      <input
                        type="number"
                        value={statusComplete.disbustAmount}
                        onChange={(e) =>
                          setStatusComplete({
                            ...statusComplete,
                            disbustAmount: e.target.value,
                          })
                        }
                        placeholder="Enter your Disbust Amount"
                        className="w-full outline-none border border-black rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2"
                      />

                      <input
                        type="text"
                        value={statusComplete.bank}
                        onChange={(e) =>
                          setStatusComplete({
                            ...statusComplete,
                            bank: e.target.value,
                          })
                        }
                        placeholder="Enter your Bank name"
                        className="w-full outline-none border border-black rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2"
                      />

                      {/* <input type="file"
                      onChange={handleImageChange}
                      placeholder="Upload bank logo" 
                      /> */}
                    </div>
                  )}

                  <div className="w-full my-4 mt-[8rem] flex items-center justify-center gap-[4rem] pb-[2rem]">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        clearData();
                      }}
                      className="bg-[#F89D28] text-[#FFFFFF] p-2 px-6 rounded-lg cursor-pointer font-semibold text-base md:text-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlesubmit}
                      className="bg-[#F89D28] text-[#FFFFFF] p-2 px-6 rounded-lg cursor-pointer font-semibold text-base md:text-lg"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

EditLoan.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  handleApiAfterUpdate: PropTypes.func.isRequired,
};
export default EditLoan;
