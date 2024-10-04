import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../../schema/signupSchema";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, userSignup } from "../../store/actions/userActions";
import { AppDispatch, RootState } from "../../store/store";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { fetchManagers } from "../../service/api";

interface IinitialState {
   fullName: string;
   email: string;
   password: string;
   confirmPassword: string;
   role: string;
   managerId?: string;
}

const SignupPage: FC = () => {
   const initialState: IinitialState = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      managerId: "",
   };

   const isLoading = useSelector((state: RootState) => state?.user?.user?.loading);
   const [error, setError] = useState("");
   const [employeeRole, setEmployeeRole] = useState(false);
   const [managers, setManagers] = useState<{ fullName: string; _id: string }[] | null>(null);
   const [managersLoading, setManagersLoading] = useState(true);
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

   const handleManagers = async () => {
      setEmployeeRole(true);
      try {
         const data = (await fetchManagers()).data;
         setManagers(data?.data);
         setManagersLoading(false);
      } catch (error) {
         console.log(error);
         toast.error("Failed to load managers");
      }
   };
   const handleSubmit = (values: IinitialState) => {
      if (values.role === "employee" && values.managerId === "") {
         setError("Please select your manager");
         console.log(values);
         return;
      }
      setError("");
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);
      if (values.managerId) formData.append("managerId", values.managerId);
      dispatch(userSignup(formData))
         .unwrap()
         .then(() => {
            dispatch(fetchUser());
            navigate("/");
         })
         .catch((err: any) => {
            toast.error(err);
         });
   };

   return (
      <div className="flex flex-col items-center justify-center mx-auto md:h-screen mt-10 md:mt-0 lg:py-0 px-4 sm:px-6 lg:px-8">
         <div className="w-full sm:w-[500px] lg:w-[600px] mt-10 sm:mt-20">
            <h1 className="font-bold text-green-400 text-xl sm:text-2xl text-center">Signup</h1>
         </div>
         <div className="w-full sm:w-[500px] lg:w-[600px] h-auto pb-3 mt-2 border-2 border-green-400 rounded-lg ">
            <div className="mt-5">
               <Formik initialValues={initialState} onSubmit={handleSubmit} validationSchema={signupSchema}>
                  <Form>
                     <div className="flex flex-col p-5">
                        <Field name="fullName" placeholder="Full Name" className="border border-gray-500 h-10 pl-2" />
                        <ErrorMessage name="fullName" className="text-red-500 h-5" component="div" />

                        <Field name="email" placeholder="Email" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="email" className="text-red-500 h-5" component="div" />

                        <Field name="password" type="password" placeholder="Password" className="border border-gray-500 h-10 pl-2 mt-5" />
                        <ErrorMessage name="password" className="text-red-500 h-5" component="div" />

                        <Field
                           name="confirmPassword"
                           type="password"
                           placeholder="Confirm Password"
                           className="border border-gray-500 h-10 pl-2 mt-5"
                        />
                        <ErrorMessage name="confirmPassword" className="text-red-500 h-5" component="div" />

                        <div className="mt-5">
                           <label className="block text-lg font-semibold mb-3">Select Role:</label>
                           <div className="flex gap-5 items-center">
                              <label className="flex items-center cursor-pointer">
                                 <Field
                                    type="radio"
                                    name="role"
                                    value="employee"
                                    className="h-5 w-5 text-green-600 border-gray-300 focus:ring-green-400"
                                    onClick={() => handleManagers()}
                                 />
                                 <span className="ml-2 text-gray-700 hover:text-green-400">Employee</span>
                              </label>
                              <label className="flex items-center cursor-pointer">
                                 <Field
                                    type="radio"
                                    name="role"
                                    value="manager"
                                    className="h-5 w-5 text-green-400 border-gray-300 focus:ring-green-400"
                                    onClick={() => setEmployeeRole(false)}
                                 />
                                 <span className="ml-2 text-gray-700 hover:text-green-400">Manager</span>
                              </label>
                           </div>
                           <ErrorMessage name="role" className="text-red-500 mt-2" component="div" />
                        </div>

                        {employeeRole && (
                           <div className="mt-5">
                              <label className="block text-lg font-semibold mb-1">Select Manager:</label>
                              <span className="text-red-500">{error}</span>
                              {managersLoading ? (
                                 <div className="flex flex-col items-center justify-center ">
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-blue-500 border-opacity-50 mb-4"></div>
                                    <p className="text-lg font-semibold text-gray-700">Loading...</p>
                                    <p className="text-sm text-gray-500 mt-2">This may take a minute to load, please wait.</p>
                                 </div>
                              ) : (
                                 <div className="h-20 overflow-y-auto border border-gray-300 rounded p-2">
                                    {managers?.map((manager: any) => (
                                       <label key={manager?._id} className="flex items-center mb-2 cursor-pointer">
                                          <Field
                                             type="radio"
                                             name="managerId"
                                             value={manager?._id}
                                             className="h-5 w-5 text-green-400 border-gray-300 focus:ring-green-400"
                                          />
                                          <span className="ml-2 text-gray-700">{manager?.fullName}</span>
                                       </label>
                                    ))}
                                 </div>
                              )}
                              <ErrorMessage name="manager" className="text-red-500 mt-2" component="div" />
                           </div>
                        )}
                     </div>

                     <div className="p-5 pt-0">
                        {isLoading ? (
                           <Loading width="w-full" />
                        ) : (
                           <button type="submit" className="bg-green-400 w-full h-10 text-white">
                              Signup
                           </button>
                        )}
                     </div>

                     <div className="flex gap-2 justify-center">
                        <p>Already have an account?</p>
                        <Link to="/" className="text-green-400">
                           Login
                        </Link>
                     </div>
                  </Form>
               </Formik>
            </div>
         </div>
      </div>
   );
};

export default SignupPage;
