import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const Profile = () => {
  const [profileData, setProfieData] = useState([]);

  const fetchLoanData = async () => {
    try {
      const res = await axiosInstance.get(`/subAdmin/profile`);
      setProfieData(res.data?.subadmin);
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  };

  useEffect(() => {
    fetchLoanData();
  }, []);

  const displaypermission = {
    "updateLoanStatus" : "Update Loan Status",
    "updatePaymentStatus" : 'update Payment Status',
    "downloanLoanDetails" : "Downloan Loan Details",
    "createBlog" : "Create Blog"
  }

  return (
    <div className="bg-[#FFFFFF] m-4 p-4 font-Inter h-[85vh] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl text-[#3B3935] font-bold mt-2">
          Profile
        </h2>
      </div>
      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              User Name
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {profileData?.username || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Mobile Number
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {profileData?.mobile || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Email
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {profileData?.email || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Role
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {profileData?.role || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Referral
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {profileData?.referral || "NA"}
            </p>
          </li>
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Referral Link
            </h5>
            <p className="font-normal text-xs md:text-sm text-[#3B3935]">
              {profileData?.referralLink || "NA"}
            </p>
          </li>
        </ul>

        <div className="my-4">
          <h5 className=" font-semibold text-sm md:text-base text-[#3B3935] my-2">
            Depatments
          </h5>

          <div className="flex gap-2">
            {console.log(profileData?.department)}
            {profileData?.department &&
              profileData?.department.length > 0 &&
              profileData?.department.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-1.5 px-2 font-sans text-[12px] font-bold uppercase text-white"
                  >
                    <span className="">{item}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="my-4">
          <h5 className=" font-semibold text-sm md:text-base text-[#3B3935] my-2">
            Permissions
          </h5>
          <div className="flex gap-2">
            {profileData?.permissions &&
            Object.entries(profileData.permissions).filter(
              ([key, value]) => value
            ).length > 0 ? (
              Object.entries(profileData.permissions)
                .filter(([key, value]) => value)
                .map(([key, value], index) => (
                  <div
                    key={index}
                    className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900/10 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900"
                  >
                    <span>{displaypermission[key]}</span>
                  </div>
                ))
            ) : (
              <div className="relative grid select-none items-center whitespace-nowrap rounded-lg py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900">
                <span>No permission access</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
