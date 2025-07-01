import axios from "axios";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { setDepartment ,setSubAdminRole , setPermission } from "../../hooks/useGetDepartment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import frameImage from "../../assets/login/Frame.png";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    // password: "",
  });


  // const getId = async()=>{
  //   const userId = await axiosInstance.get('/admin/getId')
  //   console.log(userId)
  //   setUserId(userId)

  //   }
  //  useEffect(()=>{
  //   getId();
  //  },[])
  // const [showPassword, setShowPassword] = useState(false);

  const [, setValidated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLoginData((oldVal) => {
      return {
        ...oldVal,
        [name]: value,
      };
    });
  };

  // submit data
  const submitData = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const { email, } = loginData;
      const loadingToast = toast.loading("Loading...");

      try {
      const res = await axios.post(
        "https://api.rupaylender.com/subAdmin/login",
                // "http://localhost:8080/subAdmin/login",

        {
          email,
          // password,
        }
      );
      if(res?.data?.success){
  sessionStorage.setItem("emailToken",res?.data?.emailOtpToken)
  navigate("/verify-email")

}
      // if (res.data.success) {
      //   sessionStorage.setItem("token", JSON.stringify(res.data.token));

      //   const {department, role , permissions } = res.data;

      //   setDepartment(department);
      //   setSubAdminRole(role)
      //   setPermission(permissions)
      //   // const departemtName = department[0].replaceAll(" ", "-");
      //   navigate("/user")
      //   toast.update(loadingToast, {
      //     render: " Successfully Login!",
      //     type: "success",
      //     isLoading: false,
      //     autoClose: 3000,
      //   });

      //   // setTimeout(() => {
      //   //   navigate(`/${departemtName}`);
      //   // }, 3000);
      // }
      // else {
      //   throw new Error("Something went wrong! Please try again.");
      // }
      setValidated(true);
    }
    catch (error) {
      toast.update(loadingToast, {
        render: "Something went wrong! Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }
};

  return (
    <div className="min-h-[100vh] h-full md:h-[100vh] w-full bg-[#F89D28] flex items-center justify-center">
       <ToastContainer position="top-right" />
      <div className="w-[90%] sm:w-[25rem] gap-6 md:gap-4 md:w-[90%] max-w-[60rem] bg-white flex flex-col md:flex-row">
        <div className="w-full md:w-[50%] py-[2rem] flex items-center justify-center h-[45vh]  md:h-[70vh]">
          <div className="w-[80%] mx-auto">
            <h1 className="text-[#3B3935] font-bold text-2xl md:text-3xl mb-[10px] md:mb-[1rem]">
              Rupay lender Login
            </h1>

            <form
              onSubmit={submitData}
              action=""
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="Email"
                  className="text-base md:text-lg text-[#000000] font-normal"
                >
                  Email
                </label>
                <div className=" px-3 py-2 rounded-lg border-[1.5px] border-[#12121de7] bg-[#FFFFFF]">
                  <input
                    value={loginData.email}
                    name="email"
                    onChange={(event) => {
                      handleInputChange(event);
                    }}
                    className="text-[#12121dcb] placeholder:text-[#12121dcb] bg-transparent w-full outline-none font-normal text-base md:text-lg "
                    type="email"
                    id="Email"
                    placeholder="Enter Email"
                    required
                  />
                </div>
              </div>

              {/* <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="Password"
                  className="text-base md:text-lg text-[#000000] font-normal"
                >
                  Password
                </label>
                <div className=" px-3 py-2 rounded-lg border-[1.5px] border-[#12121de7] bg-[#FFFFFF] flex justify-between items-center">
                  <input
                    value={loginData.password}
                    name="password"
                    onChange={(event) => {
                      handleInputChange(event);
                    }}
                    className="text-[#12121dcb] placeholder:text-[#12121dcb]  outline-none font-normal text-base md:text-lg "
                    type={showPassword ? "text" : "password"}
                    id="Password"
                    placeholder="Enter XXXXXX Password"
                    required
                  />

                  {showPassword ? (
                    <FaRegEyeSlash
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      className="text-base md:text-lg cursor-pointer"
                    />
                  ) : (
                    <IoEyeOutline
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      className="text-base md:text-lg cursor-pointer"
                    />
                  )}
                </div>
              </div> */}

              <button
                className="bg-[#F89D28]
hover:bg-[#f89e28ed] active:bg-[#F89D28] focus:outline-none focus:ring focus:ring-violet-300
mt-4 uppercase text-[#FFFFFF] font-bold text-sm md:text-base w-full py-2 rounded-3xl"
              >
                login
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-[50%] h-[40rem]s h-[40vh] md:h-[70vh]">
          <img src={frameImage} className="w-full h-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
