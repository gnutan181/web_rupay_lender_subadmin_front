import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setDepartment, setPermission, setSubAdminRole } from "../../hooks/useGetDepartment";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
//   const handleNavigation = (department, role) => {
//   if (role === "blogger") {
//     return navigate("/create-blog");
//   }

 
//   switch (department?.toLowerCase()) {
//       case "personal loan":
//       navigate("/service/personal-loan");
//       break;
//        case "home loan":
//       navigate("/service/home-loan");
//       break;
//           case "business loan":
//       navigate("/service/business-loan");
//       break;
//            case "loan against property":
//       navigate("/service/lap-loan");
//       break;
//            case 'used car loan':
//       navigate("/service/used-car-loan");
//       break;
//                 case 'credit card':
//       navigate("/service/credit-card");
//       break;
//     case "web dev":
//       navigate("/service/web-dev");
//       break;
//     case "social media":
//       navigate("/service/social-media");
//       break;
//     case "professional loan":
//       navigate("/service/professional-loan");
//       break;
//     case "motor insurance":
//       navigate("/service/motor-insurance");
//       break;
//     case "graphic design":
//       navigate("/service/graphic-design");
//       break;
//     default:
//       navigate("/service/personal-loan"); // Default fallback
//   }
// };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailToken = sessionStorage.getItem("emailToken");
      // const res = await axios.post("http://localhost:8080/subAdmin/verify-email", {
          const res = await axios.post("https://api.rupaylender.com/subAdmin/verify-email", {

        
        OTP:otp,
       
      },{ headers: {
    Authorization: `Bearer ${emailToken}`
  }});
            const loadingToast = toast.loading("Loading...");

      if (res?.data?.success) {
        toast.success("OTP Verified!");
        // Save token or user info as needed
        // navigate("/dashboard"); // Change to your desired route
         if (res.data.success) {
        sessionStorage.setItem("token", JSON.stringify(res.data.token));

        const {department, role , permissions } = res.data;

        setDepartment(department);
        setSubAdminRole(role)
        setPermission(permissions)
        // const departemtName = department[0].replaceAll(" ", "-");
        navigate("/user")
        toast.update(loadingToast, {
          render: " Successfully Login!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        
        //   sessionStorage.setItem("token", JSON.stringify(res?.data?.token));
        //   setSubAdminRole(res?.data?.role);
        
        //   setDepartment(res?.data?.department)
        //   setPermission(res?.data?.permissions)
        //   console.log(res?.data?.department[0], res?.data?.role)
        //     handleNavigation(res?.data?.department[0], res?.data?.role);

         
        } 
      
      } else {
        toast.error(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Verification failed");
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      const emailToken = sessionStorage.getItem("emailToken");
     
      const res = await axios.post("https://api.rupaylender.com/subAdmin/resend-otp", {
            //   const res = await axios.post("http://localhost:8080/subAdmin/resend-otp", {

        emailToken,
      });
      if (res.data.success) {
        toast.success("OTP resent to your email!");
      } else {
        toast.error(res.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
    setResendLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e88c1a] ">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#F89D28]">Verify OTP</h2>
        <p className="mb-6 text-gray-600 text-center">
          Please enter the OTP sent to your email.
        </p>
        <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/, ""))}
            className="border border-gray-300 rounded px-4 py-2 text-center text-lg tracking-widest focus:outline-[#F89D28]"
            placeholder="Enter OTP"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#F89D28] text-white py-2 rounded font-semibold hover:bg-[#e88c1a] transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
        {/* <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendLoading}
            className="text-blue-700 hover:underline"
          >
            {resendLoading ? "Resending..." : "Resend OTP"}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default OtpVerify;