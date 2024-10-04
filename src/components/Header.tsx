import { FC, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchUser } from "../store/actions/userActions";
import { Avatar } from "flowbite-react";

const Header: FC = () => {
   const location = useLocation();
   const userData: any = useSelector((state: RootState) => state?.user?.user?.data);
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
   };

   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();
   const handleLogout = () => {
      localStorage.removeItem("WorkNestToken");
      dispatch(fetchUser()).then(() => {
         console.log(userData, "userdatata");
         navigate("/");
      });
   };

   return (
      <div className="bg-green-300 h-[60px] p-2 w-full flex justify-between items-center z-10 top-0 left-0 fixed">
         <div className="w-1/3 hidden md:block"></div>
         <div className="w-full md:w-1/3 flex justify-center">
            <h1 className="text-lg sm:text-xl font-bold text-white">WorkNest</h1>
         </div>
         <div className="w-full md:w-1/3 flex justify-end">
            <div className="w-full sm:w-48 flex gap-2 sm:gap-4 justify-center items-center">
               {!userData ? (
                  <>
                     <div
                        className={`${
                           location.pathname === "/login"
                              ? "bg-white text-green-400 hover:bg-slate-100"
                              : "bg-green-400 text-white hover:bg-green-600"
                        } h-8 font-bold py-1 px-4 rounded cursor-pointer`}
                     >
                        <Link to={"/login"}>Login</Link>
                     </div>
                     <div
                        className={`${
                           location.pathname === "/signup" ? "bg-white text-green-400" : "bg-green-400 text-white hover:bg-green-600"
                        } h-8 font-bold pt-1 px-4 rounded cursor-pointer`}
                     >
                        <Link to={"/signup"}>Signup</Link>
                     </div>
                  </>
               ) : (
                  <div className="relative">
                     <div className="flex items-center  cursor-pointer" onClick={toggleDropdown}>
                        <div className="w-5 p-7">
                           <Avatar alt="User settings" className="w-full h-full" rounded />
                        </div>
                        <span className="text-white hidden sm:inline-block">{userData.fullName}</span>
                     </div>

                     {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                           <div
                              className="py-2 px-4 text-gray-700 hover:bg-gray-200 cursor-pointer border border-green-100 rounded-sm"
                              onClick={() => {
                                 handleLogout();
                                 setDropdownOpen(false);
                              }}
                           >
                              Logout
                           </div>
                        </div>
                     )}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Header;
