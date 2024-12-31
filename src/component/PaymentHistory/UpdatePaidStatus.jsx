import { RxCross1 } from "react-icons/rx";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import moment from "moment"; 

const UpdatePaidStatus = ({
  showPaidStatusModal,
  setShowPaidStatusModal,
  updatePaymentStatus,
}) => {

  // Validation schema for the form
  const validationSchema = Yup.object({
    utrNo: Yup.string()
      .required("UTR No is required"),

    paidDate: Yup.string().required("Paid Date is required"),
  });

  // Return null if the modal is not visible
  if (!showPaidStatusModal) return null;

  return (
    <div className="bg-[#000000] bg-opacity-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-[80%] md:w-[30rem] my-6 mx-auto max-w-xl">
        <div className="border-0 p-4 rounded-lg shadow-lg relative flex flex-col w-full bg-[#FFFFFF] outline-none focus:outline-none">
          {/* Close button */}
          <div className="w-full flex items-center justify-end">
            <RxCross1
              onClick={() => {
                setShowPaidStatusModal(false);
              }}
              className="text-2xl text-[#000000] font-bold cursor-pointer"
            />
          </div>
          
          {/* Form */}
          <div className="w-full h-full flex items-center justify-center">
            <Formik
              initialValues={{ utrNo: "", paidDate: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {

                const formattedDate = moment(values.paidDate).format("D MMMM YYYY");
                const formattedValues = {
                  ...values,
                  paidDate: formattedDate,
                };

                updatePaymentStatus(formattedValues);
                setShowPaidStatusModal(false);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form className="w-full">
                  {/* UTR No input */}
                  <div className="mb-4">
                    <label
                      htmlFor="utrNo"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      UTR No
                    </label>
                    <Field
                      type="text"
                      id="utrNo"
                      name="utrNo"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F89D28]"
                    />
                    <ErrorMessage
                      name="utrNo"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Paid Date input */}
                  <div className="mb-4">
                    <label
                      htmlFor="paidDate"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Paid Date
                    </label>
                    <Field
                      type="date"
                      id="paidDate"
                      name="paidDate"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F89D28]"
                    />
                    <ErrorMessage
                      name="paidDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  
                  {/* Submit button */}
                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      className="bg-[#F89D28] text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#f89e28e5]"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdatePaidStatus.propTypes = {
  showPaidStatusModal: PropTypes.bool.isRequired,
  setShowPaidStatusModal: PropTypes.func.isRequired,
  updatePaymentStatus: PropTypes.func.isRequired,
};

export default UpdatePaidStatus;
