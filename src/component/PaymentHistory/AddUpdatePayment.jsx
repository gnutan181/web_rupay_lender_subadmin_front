import  { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../axiosInstance";

const AddUpdatePayment = () => {
  const { paymentId } = useParams();
  const location = useLocation();
  const paymentData = location?.state;
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  async function FetchNewPaymentDetials(data) {
    try {
      const response = await axiosInstance.post(`/admin/make-payment`, data);

    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
      }
      console.error("Error Config:", error.config);
    }
  }

  const initialData = {
    username: paymentData?.username || "",
    mobile: paymentData?.mobile || "",
    referral: paymentData?.referral || "",
    type: paymentData?.type || "",
    amount: paymentData?.amount || "",
    transactionId: paymentData?.transactionId || "",
    transactionDate: paymentData?.transactionDate || "",
    mode: paymentData?.mode || "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("User name is required"),
    mobile: Yup.number()
      .required("Mobile number is required")
      .positive("Mobile number must be positive"),
    referral: Yup.string().required("Referral is required"),
    type: Yup.string().required("Type is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    transactionId: Yup.string().required("Transaction Id is required"),
    transactionDate: Yup.string().required("Transaction Date is required"),
    mode: Yup.string().required("Payment Status is required"),
  });

  useEffect(() => {
    if (paymentData && paymentId) {
      setIsEditMode(true);
    }
  }, [paymentData, paymentId]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (values) => {


    if (isEditMode) {
      // integrate api of edit Payment history
      // console.log("submit edit form");
    }
    // if we are adding new payment details
    else {
      // integrate api of add Payment history
      await FetchNewPaymentDetials(values);
      setIsEditMode(false);
      navigate("/payment-history");
    }
  };

  return (
    <div className="bg-[#FFFFFF] h-fits h-[85vh] overflow-y-auto m-2 p-2 px-4 font-Inter">
      <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-1">
        {isEditMode ? "Update Payment" : "Add New Payment"}
      </h2>

      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="mt-[1rem] w-[95%] mx-auto md:w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 ">
            {[
              { name: "username", label: "User Name", type: "text" },
              { name: "mobile", label: "Mobile Number", type: "number" },
              { name: "referral", label: "Referral", type: "text" },
              {
                name: "type",
                label: "Select your Type",
                type: "select",
                options: [
                  "personal loan",
                  "home loan",
                  "loan against property",
                  "business loan",
                  "home loan balance transfer",
                  "personal loan balance transfer",
                ],
              },
              { name: "amount", label: "Amount", type: "number" },
              { name: "transactionId", label: "Transaction Id", type: "text" },
              {
                name: "transactionDate",
                label: "Transaction Date",
                type: "text",
              },
              { name: "mode", label: "Payment Mode", type: "text" },
            ].map(({ name, label, type, options }) => (
              <div key={name} className="">
                <p className="text-[#363431] text-base font-semibold my-2">
                  {label}
                </p>
                {type === "select" ? (
                  <Field
                    as="select"
                    name={name}
                    className="font-Inter font-normal bg-[#FFFFFF] text-sm lg:text-base text-[#3B3935] outline-none w-[80%] border border-[#C4C4C7] shadow-MobileNoBox rounded-xl p-3"
                  >
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <Field
                    name={name}
                    type={type}
                    className="font-Inter font-normal bg-[#FFFFFF] text-sm lg:text-base text-[#3B3935] outline-none w-[80%] border border-[#C4C4C7] shadow-MobileNoBox rounded-xl p-3"
                    placeholder={label}
                  />
                )}
                <ErrorMessage
                  name={name}
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            ))}

            <div className="flex items-center justify-around gap-4 mt-[2rem] col-span-2">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-[#F89D28] hover:bg-[#f89e28ee] border border-[#989898] shadow-MobileNoBox md:rounded-xl w-[40%] p-3 md:p-2 lg:p-3"
              >
                <p className="font-Inter font-bold text-sm lg:text-base xl:text-lg text-[#F3EFEF]">
                  Cancel
                </p>
              </button>
              <button
                type="submit"
                className="bg-[#F89D28] hover:bg-[#f89e28ee] border border-[#989898] shadow-MobileNoBox md:rounded-xl w-[40%] p-3 md:p-2 lg:p-3"
              >
                <p className="font-Inter font-bold text-sm lg:text-base xl:text-lg text-[#F3EFEF]">
                  Save Changes
                </p>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUpdatePayment;
