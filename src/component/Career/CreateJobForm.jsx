import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { subAdminPermission } from '../../hooks/useGetDepartment';

const CreateJobForm = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        location: '',
        categories: '',
        postedOn: '',
        experience: '',
        whatWeLooking: '',
        whatWillBeDoing: '',
        bonuspoints: '',
        education: '',
        salary: '',
        workingHours: '',
        workingDays: '',
        perksAndBenefits: '',
        applicationProcess: '',
        ourStatement: '',
        jobType: '',
        vacancy: '',
    });

    const categoriesOptions = ['Sales and Marketing', 'Customer Service', 'Technology', 'Operations', 'Finance and Accounting', 'Human Resources', 'Creative and Design', 'Management and Leadership', 'Administrative Roles', 'Internships and Traineeships', 'Field Roles', 'Freelancer/Contract Roles'];
    const experienceOptions = ['Fresher (0-1 years)', '1 Years', '2 Years', '3 Years', '4 Years', '5 Years', '5+ Years'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/carrier/create-job', {
                ...formData,
                whatWeLooking: [formData.whatWeLooking], // Convert to array
            });

            if (response.data.success) {
                alert('Job posted successfully!');
                setFormData({
                    jobTitle: '',
                    location: '',
                    categories: '',
                    postedOn: '',
                    experience: '',
                    whatWeLooking: '',
                    whatWillBeDoing: '',
                    bonuspoints: '',
                    education: '',
                    salary: '',
                    workingHours: '',
                    workingDays: '',
                    perksAndBenefits: '',
                    applicationProcess: '',
                    ourStatement: '',
                    jobType: '',
                    vacancy: '',
                });
            }
        } catch (error) {
            console.error('Error creating job:', error);
            alert('Failed to create job. Please try again.');
        }
    };

    return (
        <div className="max-w-full max-h-screen overflow-auto bg-gray-200">
            <div className="max-w-full mx-auto p-6 bg-white rounded shadow">
                {subAdminPermission?.createJob ?
                    (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Create Job</h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    placeholder="Job Title"
                                    className="p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Location"
                                    className="p-2 border rounded"
                                    required
                                />
                                <select
                                    name="categories"
                                    value={formData.categories}
                                    onChange={handleChange}
                                    className="p-2 border rounded"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    {categoriesOptions.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="p-2 border rounded"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Experience
                                    </option>
                                    {experienceOptions.map((experience) => (
                                        <option key={experience} value={experience}>
                                            {experience}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    name="postedOn"
                                    value={formData.postedOn}
                                    onChange={handleChange}
                                    placeholder="Posted On (YYYY-MM-DD)"
                                    className="p-2 border rounded"
                                    required
                                />
                                <textarea
                                    name="whatWeLooking"
                                    value={formData.whatWeLooking}
                                    onChange={handleChange}
                                    placeholder="What We Are Looking For"
                                    className="p-2 border rounded col-span-2"
                                    required
                                />
                                <textarea
                                    name="whatWillBeDoing"
                                    value={formData.whatWillBeDoing}
                                    onChange={handleChange}
                                    placeholder="What You Will Be Doing"
                                    className="p-2 border rounded col-span-2"
                                    required
                                />
                                <textarea
                                    name="bonuspoints"
                                    value={formData.bonuspoints}
                                    onChange={handleChange}
                                    placeholder="Bonus Points"
                                    className="p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    placeholder="Education"
                                    className="p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="Salary"
                                    className="p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="workingHours"
                                    value={formData.workingHours}
                                    onChange={handleChange}
                                    placeholder="Working Hours"
                                    className="p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="workingDays"
                                    value={formData.workingDays}
                                    onChange={handleChange}
                                    placeholder="Working Days"
                                    className="p-2 border rounded"
                                    required
                                />
                                <textarea
                                    name="perksAndBenefits"
                                    value={formData.perksAndBenefits}
                                    onChange={handleChange}
                                    placeholder="Perks and Benefits"
                                    className="p-2 border rounded"
                                />
                                <textarea
                                    name="applicationProcess"
                                    value={formData.applicationProcess}
                                    onChange={handleChange}
                                    placeholder="Application Process"
                                    className="p-2 border rounded"
                                />
                                <textarea
                                    name="ourStatement"
                                    value={formData.ourStatement}
                                    onChange={handleChange}
                                    placeholder="Our Statement"
                                    className="p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    placeholder="Job Type"
                                    className="p-2 border rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    name="vacancy"
                                    value={formData.vacancy}
                                    onChange={handleChange}
                                    placeholder="Vacancy"
                                    className="p-2 border rounded"
                                    required
                                />
                                <div className="col-span-2">
                                    <button
                                        type="submit"
                                        className="bg-[#f89d28] text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </>

                    ) : (
                        <p>Permission Denied</p>
                    )}

            </div>
        </div >
    );
};

export default CreateJobForm;
