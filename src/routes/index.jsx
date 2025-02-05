import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// import SideBar from '../component/SideBar/SideBar';
// import Navbar from '../component/Navbar/Navbar';
// import User from '../component/User/User';
// import UserDetails from '../component/User/UserDetails';
// import PaymentHistory from '../component/PaymentHistory/PaymentHistory';
import { Navigate } from "react-router-dom";
// import Login from '../component/Login/Login';
// import jwt_decode from 'jwt-decode'
import { useLocation } from "react-router-dom";
// import Notifications from "../component/Notification/Notifications";
// import axiosInstance from '../component/axiosInstance';
// import useGetId from "../hooks/useGetId";
// import SubAdmin from '../component/SubAdmin/SubAdmin';
// import axiosInstance from '../component/axiosInstance';
import Loan from "../component/Loan/Loan";
import LoanDetails from "../component/Loan/LoanDetails";
// import GetIncomeTaxReturn from '../component/CAService/GstIncomeTaxReturn'
// import LoanDetails from '../component/Loan/LoanDetails';
// import jwt from "jsonwebtoken"
const Login = React.lazy(() => import("../component/Login/Login"));
// const Loan = React.lazy(()=> import('../component/Loan/Loan'));
// const LoanDetails = React.lazy(()=> import('../component/Loan/LoanDetails'));
const SideBar = React.lazy(() => import("../component/SideBar/SideBar"));
const Navbar = React.lazy(() => import("../component/Navbar/Navbar"));

import { department } from "../hooks/useGetDepartment";
import { subAdminRole } from "../hooks/useGetDepartment";
import GstRegistration from "../component/CAService/GstRegistration";
import GstIncomeTaxReturn from "../component/CAService/GstIncomeTaxReturn";
import GetCompanyRegistration from "../component/CAService/GetCompanyRegistration";
import NewPanCard from "../component/CAService/NewPanCard";
import DuplicatePanCard from "../component/CAService/DuplicatePanCard";
import CorrectionPanCard from "../component/CAService/CorrectionPanCard";
import FoodLicense from "../component/CAService/FoodLicense";
import Trademark from "../component/CAService/Trademark";
import DSC from "../component/CAService/DSC";
import Msme from "../component/CAService/Msme";
import ServiceDetails from "../component/CAService/ServiceDetails";
import LoanPaymentHistory from '../component/PaymentHistory/LoanPaymentHistory';
import CardPaymentHistory from '../component/PaymentHistory/CardPaymentHistory'
import Profile from "../component/Profile/Profile";
import CreateLead from "../component/CreateLead/CreateLead";
import MovedLead from "../component/CreateLead/MovedLead";
import Bankers from "../component/CreateLead/Bankers";

const User = React.lazy(() => import("../component/User/User"));
const UserDetails = React.lazy(() => import("../component/User/UserDetails"));

// loader
const loading = (
  <div className="h-[100vh] w-full flex items-center justify-center">
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);



const Routers = () => {
  const location = useLocation();

  const [displaySideBar, setDisplaySideBar] = useState(false);
  // const userId = useGetId();

  return (
    <div className="overflow-hidden min-h-[100vh] h-fit lg:flex">
      {location.pathname !== "/login" ? (
        <SideBar
          displaySideBar={displaySideBar}
          setDisplaySideBar={setDisplaySideBar}
        />
      ) : null}

      <div className="grow bg-[#EFEFEF] ">
        {location.pathname !== "/login" ? (
          <Navbar
            displaySideBar={displaySideBar}
            setDisplaySideBar={setDisplaySideBar}
          />
        ) : null}

        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />

            {subAdminRole === "manager" && (
              <>
                <Route path="/user" element={<User />} />
                <Route path="/user-details/:userId" element={<UserDetails />} />
              </>
            )}
            {subAdminRole === "manager" && (
              <>
                <Route path="/create-lead" element={<CreateLead />} />
                <Route path="/moved-lead" element={<MovedLead />} />
              </>
            )}


            {department.includes("personal loan") && (
              <>
                <Route
                  path="/personal-loan"
                  element={<Loan loanType="personal" />}
                />
                <Route path="/plbt" element={<Loan loanType="plbt" />} />
              </>
            )}
            {department.includes("home loan") && (
              <>
                <Route path="/home-loan" element={<Loan loanType="home" />} />
                <Route path="/hlbt" element={<Loan loanType="hlbt" />} />
              </>
            )}
            {department.includes("business loan") && (
              <Route
                path="/business-loan"
                element={<Loan loanType="business" />}
              />
            )}
            {department.includes("loan against property") && (
              <>
                <Route path="/loan-against-property" element={<Loan loanType="lap" />} />
                <Route
                  path="/lap-bt-loan"
                  element={<Loan loanType="lapbt" />}
                />
              </>
            )}
            {department.includes("used car loan") && (
              <>
                <Route
                  path="/used-car-loan"
                  element={<Loan loanType="usedcar" />}
                />
                <Route
                  path="/used-car-bt-loan"
                  element={<Loan loanType="usedcarbt" />}
                />
              </>
            )}

            <Route path="/:loanType/:loanItemId" element={<LoanDetails />} />


            {/* ca services */}

            <Route
              path='/gst-registration'
              element={<GstRegistration />}
            />
            <Route
              path='/gst-incometaxreturn'
              element={<GstIncomeTaxReturn />}
            />
            <Route
              path='/gst-companyregistration'
              element={<GetCompanyRegistration />}
            />

            <Route
              path='/new-pan-card'
              element={<NewPanCard />}
            />
            <Route
              path='/duplicate-pan-card'
              element={<DuplicatePanCard />}
            />
            <Route
              path='/correction-pan-card'
              element={<CorrectionPanCard />}
            />
            <Route
              path='/food-license'
              element={<FoodLicense />}
            />
            <Route
              path='/trademark'
              element={<Trademark />}
            />
            <Route
              path='/dsc'
              element={<DSC />}
            />
            <Route
              path='/msme'
              element={<Msme />}
            />


            <Route
              path='/ca-service-details/:serviceType/:serviceItemId'
              element={<ServiceDetails />}
            />

            {/* payment History */}


            <Route
              path='payment/loan-payment-history'
              element={<LoanPaymentHistory />}
            />
            <Route
              path='payment/card-payment-history'
              element={<CardPaymentHistory />}
            />
            <Route
              path='profile'
              element={<Profile />}
            />
            <Route
              path='bankers-info'
              element={<Bankers />}
            />

          </Routes>

        </Suspense>
      </div>
    </div>
  );
};

export default Routers;
