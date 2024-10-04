import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { taskSchema } from "../schema/taskSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchEmployees, fetchMyTasks } from "../store/actions/userActions";
import toast from "react-hot-toast";
import { addTask } from "../service/api";
import { handleAddModal } from "../store/slices/userSlice";
import Loading from "./Loading";

interface ITaskForm {
   title: string;
   description: string;
   assignedTo: string[];
}

const TaskForm = () => {
   const initialValues: ITaskForm = {
      title: "",
      assignedTo: [],
      description: "",
   };

   const employees: any = useSelector((state: RootState) => state?.user?.employees?.data);
   const userData: any = useSelector((state: RootState) => state?.user?.user?.data);
   const selectedDate = useSelector((state: RootState) => state?.user?.selectedDate);
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch<AppDispatch>();
   useEffect(() => {
      dispatch(fetchEmployees(userData?._id));
   }, []);

   const handleSubmit = async (values: ITaskForm) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("assignedTo", JSON.stringify(values.assignedTo));
      formData.append("userId", userData?._id);
      formData.append("start", JSON.stringify(selectedDate));
      formData.append("end", JSON.stringify(selectedDate));
      formData.append("date", JSON.stringify(selectedDate));

      try {
         await addTask(formData);
         toast.success("Task added successfully");
         dispatch(handleAddModal(false));
         dispatch(fetchMyTasks());
         setLoading(false);
      } catch (error) {
         toast.error("Failed to add task");
         console.log(error);
      }
   };
   return (
      <Formik initialValues={initialValues} validationSchema={taskSchema} onSubmit={handleSubmit}>
         <Form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                     <div className="h-60 overflow-y-auto border border-gray-300 rounded p-2">
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
   );
};

export default TaskForm;
