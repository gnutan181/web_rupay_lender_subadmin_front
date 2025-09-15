import React, { useState, useEffect, useRef } from 'react';

// import all required images.
import logo from '../../assets/Logo/logo.png'
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';



// import { useLocation } from 'react-router-dom';

import { IoIosArrowDown } from "react-icons/io";
import { department, subAdminPermission,subAdminRole } from '../../hooks/useGetDepartment';
// import { subAdminRole } from '../../hooks/useGetDepartment';
// import { GiConsoleController } from 'react-icons/gi';


const Dropdown = ({ title, children }) => {

  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="dropdown">
      <div className='flex items-center justify-between'>
        <div className="p-2 bg-[#3B3935] w-full text-left">
          {title}
        </div>
        <IoIosArrowDown
          onClick={() => setIsOpen(!isOpen)}
          className='cursor-pointer'
        />
      </div>
      {isOpen && <div className="dropdown-menu bg-[#3B3935]">{children}</div>}
    </div>
  );
};

const DropdownItem = ({ to, children }) => (

  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive ? 'bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium  text-base md:text-lg' : 'block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium  text-base md:text-lg'
    }
  >
    {children}
  </NavLink>


);



const SideBar = ({ displaySideBar, setDisplaySideBar }) => {

  // const department = JSON.parse(sessionStorage.getItem('department_123')) || [];
  // console.log(department)

  // const navigate = useNavigate();

  // store value of side bar full opened or half
  const [open,] = useState(true);

  // // get current pathname.
  // const { pathname } = useLocation();

  // side bar ref
  const sideBarRef = useRef(null);



  // if click on outside the side bar. then side bar will close.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        // dispatch(setDisplaySideBar(false))
        setDisplaySideBar(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [setDisplaySideBar]);


  // const handleLogout = ()=>{
  //   sessionStorage.removeItem('token')
  //   navigate('/login')
  // }


  return (
    <div
      className={`z-40  h-[100vh] shrink-0  bottom-0 absolute w-full lg:w-fit  ${displaySideBar ? 'left-0 transition-all duration-300' : 'left-[-100%] transition-all duration-300'} lg:static`}>
      <div
        ref={sideBarRef}
        className={` ${open ? "w-[250px]" : "w-[250px] sm:w-20"} py-[1rem] bg-[#3B3935] font-Hind bg-dark-purple transition-all h-full pb-2 duration-300 relative flex flex-col justify-start lg:justify-betweens`}
      >
        <div className='h-[4rem] flex items-center justify-center gap-2'>

          <img
            src={logo}
            alt="logo"
            className='h-10 md:h-12'
          />
          <h1 className='text-[#F89D28] font-bold text-base md:text-lg uppercase'>Rupay lender</h1>
        </div>



        <div className="bg-[#3B3935] text-white">
          <ul className='h-[85vh] overflow-y-auto scrollbar-thin  scrollbar-track-[#3B3935] scrollbar-thumb-[#F89D28]'>
            {
              subAdminRole === 'Franchise Manager' || subAdminRole === 'distributor' && (
                <>


                  <li className="m-4">
                    <NavLink
                      to="/user"
                      className={({ isActive }) =>
                        isActive ? 'bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium  text-base md:text-lg rounded-md' : 'block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium  text-base md:text-lg'
                      }
                    >
                      Vendors
                    </NavLink>
                  </li>
                    {
              subAdminRole === 'Franchise Manager' && (
                <>
                     <li className="m-4">
                    <NavLink
                      to="/cibil-leads"
                      className={({ isActive }) =>
                        isActive ? 'bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium  text-base md:text-lg rounded-md' : 'block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium  text-base md:text-lg'
                      }
                    >
                      Cibils 
                    </NavLink>
                  </li>
                   <li className="m-4">
                    <NavLink
                      to="/moved-lead"
                      className={({ isActive }) =>
                        isActive ? 'bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium  text-base md:text-lg rounded-md' : 'block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium  text-base md:text-lg'
                      }
                    >
                      Moved Lead
                    </NavLink>
                  </li>
                   <li className="m-4 text-[#FFFFFF] font-medium  text-base md:text-lg">
                    <Dropdown title="Payment History">
                      <DropdownItem to="payment/loan-payment-history">Loan Payment</DropdownItem>
                      <DropdownItem to="payment/card-payment-history">Card payment</DropdownItem>
                    </Dropdown>
                  </li>
                  </>
                )}

                  <li className="m-4">
                    <NavLink
                      to="/create-lead"
                      className={({ isActive }) =>
                        isActive ? 'bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium  text-base md:text-lg rounded-md' : 'block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium  text-base md:text-lg'
                      }
                    >
                      Create Lead
                    </NavLink>
                  </li>

                 

                  {/* <li className="m-4">
                    <NavLink
                      to="/view-apply-jobs"
                      className={({ isActive }) =>
                        isActive ? 'bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium  text-base md:text-lg rounded-md' : 'block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium  text-base md:text-lg'
                      }
                    >
                      View Applied Jobs
                    </NavLink>

                  </li> */}


                 
                </>

              )
            }

            {
              subAdminRole === 'ca' && (


                <li className="m-4 text-[#FFFFFF] font-medium  text-base md:text-lg">
                  <Dropdown title="CA Service">
                    <DropdownItem to="/gst-registration">
                      GST Registration
                    </DropdownItem>
                    <DropdownItem to="/gst-incometaxreturn">
                      GST Income Tax Return
                    </DropdownItem>
                    <DropdownItem to="/gst-companyregistration">
                      Company Registration
                    </DropdownItem>
                    <DropdownItem to="/new-pan-card">New Pan Card</DropdownItem>
                    <DropdownItem to="/duplicate-pan-card">
                      Duplicate Pan Card
                    </DropdownItem>
                    <DropdownItem to="/correction-pan-card">
                      Correction Pan Card
                    </DropdownItem>
                    <DropdownItem to="/food-license">Food License</DropdownItem>
                    <DropdownItem to="/trademark">Trademark</DropdownItem>
                    <DropdownItem to="/dsc">DSC</DropdownItem>
                    <DropdownItem to="/msme">Msme</DropdownItem>
                  </Dropdown>
                </li>

              )
            }

           
            {
              subAdminRole === "distributor" ?(<li className="m-4 text-[#FFFFFF] font-medium  text-base md:text-lg">
              <Dropdown title="Sub DSA Lead">
           
                        <DropdownItem to='/personal-loan'>Personal Loan</DropdownItem>
                        <DropdownItem to='/plbt'>Personal Loan-bt</DropdownItem>
               
                        <DropdownItem to='/home-loan'>Home Loan</DropdownItem>
                        <DropdownItem to='/hlbt'>Home Loan-bt</DropdownItem>
                 
                        <DropdownItem to='/loan-against-property'>Lap Loan</DropdownItem>
                        <DropdownItem to='/lap-bt-loan'>Lap Loan-bt</DropdownItem>
                 
                        <DropdownItem to='/used-car-loan'>Used car Loan</DropdownItem>
                        <DropdownItem to='/used-car-bt-loan'>Used car bt Loan</DropdownItem>
                 
                 <DropdownItem to='/business-loan'>Business Loan</DropdownItem>
              </Dropdown>
            </li>) : ( <li className="m-4 text-[#FFFFFF] font-medium  text-base md:text-lg">
              <Dropdown title="Sub DSA Lead">
                {
                  department.map((item, index) => {
                    if (item === 'personal loan') return (
                      <div key={index}>
                        <DropdownItem to='/personal-loan'>Personal Loan</DropdownItem>
                        <DropdownItem to='/plbt'>Personal Loan-bt</DropdownItem>
                      </div>
                    );
                    if (item === 'home loan') return (
                      <div key={index}>
                        <DropdownItem to='/home-loan'>Home Loan</DropdownItem>
                        <DropdownItem to='/hlbt'>Home Loan-bt</DropdownItem>
                      </div>
                    )
                    if (item === 'loan against property') return (
                      <div key={index}>
                        <DropdownItem to='/loan-against-property'>Lap Loan</DropdownItem>
                        <DropdownItem to='/lap-bt-loan'>Lap Loan-bt</DropdownItem>
                      </div>
                    );
                    if (item === 'used car loan') return (
                      <div key={index}>
                        <DropdownItem to='/used-car-loan'>Used car Loan</DropdownItem>
                        <DropdownItem to='/used-car-bt-loan'>Used car bt Loan</DropdownItem>
                      </div>
                    );
                    if (item === 'business loan') return (
                      <div key={index}>
                        <DropdownItem to='/business-loan'>Business Loan</DropdownItem>
                      </div>
                    );
                  })
                }
              </Dropdown>
            </li>)
            }
              {
                subAdminRole === "Network Lead Manager" &&(
                  <>
                   <NavLink
                      to="/network-lead"
                      className={({ isActive }) =>
                        isActive ? 'bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium  text-base md:text-lg rounded-md' : 'block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium  text-base md:text-lg'
                      }
                    >
                      Network Lead
                    </NavLink>

                   {/* <NavLink
                      to="/telecallers"
                      className={({ isActive }) =>
                        isActive ? 'bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium  text-base md:text-lg rounded-md' : 'block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium  text-base md:text-lg'
                      }
                    >
                      Telecallers
                    </NavLink> */}
                    </>
                )
              }
          </ul>
        </div>


      </div>
    </div >
  )
}
Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
SideBar.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  setDisplaySideBar: PropTypes.func.isRequired,
};
DropdownItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default SideBar;