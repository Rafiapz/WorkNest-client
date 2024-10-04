import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import SignupPage from "./pages/auth/SignupPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import PageNotFound from "./components/PageNotFound";
import Layout from "./pages/layout/Layout";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/user/HomePage";
import { fetchUser } from "./store/actions/userActions";

function App() {
   const user = useSelector((state: RootState) => state?.user?.user?.data);

   const dispatch = useDispatch<AppDispatch>();
   useEffect(() => {
      dispatch(fetchUser());
   }, []);

   return (
      <>
         {" "}
         <Toaster position="top-center" containerClassName="text-red-500" />
         <Routes>
            <Route element={<Layout />}>
               {!user ? (
                  <>
                     <Route path="/signup" element={<SignupPage />} />
                     <Route path="/" element={<LoginPage />} />
                  </>
               ) : (
                  <Route path="/" element={<HomePage />} />
               )}
            </Route>
            <Route>
               <Route path="*" element={<PageNotFound />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
