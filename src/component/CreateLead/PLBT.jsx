import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { fetchCityAndState } from "../fetchCityAndState";
import debounce from "lodash.debounce";

const PLBT = ({ mobile }) => {

    const [personalDetails, setPersonalDetails] = useState({
        username: "",
        mobile: "",
        profession: "",
        loanAmount: "",
        state: "",
        city: "",
        presentAddress: "",
        pinCode: "",
        email: "",
    });

    const [professionalDetails, setProfessionalDetails] = useState({
        company: "",
        companyName: "",
        companyAddress: "",
        state: "",
        city: "",
        pinCode: "",
        officeEmail: "",
        monthlyNetCreditSalary: "",
        salaryBankAccount: "",
    });

    const [runningLoans, setRunningLoans] = useState([]);
    const [hasRunningLoan, setHasRunningLoan] = useState(false);

    const [documents, setDocuments] = useState({
        panCard: null,
        aadharfront: null,
        aadharback: null,
        payslip1: null,
        payslip2: null,
        payslip3: null,
        sevenMonthStatement: null,
        form16: null,
        form26: null,
        closerLetter1: null,
        closerLetter2: null,
        closerLetter3: null,
    });

    // const handleInputChange = (e, setFunction) => {
    //     const { name, value } = e.target;
    //     setFunction((prev) => ({ ...prev, [name]: value }));
    // };
    const handleInputChange = async (e, setFunction) => {
        const { name, value } = e.target;
        setFunction((prev) => ({ ...prev, [name]: value }));
        // Call the fetchCityAndState function if the input name is "pinCode"
        if (name === "pinCode") {

            fetchRightBoxData(value);
            const locationData = await fetchCityAndState(value);
            if (locationData) {
                setFunction((prev) => ({
                    ...prev,
                    city: locationData.city,
                    state: locationData.state,
                }));
            }
        }
    };

    // in the personal details
    const [rightBoxData, setRightBoxData] = useState(null);
    const fetchRightBoxData = debounce(async (pinCode) => {
        if (pinCode.length === 6 && /^\d+$/.test(pinCode)) {
            try {
                const response = await axiosInstance.get(`/subAdmin/search`, {
                    params: { pincode: pinCode, type: "personal loan balance transfer" },
                });
                if (Array.isArray(response.data)) {
                    setRightBoxData(response.data); // Directly use the array as rightBoxData
                } else {
                    console.error("Unexpected API response format:", response.data);
                    setRightBoxData(null); // Clear data if format is incorrect
                }
            } catch (error) {
                console.error("Error fetching right box data:", error);
                setRightBoxData(null); // Clear data on error
            }
        } else {
            setRightBoxData(null); // Clear data if pinCode is invalid
        }
    }, 1000);

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setDocuments((prev) => ({ ...prev, [name]: files[0] }));
    };

    const addRunningLoan = () => {
        if (runningLoans.length < 5) {
            setRunningLoans((prev) => [
                ...prev,
                { bank: "", loanType: "", loanAmount: "", monthlyEmi: "", vintage: "" },
            ]);
        }
    };

    const handleRunningLoanChange = (index, e) => {
        const { name, value } = e.target;
        setRunningLoans((prev) => {
            const updatedLoans = [...prev];
            updatedLoans[index][name] = value;
            return updatedLoans;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(documents).forEach((key) => {
            if (documents[key]) {
                formData.append(key, documents[key]);
            }
        });


        formData.append("personalDetail", JSON.stringify(personalDetails));
        formData.append("professionalDetail", JSON.stringify(professionalDetails));
        formData.append(
            "runningLoan",
            JSON.stringify({
                option: hasRunningLoan ? "yes" : "no",
                loans: runningLoans,
            })
        );

        try {
            // await axiosInstance.post("/subAdmin/personal-loan-lead/6306192582", formData);
            await axiosInstance.post(`/subAdmin/personal-loan-bt-lead/${mobile}`, formData);
            alert("Form submitted successfully!");
            setPersonalDetails({
                username: "",
                mobile: "",
                profession: "",
                loanAmount: "",
                state: "",
                city: "",
                presentAddress: "",
                pinCode: "",
                email: "",
            });
            setProfessionalDetails({
                company: "",
                companyName: "",
                companyAddress: "",
                state: "",
                city: "",
                pinCode: "",
                officeEmail: "",
                monthlyNetCreditSalary: "",
                salaryBankAccount: "",
            });
            setRunningLoans([]);
            setDocuments({
                panCard: null,
                aadharfront: null,
                aadharback: null,
                payslip1: null,
                payslip2: null,
                payslip3: null,
                sevenMonthStatement: null,
                form16: null,
                form26: null,
                closerLetter1: null,
                closerLetter2: null,
                closerLetter3: null,
            });
            setHasRunningLoan(false);
        } catch (error) {
            console.error("Error submitting form", error);
            alert("Failed to submit the form. Please try again.");
        }
    };


    return (
        <>
            <h2 className="text-xl font-bold mt-10">Personal Loan Balance Transfer</h2>
            <form className="p-6 bg-gray-100" onSubmit={handleSubmit}>

                {/* Personal Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left dise form  */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: "Name as per PAN", name: "username" },
                                { label: "Phone Number", name: "mobile" },
                                // { label: "Profession", name: "profession" },
                                { label: "Required Loan Amount", name: "loanAmount" },
                                { label: "State", name: "state" },
                                { label: "City", name: "city" },
                                { label: "Present Address", name: "presentAddress" },
                                { label: "Pin Code", name: "pinCode" },
                                { label: "Email", name: "email" },
                            ].map(({ label, name }) => (
                                <div key={name}>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {label}
                                    </label>
                                    <input
                                        type="text"
                                        name={name}
                                        value={personalDetails[name]}
                                        onChange={(e) => handleInputChange(e, setPersonalDetails)}
                                        className="p-2 border border-gray-300 rounded-md w-full"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <label className="block text-sm font-medium text-gray-700">Profession
                                <select
                                    name="profession"
                                    value={personalDetails.profession}
                                    onChange={(e) => handleInputChange(e, setPersonalDetails)}
                                    className="p-2 border border-gray-300 rounded-md w-full bg-white"
                                >
                                    <option value="salaried" selected disabled>Job</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    {/* Right Side - Box */}
                    <div className="border border-gray-300 rounded-md p-4 shadow-md">
                        <h3 className="text-lg font-bold mb-3">Bank Names</h3>
                        {rightBoxData ? (
                            <div className="flex flex-wrap gap-2">
                                {rightBoxData.map((item) => (
                                    <div
                                        key={item._id}
                                        className="px-4 py-1 bg-gray-100 border border-gray-300 rounded-[1rem] shadow-sm"
                                    >
                                        {item.bankName}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">Enter a valid pin code to see details.</p>
                        )}
                    </div>
                </div>


                {/* Professional Details */}
                <h2 className="text-xl font-bold mt-6 mb-4">Professional Details</h2>
                {/*Company type */}
                <div className="grid-cols-3 mb-3">
                    <label className="block text-sm font-medium text-gray-700">Company Type</label>
                    <select
                        name="company"
                        value={professionalDetails.company}
                        onChange={(e) => handleInputChange(e, setProfessionalDetails)}
                        className="p-2 border border-gray-300 rounded-md w-full bg-white"
                    >
                        <option value="">Select Company Type</option>
                        <option value="sole-proprietorship">Sole Proprietorship</option>
                        <option value="partnership-company">Partnership Company</option>
                        <option value="private-limited-company">Private Limted Company</option>
                        <option value="public-limted-company">Public Limted Company</option>
                        <option value="limted-liability">Limted Liability</option>
                        <option value="Govt">Govt</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        // { label: "Company", name: "company" },
                        { label: "Company Name", name: "companyName" },
                        { label: "Company Address", name: "companyAddress" },
                        { label: "State", name: "state" },
                        { label: "City", name: "city" },
                        { label: "Pin Code", name: "pinCode" },
                        { label: "Office Email", name: "officeEmail" },
                        { label: "Monthly Net Credit Salary", name: "monthlyNetCreditSalary" },
                        { label: "Salary Bank Account", name: "salaryBankAccount" },
                    ].map(({ label, name }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {label}
                            </label>
                            <input
                                type="text"
                                name={name}
                                value={professionalDetails[name]}
                                onChange={(e) => handleInputChange(e, setProfessionalDetails)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                    ))}
                </div>

                {/* Running Loan */}
                <h2 className="text-xl font-bold mt-6 mb-4">Running Loans</h2>
                <label className="inline-flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={hasRunningLoan}
                        onChange={() => setHasRunningLoan(!hasRunningLoan)}
                        className="form-checkbox"
                    />
                    <span className="ml-4 mr-4">Do you have a running loan?</span>
                </label>
                {
                    hasRunningLoan &&
                    runningLoans.map((loan, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                            {[
                                { label: "Bank Name", name: "bank" },
                                { label: "Loan Type", name: "loanType" },
                                { label: "Loan Amount", name: "loanAmount" },
                                { label: "Monthly EMI", name: "monthlyEmi" },
                                { label: "Vintage (Months)", name: "vintage" },
                            ].map(({ label, name }) => (
                                <div key={name}>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {label}
                                    </label>
                                    <input
                                        type="text"
                                        name={name}
                                        value={loan[name]}
                                        onChange={(e) => handleRunningLoanChange(index, e)}
                                        className="p-2 border border-gray-300 rounded-md w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    ))
                }
                {
                    hasRunningLoan && (
                        <button
                            type="button"
                            onClick={addRunningLoan}
                            className="bg-[#F89D28] text-white px-3 py-1 rounded-md"
                        >
                            Add Loan
                        </button>
                    )
                }

                {/* File Upload */}
                <h2 className="text-xl font-bold mt-6 mb-4">Upload Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: "PAN Card", name: "panCard" },
                        { label: "Aadhar Front", name: "aadharfront" },
                        { label: "Aadhar Back", name: "aadharback" },
                        { label: "Payslip 1", name: "payslip1" },
                        { label: "Payslip 2", name: "payslip2" },
                        { label: "Payslip 3", name: "payslip3" },
                        { label: "Seven Month Statement", name: "sevenMonthStatement" },
                        { label: "Form 16", name: "form16" },
                        { label: "Form 26", name: "form26" },
                        { label: "Closer Letter 1", name: "closerLetter1" },
                        { label: "Closer Letter 2", name: "closerLetter2" },
                        { label: "Closer Letter 3", name: "closerLetter3" },
                    ].map(({ label, name }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {label}
                            </label>
                            <input
                                type="file"
                                name={name}
                                onChange={handleFileChange}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                    ))}
                </div>

                <button type="submit" className="px-4 py-2 bg-[#F89D28] text-white rounded-md mt-6">
                    Submit
                </button>
            </form >
        </>
    );
};

export default PLBT;
