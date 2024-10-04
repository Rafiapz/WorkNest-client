import { ErrorMessage, Field, Form, Formik } from "formik";
import { taskSchema } from "../schema/taskSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { handleEditModal } from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import { fetchEmployees, fetchMyTasks } from "../store/actions/userActions";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { editTask } from "../service/api";
import Loading from "./Loading";

interface ITaskForm {
   title: string;
   description: string;
   assignedTo: string[];
}

const EditTask = () => {
   const employees: any = useSelector((state: RootState) => state?.user?.employees?.data);
   const userData: any = useSelector((state: RootState) => state?.user?.user?.data);
   const isOpen = useSelector((state: RootState) => state?.user?.editModal?.isOpen);
   const task: any = useSelector((state: RootState) => state?.user?.editModal?.currentTask);
   const [loading, setLoading] = useState<boolean>(false);

   const dispatch = useDispatch<AppDispatch>();
   const handleCloseModal = () => {
      dispatch(handleEditModal(false));
   };
   useEffect(() => {
      dispatch(fetchEmployees(userData?._id));
   }, []);

   const assignedTo = task?.assignedTo?.map((ob: any) => {
      return ob?._id;
   });

   const initialValues: ITaskForm = {
      title: task?.title,
      assignedTo,
      description: task?.description,
   };

   const handleSubmit = async (values: ITaskForm) => {
      setLoading(true);
      const selectedDate = task?.date;
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("assignedTo", JSON.stringify(values.assignedTo));
      formData.append("userId", userData?._id);
      formData.append("start", JSON.stringify(selectedDate));
      formData.append("end", JSON.stringify(selectedDate));
      formData.append("date", JSON.stringify(selectedDate));
      const id = task?._id;
      try {
         await editTask(formData, id);
         dispatch(handleEditModal({ status: false, task: null }));
         dispatch(fetchMyTasks());
         setLoading(false);
      } catch (error: any) {
         console.log(error);
         toast.error("Failed to edit the task");
      }
   };

   return (
      <div className="relative">
         {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white w-full md:w-3/4 lg:w-1/2 max-w-2xl p-6 rounded-lg shadow-xl border border-green-400"
               >
                  <div className="flex justify-between items-center border-b pb-3">
                     <h2 className="text-xl font-semibold">Edit Task</h2>
                     <button className="text-gray-500 hover:text-gray-800" onClick={handleCloseModal}>
                        &times;
                     </button>
                  </div>

                  <div className="mt-4">
                     <Formik initialValues={initialValues} validationSchema={taskSchema} onSubmit={handleSubmit}>
                        <Form className="p-4">
                           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div>
                                 <div className="mb-4">
                                    <label className="block text-gray-700">Title:</label>
                                    <Field
                                       name="title"
                                       type="text"
                                       className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                       placeholder="Task Name"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                                 </div>

                                 <div className="mb-4">
                                    <label className="block text-gray-700">Description:</label>
                                    <Field
                                       as="textarea"
                                       name="description"
                                       className="w-full px-3 py-2 mt-1 h-40 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                       placeholder="Task Description"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                 </div>
                              </div>

                              <div>
                                 <div className="mb-4">
                                    <label className="block text-gray-700">Assign To:</label>
                                    <div className="h-40 md:h-60 overflow-y-auto border border-gray-300 rounded p-2">
                                       {employees && employees.length > 0 ? (
                                          employees.map((employee: any) => (
                                             <div key={employee._id} className="flex items-center mb-2">
                                                <Field type="checkbox" name="assignedTo" value={employee?._id} className="mr-2" />
                                                <label className="text-gray-700">{employee?.fullName}</label>
                                             </div>
                                          ))
                                       ) : (
                                          <p className="text-gray-500">No employees found</p>
                                       )}
                                    </div>
                                    <ErrorMessage name="assignedTo" component="div" className="text-red-500 text-sm" />
                                 </div>
                              </div>
                           </div>
                           {loading ? (
                              <Loading width="w-full" />
                           ) : (
                              <button type="submit" className="w-full bg-green-400 text-white py-2 rounded mt-3 hover:bg-geen-600 transition">
                                 Submit
                              </button>
                           )}
                        </Form>
                     </Formik>
                  </div>
               </motion.div>
            </div>
         )}
      </div>
   );
};

export default EditTask;
