import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MovedLead = ({ loanType }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const getStatusColor = (status) => {
        switch (status) {
            case "Process":
                return "#33CC66";
            case "Completed":
                return "#FEDB3F";
            case "Pending":
                return "#F48C7F";
            case "Cancel":
                return "#ED2037";
            case "on-hold":
                return "#ED2037";
            default:
                return "inherit";
        }
    };
    const navigate = useNavigate()

    const handleViewDetails = async (id) => {
        navigate(`/moved-leads/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/subAdmin/moved-data");
                if (response.data.success) {
                    setData(response.data.loan);
                } else {
                    throw new Error("There are no moved leads");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleViewMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const displayedData = data.slice(0, currentPage * itemsPerPage);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Moved Data</h2>
            <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">Application ID</th>
                        <th className="border border-gray-200 px-4 py-2">Vendor Name</th>
                        <th className="border border-gray-200 px-4 py-2">Vendor No.</th>
                        <th className="border border-gray-200 px-4 py-2">Created loan</th>
                        <th className="border border-gray-200 px-4 py-2">Required loan</th>
                        <th className="border border-gray-200 px-4 py-2">Status</th>
                        <th className="border border-gray-200 px-4 py-2">Action</th>
                        <th className="border border-gray-200 px-4 py-2">Moved By</th>
                        <th className="border border-gray-200 px-4 py-2">Product</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedData.map((item) => (
                        <tr key={item?._id} className="hover:bg-gray-50">
                            <td className="px-3 py-4">{item?.applicationID}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {item.vendorInfo?.username || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {item.vendorInfo?.mobile || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {item?.createdLoan || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {` Rs.${item.details?.personalDetail?.loanAmount || "N/A"
                                    }`}
                            </td>
                            <td
                                style={{ color: getStatusColor(item?.status) }}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                            >
                                {item?.status?.loanStatus || "N/A"}
                            </td>

                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                <MdOutlineRemoveRedEye
                                    className="text-2xl cursor-pointer"
                                    onClick={() => handleViewDetails(item._id)}
                                />
                            </td>

                            <td className="border border-gray-200 px-4 py-2">{item.movedBy}</td>
                            <td className="border border-gray-200 px-4 py-2">{item.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length > displayedData.length && (
                <div className="mt-4 text-center">
                    <button
                        onClick={handleViewMore}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        View More
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovedLead;
