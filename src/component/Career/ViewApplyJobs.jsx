import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { subAdminPermission } from "../../hooks/useGetDepartment";

const ViewApplyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("All"); // Filter state

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axiosInstance.get("/carrier/get-applied-jobs");
                setJobs(response.data.appliedJobs || []);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch job applications");
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const toggleRow = (id) => {
        setExpandedRow((prev) => (prev === id ? null : id));
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredJobs = filter === "All" ? jobs : jobs.filter((job) => job?.categories === filter);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            {
                (subAdminPermission?.createJob) ?
                    (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold">Job Applications</h2>
                                <select
                                    value={filter}
                                    onChange={handleFilterChange}
                                    className="border border-gray-300 rounded-md p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="All">All</option>
                                    <option value="Development">Development</option>
                                    <option value="IT department">IT department</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Banking">Banking</option>
                                    <option value="Calling">Calling</option>
                                    <option value="HR department">HR department</option>
                                </select>
                            </div>
                            <table className="min-w-full bg-white border border-gray-300 shadow-sm">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Mobile</th>
                                        <th className="py-2 px-4 border-b">Experience</th>
                                        <th className="py-2 px-4 border-b">Email</th>
                                        <th className="py-2 px-4 border-b">Gender</th>
                                        <th className="py-2 px-4 border-b">Current Working</th>
                                        <th className="py-2 px-4 border-b">Position Applied For</th>
                                        <th className="py-2 px-4 border-b">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredJobs.map((job) => (
                                        <React.Fragment key={job?._id}>
                                            <tr className="border-b hover:bg-gray-50 text-center">
                                                <td className="py-2 px-4">
                                                    {job?.firstName} {job?.lastName}
                                                </td>
                                                <td className="py-2 px-4">{job?.mobile}</td>
                                                <td className="py-2 px-4">{job?.experience} years</td>
                                                <td className="py-2 px-4">{job?.email}</td>
                                                <td className="py-2 px-4">{job?.gender}</td>
                                                <td className="py-2 px-4">{job?.currentWorking}</td>
                                                <td className="py-2 px-4">{job?.jobTitle}</td>
                                                <td className="py-2 px-4 text-center">
                                                    <button
                                                        onClick={() => toggleRow(job?._id)}
                                                        className="text-blue-500 hover:underline focus:outline-none"
                                                    >
                                                        {expandedRow === job?._id ? "▲" : "▼"}
                                                    </button>
                                                </td>
                                            </tr>

                                            {expandedRow === job?._id && (
                                                <tr>
                                                    <td colSpan="8" className="py-2 px-4 bg-gray-50 border-b">
                                                        <div className="animate-slide-down">
                                                            <p>
                                                                <strong>Category:</strong> {job?.categories}
                                                            </p>
                                                            <p>
                                                                <strong>Education:</strong> {job?.education}
                                                            </p>
                                                            <p>
                                                                <strong>Notice Period:</strong> {job?.noticePeriod}
                                                            </p>
                                                            <p>
                                                                <strong>Current CTC:</strong> {job?.currentCtc} LPA
                                                            </p>
                                                            <p>
                                                                <strong>Skills:</strong> {job?.skills.join(", ")}
                                                            </p>
                                                            <p>
                                                                <strong>Additional Info:</strong> {job?.additionalInfo}
                                                            </p>
                                                            <p>
                                                                <strong>CV:</strong>{" "}
                                                                <a
                                                                    href={job?.cvFile}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-500 hover:underline"
                                                                >
                                                                    Download
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )
                    : (
                        <p>Access Denied</p>
                    )
            }

        </div >
    );
};

export default ViewApplyJobs;
