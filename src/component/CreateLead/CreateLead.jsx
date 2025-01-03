import  { useState } from "react";
import { FaMoneyBillWave, FaCreditCard, FaMotorcycle } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { BiSolidBusiness } from "react-icons/bi";
import { MdMapsHomeWork, MdOutlineAddHomeWork } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoCarSport } from "react-icons/io5";
// import { GiWallet } from "react-icons/gi";

import PersonalLoan from "./PersonalLoan";
import PLBT from "./PLBT";
import HomeLoan from "./HomeLoan";
import HLBT from "./HLBT";
import LAP from "./LAP";
import LAPBT from "./LAPBT";
import BusinessLoan from "./BusinessLoan";
import UsedCarLoan from "./UsedCarLoan";
import UsedCarLoanBT from "./UsedCarLoanBT";
// import CreditCard from "./CreditCard";
import MotorInsurance from "./MotorInsurance";
import axiosInstance from "../axiosInstance";

const services = [
    { id: "personal-loan", name: "Personal Loan", icon: <FaMoneyBillWave /> },
    { id: "plbt", name: "Personal Loan Balance Transfer", icon: <MdOutlineAddHomeWork /> },
    { id: "home-loan", name: "Home Loan", icon: <IoIosHome /> },
    { id: "hlbt", name: "Home Loan Balance Transfer", icon: <FaCreditCard /> },
    { id: "lap", name: "Loan against property", icon: <MdMapsHomeWork /> },
    { id: "lap-bt", name: "Loan against property Balance Transfer", icon: <SiHomeassistantcommunitystore /> },
    { id: "business-loan", name: "Business Loan", icon: <BiSolidBusiness /> },
    { id: "used-car-loan", name: "Used Car Loan", icon: <IoCarSport /> },
    { id: "used-car-loan-bt", name: "Used Car Loan Balance Transfer", icon: <IoCarSport /> },
    // { id: "credit-card", name: "Credit Card", icon: <GiWallet /> },
    { id: "motor-insurance", name: "Motor Insurance", icon: <FaMotorcycle /> },
];

const CreateLead = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [leadData, setLeadData] = useState(null);
    const [selectedService, setSelectedService] = useState(null);

    const fetchLeadData = async () => {
        try {
            const response = await axiosInstance.post("/subAdmin/vendor-lead", {
                mobile: phoneNumber,
            });

            if (response.data.success) {
                setLeadData(response.data.vendor[0]);
            } else {
                console.error("Failed to fetch lead data", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching lead data", error);
        }
    };

    const renderForm = () => {
        switch (selectedService) {
            case "personal-loan":
                return <PersonalLoan mobile={leadData.basicInfo.mobile}/>;
            case "plbt":
                return <PLBT mobile={leadData.basicInfo.mobile}/>;
            case "home-loan":
                return <HomeLoan mobile={leadData.basicInfo.mobile}/>;
            case "hlbt":
                return <HLBT mobile={leadData.basicInfo.mobile}/>;
            case "lap":
                return <LAP mobile={leadData.basicInfo.mobile}/>;
            case "lap-bt":
                return <LAPBT mobile={leadData.basicInfo.mobile}/>;
            case "business-loan":
                return <BusinessLoan mobile={leadData.basicInfo.mobile}/>;
            case "used-car-loan":
                return <UsedCarLoan mobile={leadData.basicInfo.mobile}/>;
            case "used-car-loan-bt":
                return <UsedCarLoanBT mobile={leadData.basicInfo.mobile}/>;
            // case "credit-card":
            //     return <CreditCard mobile={leadData.basicInfo.mobile}/>;
            case "motor-insurance":
                return <MotorInsurance mobile={leadData.basicInfo.mobile}/>;
            default:
                return null;
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Create Lead</h1>

            {/* Phone Number Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                    Search Phone Number to create lead...
                </label>
                <div className="flex mt-2 max-w-md">
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                        className="p-2 border border-gray-300 rounded-md flex-1"
                    />
                    <button
                        onClick={fetchLeadData}
                        className="ml-2 px-4 py-2 bg-[#F89D28] text-white font-bold rounded-md hover:bg-orange-500"
                    >
                        Fetch
                    </button>
                </div>
            </div>

            {/* Lead Data Section */}
            {leadData && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID:</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md w-full"
                            value={leadData.venderID}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md w-full"
                            value={leadData.basicInfo.username}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State:</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md w-full"
                            value={leadData.basicInfo.state}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City:</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md w-full"
                            value={leadData.basicInfo.city}
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Referral:</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md w-full"
                            value={leadData.basicInfo.referral}
                            readOnly
                        />
                    </div>
                </div>
            )}

            {/* Services Section */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Services</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={`p-4 border rounded-md flex flex-col items-center cursor-pointer h-[8rem] justify-center ${selectedService === service.id ? "bg-[#F89D28] text-[#FFF]" : ""
                                }`}
                        >
                            <div
                                className={`text-3xl text-[#F89D28] ${selectedService === service.id ? "bg-[#F89D28] text-[#FFF]" : ""
                                    }`}
                            >
                                {service.icon}
                            </div>
                            <div className="mt-2 text-sm font-medium text-center">{service.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dynamic Form Section */}
            <div>{renderForm()}</div>
        </div>
    );
};

export default CreateLead;
