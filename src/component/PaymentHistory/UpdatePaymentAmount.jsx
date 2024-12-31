import { RxCross1 } from "react-icons/rx";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";

const UpdatePaymentAmount = ({
  showpaymentModal,
  setShowPaymentModal,
  submitAmount,
}) => {
  // Validation schema for the form
  const validationSchema = Yup.object({
    rate: Yup.number()
      .required("commission rate is required")
      .positive("commission rate must be positive")
      .typeError("commission rate must be a number"),
  });

  // Return null if the modal is not visible
  if (!showpaymentModal) return null;

  return (
    <div className="bg-[#000000] bg-opacity-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-[80%] md:w-[30rem] my-6 mx-auto max-w-xl">
        <div className="border-0 p-4 rounded-lg shadow-lg relative flex flex-col w-full bg-[#FFFFFF] outline-none focus:outline-none">
          {/* Close button */}
          <div className="w-full flex items-center justify-end">
            <RxCross1
              onClick={() => {
                setShowPaymentModal(false);
              }}
              className="text-2xl text-[#000000] font-bold cursor-pointer"
            />
          </div>
          
          {/* Form */}
          <div className="w-full h-full flex items-center justify-center">
            <Formik
              initialValues={{ rate: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                submitAmount(values);
                setShowPaymentModal(false);
                resetForm();
              }}
            >
              {({ isSubmitting }) => (
                <Form className="w-full">
                  {/* Amount input */}
                  <div className="mb-4">
                    <label
                      htmlFor="rate"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Commission Rate
                    </label>
                    <Field
                      type=""
                      id="rate"
                      name="rate"
                      placeholder="Enter here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F89D28]"
                    />
                    <ErrorMessage
                      name="rate"
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

UpdatePaymentAmount.propTypes = {
  showpaymentModal: PropTypes.bool.isRequired,
  setShowPaymentModal: PropTypes.func.isRequired,
  submitAmount: PropTypes.func.isRequired,
};

export default UpdatePaymentAmount;
