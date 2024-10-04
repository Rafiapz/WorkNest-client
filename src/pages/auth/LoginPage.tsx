import { Field, Formik, Form, ErrorMessage } from "formik";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schema/loginSchema";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { userLogin } from "../../store/actions/userActions";
import toast from "react-hot-toast";

interface ILoginForm {
   email: string;
   password: string;
}

const LoginPage: FC = () => {
   const initialState: ILoginForm = {
      email: "",
      password: "",
   };

   const isLoading = useSelector((state: RootState) => state?.user?.user?.loading);

   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();
   const handleSubmit = (values: ILoginForm) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      dispatch(userLogin(formData))
         .unwrap()
         .then(() => {
            navigate("/");
         })
         .catch((err: any) => {
            toast.error(err);
         });
   };

   return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
         <div className="h-10 w-full max-w-md ">
            <h1 className="font-bold text-green-400 text-3xl text-center ">Login</h1>
         </div>
         <div className="w-full max-w-md h-auto p-5 border-2 border-green-400 rounded-lg mt-3">
            <div className="mt-5">
               <Formik initialValues={initialState} onSubmit={handleSubmit} validationSchema={loginSchema}>
                  <Form>
                     <div className="flex flex-col p-5">
                        <Field name="email" placeholder="Email" className="border border-gray-500 h-10 pl-2 rounded-md" />
                        <ErrorMessage name="email" className="text-red-500 h-5" component={"div"} />

                        <Field name="password" type="password" placeholder="Password" className="border border-gray-500 h-10 pl-2 mt-5 rounded-md" />
                        <ErrorMessage name="password" className="text-red-500" component={"div"} />
                     </div>

                     <div className="p-5 pt-0">
                        {isLoading ? (
                           <Loading width={"w-full"} />
                        ) : (
                           <button type="submit" className="bg-green-400 w-full h-10 text-white  rounded-md">
                              Login
                           </button>
                        )}
                     </div>

                     <div className="flex gap-2 justify-center">
                        <p>Don't have an account?</p>
                        <Link to={"/signup"} className="text-green-400">
                           Signup
                        </Link>
                     </div>
                  </Form>
               </Formik>
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
